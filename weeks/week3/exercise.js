'use strict';

const { rejects } = require('assert');
const { resolve } = require('path');
const sqlite=require('sqlite3');

const db= new sqlite.Database('weeks/week3/transcript.sqlite',(err) => {
    
    if(err){
        
        console.log("error!!!");
        throw err;
    }
});


let names=[];
const sql = 'SELECT * FROM exam';

function courseNames(){
    return new Promise((resolve, reject) => {
        db.all(sql,(err,rows) => {
            if(err){
                //if I have an errore i call reject
                reject(err);
            }else{
                //here i have an array with the results of the query
                names= rows.map((exam)=>exam.name);
                //if i have a result i call resolve
                resolve(names);
            }
        });
    });
}

const namesPromise = courseNames();
//using then the callback is executed when the resolve as returned
namesPromise.then((values) => {console.log(values);})
.catch((err) => {console.log(err);});
//if some errore occur the callback of catch is executed





