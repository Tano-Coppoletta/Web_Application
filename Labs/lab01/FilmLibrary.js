'use strict'
const dayjs=require('dayjs');
const isSameOrAfter= require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

function Film(id,title, ...parameters){
    //create a film with the mandatory parameters 
    let film={id:id, title:title,favorite: false, date: undefined,rating: undefined};
    
    if(typeof(parameters[0])==='boolean'){
        film.favorite=parameters[0];
    }
    if(dayjs(parameters[1]).isValid()){
        film.date=dayjs(parameters[1]);
    }
    if(typeof(parameters[2])==='number'){
        if(parameters[2]<6 && parameters[2]>0){
            film.rating=parameters[2];
        }
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
            return a.date.isSameOrBefore(b);
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
            Film.date=undefined;
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

filmLibrary.deleteFilm(1);

//filmLibrary.print();

let rated=[];
rated=filmLibrary.getRated()

rated.forEach((s)=>console.log(s))





