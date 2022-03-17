'use strict'
const dayjs=require('dayjs');
const isSameOrAfter= require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const sqlite = require('sqlite3');
const db = new sqlite.Database('Labs/lab02/films.db',(err) => {
    if(err){
        console.log("error!!!");
        throw err;
    }
});

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

    this.getAll = () => {
        return new Promise((resolve,reject) => {
            const sql='SELECT * FROM films';
            db.all(sql, (err,rows) => {
               
                if(err){
                    reject(err);
                }else{
                   // console.log(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                   
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                    
                }
            })
        })
    }

    this.getFavorite = () => {
        return new Promise((resolve,reject) => {
            const sql='SELECT * FROM films WHERE favorite=true';
            db.all(sql, (err,rows) => {
                if(err)
                    reject(err);
                else{
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)))
                  
                }
            })
        })
    }

    this.watchedToday = () =>{
        return new Promise((resolve,reject) => {
            const sql='SELECT * FROM films WHERE watchdate=?';
            //build date of today
            const date=dayjs().format("YYYY-MM-DD");
            if(dayjs().month)
            db.all(sql,[date], (err,rows) => {
                if(err)
                    reject(err);
                else{
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                }
            })
        }) 
    }

    this.watchedBefore = (date) => {
        return new Promise((resolve,reject) => {
            const sql='SELECT * FROM films WHERE watchdate<?';
            db.all(sql,[date],(err,rows) => {
                if(err)
                    reject(err);
                else{
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                }
            });
        });

    }

    this.ratingGreaterThan = (rating) => {
        return new Promise((resolve,reject) => {
            const sql='SELECT * FROM films WHERE rating>=?';
            db.all(sql,[rating],(err,rows) => {
                if(err)
                    reject(err);
                else{
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                }
            });
        });
    }

    this.getFilmByTitle = (title) => {
        return new Promise((resolve,reject) =>{
            const sql='SELECT * FROM films WHERE title=?';
            db.all(sql,[title],(err,rows) => {
                if(err)
                    reject(err);
                else{
                    resolve(rows.map((f)=>new Film(f.id,f.title,f.favorite,f.date,f.rating)));
                }
            });
        });
    }

    this.storeNewMovie = (film) => {
        return new Promise((resolve,reject) => {
            const sql='INSERT INTO films(id,title,favorite,watchdate,rating) VALUES (?,?,?,?,?)';
            const values=[film.id,film.title,film.favorite,film.watchdate,film.rating];
            db.run(sql,values,(err) => {
                if(err){
                    console.log('Failure!')
                    reject(err);
                }else{
                    console.log('Success!');
                    resolve(true);
                }
            })
        })
    }

    this.deleteMovie = (id) => {
        return new Promise((resolve,reject) => {
            const sql= 'DELETE FROM films WHERE id=?';
            db.run(sql,[id],(err) => {
                if(err){
                    console.log('Failure!')
                    reject(err);
                }else{
                    console.log('Success!');
                    resolve(true);
                }
            });
        });
    }

    this.deleteWatchDate = () => {
        return new Promise((resolve,reject) => {
            const sql='UPDATE films SET watchdate=NULL';
            db.run(sql,(err) => {
                if(err){
                    console.log('Failure!')
                    reject(err);
                }else{
                    console.log('Success!');
                    resolve(true);
                }
            });
        });
    }
}


async function main(){
    let filmLibrary=new FilmLibrary();

    //get all films in the db
    let allFilms=await filmLibrary.getAll();
    console.log(allFilms);
    //get all the favorite films in the db
    let favoriteFilms=await filmLibrary.getFavorite();
    console.log(favoriteFilms);

    //get all the films watched today
    let watchedT=await filmLibrary.watchedToday();
    console.log(watchedT);

    //get all the films watched before a certain date
    let watchedB=await filmLibrary.watchedBefore('2022-04-01');
    console.log(watchedB);

    //get all the films with a rating greater than the parameter
    let filmsWithRatingGreaterThan= await filmLibrary.ratingGreaterThan(3);
    console.log(filmsWithRatingGreaterThan);

    //get film with a given title
    let filmWithTitle=await filmLibrary.getFilmByTitle('Pulp Fiction');
    console.log(filmWithTitle);

    //add a new movie to the database
    await filmLibrary.storeNewMovie(new Film('10','Nemo',false,'2021-07-04',2));

    //delete a movie using its id
    await filmLibrary.deleteMovie(10);

    await filmLibrary.deleteWatchDate();
}

main();