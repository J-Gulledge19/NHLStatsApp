
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
      $('main').html(`${teamStats}`);
      
    })
}

