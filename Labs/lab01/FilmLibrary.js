'use strict'
const dayjs=require('dayjs');
const isSameOrAfter= require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function Film(id,title, ...parameters){
    //create a film with the mandatory parameters 
    let film={id:id, title:title,favorite: false, date: dayjs(""),rating: undefined};
    
    for(let i=0;i<parameters.length;i++){
        let type=typeof(parameters[i]);
        if(type==="boolean" && i===0)
            film.favorite=parameters[i];
        else if(type==="string" && i<=1)
            film.date=dayjs(parameters[i]);
        else if(type==="number" && i<=2)
            film.rating=parameters[i];
        
    }

    return film;
}



function FilmLibrary(){
    this.filmList=[];

    this.addNewFilm = (film) =>{
        this.filmList.push(film);
    }

    this.print = () => {
        this.filmList.forEach((film) =>{
            console.log(film);
        })
    }

    this.sortByDate = () => {
        let sorted=[];
        sorted=this.filmList.sort((a,b) => {
            if(!a.date.isValid() && !b.date.isValid()) return a.id-b.id;
            if(!a.date.isValid()) return 1;
            if(!b.date.isValid()) return -1;
            return a.date.isSameOrAfter(b) ? -1 : 1;
        })
        return sorted;
    }

    this.deleteFilm = (Did) => {
        let newList=[];
        newList=this.filmList.filter((Film) => 
            Film.id!==Did
        
         );
        
         this.filmList=newList;
    }

    //remove the watch date of all the films in the FilmLibrary
    this.resetWatchedFilms =  () => {
        this.filmList.forEach((Film) => {
            Film.date=dayjs("");
        })
    }


    this.getRated = () => {
       
       return this.filmList.filter((Film) => Film.rating!==undefined)
    }
}


//populate the film list
let filmLibrary=new FilmLibrary();
filmLibrary.addNewFilm(new Film(1,'Pulp Fiction',true,'2022-03-10',5));
filmLibrary.addNewFilm(new Film(2,'21 Grams',true,'2022-03-17',4));
filmLibrary.addNewFilm(new Film(3,'Star Wars',false));
filmLibrary.addNewFilm(new Film(4,'Matrix',false));
filmLibrary.addNewFilm(new Film(5,'Shrek',false,'2022-03-21',3));

let sortedLibrary=[];
sortedLibrary=filmLibrary.sortByDate();

//filmLibrary.print();

//sortedLibrary.forEach((a)=> {console.log(a)})

//filmLibrary.deleteFilm(1);

//filmLibrary.print();

let rated=[];
rated=filmLibrary.getRated()

rated.forEach((s)=>console.log(s))





