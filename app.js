
const baseURL = 'https://statsapi.web.nhl.com/';

const key = 'api/v1/teams/'

const statsModifier = '?expand=team.stats'
    
const url = `${baseURL}${key}`;

const readableKeys = {
    gamesPlayed: 'Games Played',
    wins: 'Wins',
    losses: 'Losses',
    ot: 'Overtimes',
    pts: 'Points',
    ptPctg: 'Point Percentage',
    goalsPerGame: 'Goals Per Game',
    goalsAgainstPerGame: 'Goals Against Per Game',
    evGGARatio: 'Goals Against Average',
    powerPlayPercentage: 'PowerPlay Percentage',
    powerPlayGoals: 'PowerPlay Goals',
    powerPlayGoalsAgainst: 'PowerPlay Goals Against',
    powerPlayOpportunities: 'PowerPlay Opportunities',
    penaltyKillPercentage: 'Penalty Kill Percentage',
    shotsPerGame: 'Shots Per Game',
    shotsAllowed: 'Shots Allowed',
    winScoreFirst: 'Wins if Scored First',
    winOppScoreFirst: 'Wins if Opponent Scores First',
    winLeadFirstPer: 'Wins if Leading in First Period',
    winLeadSecondPer: 'Win if Leading Second Period',
    winOutshootOpp: 'Win if Out Shooting Opponent',
    winOutshotByOpp: 'Win if Out Shot by Opponent',
    faceOffsTaken: 'Faceoffs Taken',
    faceOffsWon: 'Faceoff Wins',
    faceOffsLost: 'Faceoff Losses',
    faceOffWinPercentage: 'Faceoff Win Percentage',
    shootingPctg: 'Shooting Percentage',
    savePctg: 'Save Percentage'
}

const teamLogos = {
    1: './Images/Devils_Logo.jpg',
    2: './New_York_Islanders.jpg',
    3: 'https://i.imgur.com/mPA11R4.jpg',
    4: 'https://i.imgur.com/KIxMGPU.jpg',
    5: 'https://i.imgur.com/C7R7Vt0.png',
    6: 'https://i.imgur.com/3FQGsa2.jpg',
    7: 'https://i.imgur.com/8jLmFzT.png',
    8: 'https://i.imgur.com/lMJdaWB.png',
    9: 'https://i.imgur.com/gNmTxc6.png',
    10: 'https://i.imgur.com/89b7fLs.png',
    12: 'https://i.imgur.com/SuB98Hr.png',
    13: 'https://i.imgur.com/3pk7lf2.png',
    14: 'https://i.imgur.com/47Z9RRx.jpg',
    15: 'https://i.imgur.com/b4SC6qI.jpg',
    16: 'https://i.imgur.com/9xqIg3j.jpg',
    17: 'https://i.imgur.com/jqE4tQ1.png',
    18: 'https://i.imgur.com/ZyAP7n9.png',
    19: 'https://i.imgur.com/A3oGea0.png',
    20: 'https://i.imgur.com/cshTf9o.png',
    21: 'https://i.imgur.com/VyUCtNl.png',
    22: 'https://i.imgur.com/DMod5Et.png',
    23: 'https://i.imgur.com/lBdEccH.png',
    24: 'https://i.imgur.com/qxHtIeO.jpg',
    25: 'https://i.imgur.com/jPQV2nm.png',
    26: 'https://i.imgur.com/XjXzgbS.png',
    28: 'https://i.imgur.com/mg09dS7.jpg',
    29: 'https://i.imgur.com/RzZ0iqk.png',
    30: 'https://i.imgur.com/7Phu0SX.png',
    52: 'https://i.imgur.com/VyKc2pG.png',
    53: 'https://i.imgur.com/QLgCxzt.png',
    54: 'https://i.imgur.com/uBDi0r0.png',
    55: 'https://i.imgur.com/jdW4o29.png'
}
    
$.ajax(url).then((data) => {
    console.log(data);

    const teams = data.teams.map(team => {
        return `<li class=\'${team.name}-stats\' data-link=${baseURL}${key}${team.id}${statsModifier}>Team: ${team.name}</li>`
    });

    const $ul = $('.team-list');

    $ul.html(`
    ${teams.join('')}
    `);
    
})

$(document).ready(function(){
    $("ul").on("click", 'li', function(event) {
        renderStats(event.target.dataset.link)
        renderLogos(event.target.dataset.link)
    })
})

function renderStats(link){
    $.ajax(link).then((statsData) =>{
        console.log(statsData)
        const statArea = statsData.teams[0].teamStats[0].splits[0].stat
    const teamStats = []
    console.log(Object.entries(statArea))
    for(const [key, value] of Object.entries(statArea)){
        if (readableKeys[key]){
            teamStats.push(`<div>${readableKeys[key]}: ${value}</div>`)
        }else{
            teamStats.push(`<div>${key}: ${value}</div>`)
        }
    }
      $('main').html(`${teamStats.join('')}`);
      
    })
}


function renderLogos(url){
    $.ajax(url).then((data) =>{
        console.log(data)
        const teamId = data.teams[0].id
        console.log(data.teams[0].id)
        let displayLogo; 
        console.log(Object.entries(teamId))
            if (teamLogos[teamId]){
                $.ajax(teamLogos[teamId]).then((data) =>{
                    console.log(data)
                })
                displayLogo =`<a href="${teamLogos[teamId]}" alt="${data.teams[0].name} Logo">`;
            }
        $('.team-logo').html(`${displayLogo}`)
    })
}
