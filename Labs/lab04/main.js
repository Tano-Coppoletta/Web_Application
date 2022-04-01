'use strict'

function generateTable(filmLibrary,filter){
    const tbody=document.querySelector('tbody');
    tbody.innerHTML='';
    const title=document.getElementById('titleOfTable');


    if(filter==='All'){
        filmLibrary.filmList.forEach(film => {
            generateRow(film,tbody);
            
        });
        title.innerHTML=`<h1>All</h1>`
    }else if(filter=='favorite'){
        filmLibrary.getFavorites().forEach((film) => {
            console.log(film);
            generateRow(film,tbody);
            
            
        });
        title.innerHTML=`<h1>Favorites</h1>`
    }else if(filter=='best'){
        filmLibrary.getRated().forEach((film) => {
            console.log(film);
            generateRow(film,tbody);
            
        });
        title.innerHTML=`<h1>Best Rated</h1>`
    }else if(filter=='seenLastMonth'){
        filmLibrary.seenLastMonth().forEach((film) => {
            console.log(film);
           // generateRow(film,tbody);
           
        });
        title.innerHTML=`<h1>Seen Last Month</h1>`
    }


      
}

function generateRow(film,tbody){
    const tr=document.createElement('tr');

    tr.innerHTML=`<td>${film.id}</td>
    <td>${film.title}</td>`
    
    if(film.favorite){
        tr.innerHTML+=`<input class="form-check-input me-1" 
        type="checkbox" value="" aria-label="..." checked="true">Favorite</td>`
    }else{
        tr.innerHTML+=`<input class="form-check-input me-1" 
        type="checkbox" value="" aria-label="...">Favorite</td>`
    }

    if(film.date!==undefined){
        tr.innerHTML+= `<td>${film.date.format('YYYY-MM-DD')}</td>`;
    }else{
        tr.innerHTML+=`<td></td>`;
    }

    //stars
    if(film.rating===0){
        tr.innerHTML+= `<td> &#9734;&#9734;&#9734;&#9734;&#9734;</td>`;
    }else if(film.rating===1){
        tr.innerHTML+=`<td> &#9733; &#9734;&#9734;&#9734;&#9734;</td>`;
    }else if(film.rating===2){
        tr.innerHTML+= `<td> &#9733;&#9733; &#9734;&#9734;&#9734;</td>`;
    }else if(film.rating===3){
        tr.innerHTML+=`<td> &#9733;&#9733;&#9733;&#9734;&#9734;</td>`;
    }else if(film.rating===4){
        tr.innerHTML+=`<td> &#9733;&#9733;&#9733;&#9733;&#9734;</td>`;
    }else if(film.rating===5){
        tr.innerHTML+=`<td> &#9733;&#9733;&#9733;&#9733;&#9733;</td>`;
    }else{
        tr.innerHTML+=`<td> &#9734;&#9734;&#9734;&#9734;&#9734;</td>`;
    }

    tr.innerHTML+=`<td><button type="button" class="btn btn-danger">X</button></td>`

    const buttonX=tr.querySelector('button');
    buttonX.addEventListener('click',() => {
        console.log(`Delete film ${film.code}`);
       // film= film.filter((f)=>f.code!==film.code) ;
        //re-generate list
       // generateTable(film,'All');
    })

    tbody.appendChild(tr);
        
}



document.addEventListener('DOMContentLoaded',(event) => {
    const filmLibrary=new FilmLibrary();
    filmLibrary.addNewFilm(new Film(1,'Pulp Fiction',true,'2022-03-10',5));
    filmLibrary.addNewFilm(new Film(2,'21 Grams',true,'2022-03-17',4));
    filmLibrary.addNewFilm(new Film(3,'Star Wars',false));
    filmLibrary.addNewFilm(new Film(4,'Matrix',false));
    filmLibrary.addNewFilm(new Film(5,'Shrek',false,'2022-03-21',3));

    generateTable(filmLibrary,'All');

  
    var triggerTabList = [].slice.call(document.querySelectorAll('leftItems'))
    triggerTabList.forEach(function (triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
        })
   })

    const AllFilmsButton=document.getElementById('allFilms');
    console.log(AllFilmsButton);
    AllFilmsButton.addEventListener('click',() => {
        console.log("click done");
        generateTable(filmLibrary,'All');
        AllFilmsButton.innerHTML=`<a href="#" class="list-group-item list-group-item-action active" aria-current="true" id="allFilms">`
                             
    });

    const favoritesButton=document.getElementById('favoriteButton');
    favoritesButton.addEventListener('click',() => {
        generateTable(filmLibrary,'favorite');
    
    });

    const bestRatedButton=document.getElementById('bestRatedButton');
    bestRatedButton.addEventListener('click', ()=>{
        generateTable(filmLibrary,'best');
    });

    const seenLastMonthButton=document.getElementById('seenLMButton');
    seenLastMonthButton.addEventListener('click', ()=> {
        generateTable(filmLibrary,'seenLastMonth');
    })

  
}); 


