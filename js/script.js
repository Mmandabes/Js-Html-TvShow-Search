
// document.getElementById("search").addEventListener("search", myFunction);

const input = document.querySelector('input[type="search"]')
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

        let query = document.getElementById("search").value;

        function displayShow(show) {
            console.log('ok')
            let i = 0;
            let seasons = show._embedded.seasons.map(season => {
                return `<div class="my-show-season" id="${season.number}">season ${season.number}</div>`
            }).join('')
            document.getElementById('myShow').innerHTML = `
                                    <div class="my-show-title">${show.name}</div>
                                    <div class="my-show-summary">${show.summary}</div>
                                    ${seasons}
                                    <div id="season-info" class="my-show-season-info"></div>`
        
        
            document.querySelectorAll('.my-show-season').forEach(item => {
                item.addEventListener('click', event => {
                    for(i = 0; i < show._embedded.seasons.length; i++) {
                        if ( parseInt(event.target.id, 10) === show._embedded.seasons[i].number) {
                            let elm = document.getElementById('season-info');
                            elm.innerHTML = `<img class="season-cover" src="${show._embedded.seasons[i].image.original}" alt="${show.name} ${show._embedded.seasons[i].number} cover">
                                             <div class="season-premiere">Premiered: ${show._embedded.seasons[i].premiereDate}</div>
                                             <div class="season-episodes">Number Of Episodes: ${show._embedded.seasons[i].episodeOrder}</div>
                                             <div class="season-summary">${show._embedded.seasons[i].summary || "No Description Available"}</div>
                                             `;
                            setTimeout(function() {
                            elm.innerHTML = "";
                             }, 5000);
                        }
                }
        
                })
              })                            
        }

        async function findShow(query) {
            let promise = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`)
            return await promise.json()
        }
        
        findShow(query).then(displayShow)
        .catch(e => console.log(e))
    } 
});


