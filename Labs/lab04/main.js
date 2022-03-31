'use strict'

function generateTable(filmLibrary,filter){
    const tbody=document.querySelector('tbody');
    tbody.innerHTML='';

    if(filter==='All'){
        filmLibrary.filmList.forEach(film => {
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

            
            tbody.appendChild(tr);
        });
    }
      
}



document.addEventListener('DOMContentLoaded',(event) => {
    const filmLibrary=new FilmLibrary();
    filmLibrary.addNewFilm(new Film(1,'Pulp Fiction',true,'2022-03-10',5));
    filmLibrary.addNewFilm(new Film(2,'21 Grams',true,'2022-03-17',4));
    filmLibrary.addNewFilm(new Film(3,'Star Wars',false));
    filmLibrary.addNewFilm(new Film(4,'Matrix',false));
    filmLibrary.addNewFilm(new Film(5,'Shrek',false,'2022-03-21',3));

   // generateTable(filmLibrary,'All');

    const AllFilmsButton=document.getElementById('allFilms');
    console.log(AllFilmsButton);
    AllFilmsButton.addEventListener('click',() => {
        console.log("click done");
        generateTable(filmLibrary,'All');
    });
}); 


