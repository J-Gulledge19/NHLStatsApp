
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
    2: './Images/New_York_Islanders.jpg',
    3: './Images/New_York_Rangers.jpg',
    4: './Images/Philadelphia_Flyers.jpg',
    5: './Images/Pittsburgh_Penguins.png',
    6: './Images/Boston_Bruins.jpg',
    7: './Images/Buffalo_Sabres.png',
    8: './Images/Montréal_Canadiens.png',
    9: './Images/Ottawa_Senators.png',
    10: './Images/Toronto_Maple_Leafs.png',
    12: './Images/Carolina_Hurricanes.png',
    13: './Images/Florida_Panthers.png',
    14: './Images/Tampa_Bay_Lightning.jpg',
    15: './Images/Washington_Capitals.jpg',
    16: './Images/Chicago_Blackhawks.jpg',
    17: './Images/Detroit_Red_Wings.png',
    18: './Images/Nashville_Predators.png',
    19: './Images/St._Louis_Blues.png',
    20: './Images/Calgary_Flames.png',
    21: './Images/Colorado_Avalanche.png',
    22: './Images/Edmonton_Oilers.png',
    23: './Images/Vancouver_Canucks.png',
    24: './Images/Anaheim_Ducks.jpg',
    25: './Images/Dallas_Stars.png',
    26: './Images/Los_Angeles_Kings.png',
    28: './Images/San_Jose_Sharks.jpg',
    29: './Images/Columbus_Blue_Jackets.png',
    30: './Images/Minnesota_Wild.png',
    52: './Images/Winnipeg_Jets.png',
    53: './Images/Arizona_Coyotes.png',
    54: './Images/Vegas_Golden_Knights.png',
    55: './Images/Seattle_Kraken.png'
}
  
// Function to get team name list 
$.ajax(url).then((data) => {

    const teams = data.teams.map(team => {
        return `<li class=\'${team.name}-stats\' data-link=${baseURL}${key}${team.id}${statsModifier}>  ${team.name}</li>`
    });

    const $ul = $('.team-list');

    $ul.html(`
    ${teams.sort().join('')}
    `);
    
})

// Render stats and logos on click
$(document).ready(function(){
    $("ul").on("click", 'li', function(event) {
        renderStats(event.target.dataset.link)
        renderLogos(event.target.dataset.link)
    });
})

// Fuunction to pull stats and change keys to a more readable key
function renderStats(link){
    $.ajax(link).then((statsData) =>{

        const statArea = statsData.teams[0].teamStats[0].splits[0].stat
    const teamStats = []

    for(const [key, value] of Object.entries(statArea)){
        if (readableKeys[key]){
            teamStats.push(`<div>${readableKeys[key]}: ${value}</div>`);
        }else{
            teamStats.push(`<div>${key}: ${value}</div>`);
        }
    }
      $('main').html(`${teamStats.join('')}`);
      
    })
}

// Function to render logos matching team id
function renderLogos(url){
    $.ajax(url).then((data) =>{

        const teamId = data.teams[0].id;

        let displayLogo; 
            if (teamLogos[teamId]){
                displayLogo =`<img src="${teamLogos[teamId]}" alt="${data.teams[0].name} Logo">`;
            }
        $('.team-logo').html(`${displayLogo}`);
    })
}
