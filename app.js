
const baseURL = 'https://statsapi.web.nhl.com/';

const key = 'api/v1/teams/'
const statsModifier = '?expand=team.stats'
    
const url = `${baseURL}${key}`;

const readableKeys = {
    gamesPlayed: 'Games Played',
}
    
$.ajax(url).then((data) => {
    console.log(data);

    const teams = data.teams.map(team => {
        return `<li class=\'${team.name}-stats\' data-link=${baseURL}${key}${team.id}${statsModifier}>Team: ${team.name}</li>`
    });

    const $ul = $('.team-list');

    $ul.html(`
    ${teams}
    `)
    
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
            teamStats.push(`<div>${readableKeys[key]}:${value}</div>`)
        }else{
            teamStats.push(`<div>${key}:${value}</div>`)
        }
    }
      $('main').html(`${teamStats}`);
      
    })
}

