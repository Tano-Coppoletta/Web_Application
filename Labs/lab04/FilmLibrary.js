'use strict'


function Film(id,title, ...parameters){
    //create a film with the mandatory parameters 
    let film={id:id, title:title,favorite: false, date: undefined,rating: undefined};
    
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







