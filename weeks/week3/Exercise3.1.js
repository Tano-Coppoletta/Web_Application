'use strict';

const sqlite=require('sqlite3');
const dayjs=require('dayjs');

function Exam(code, name, cfu, score, date){
    this.code=code;
    this.name=name;
    this.cfu=cfu;
    this.score=score;
    this.date=dayjs(date);
}


/**
 * constructor of ExamList
 * the database is private, accessible only throught this function
 */
function ExamList(){
    const db= new sqlite.Database('weeks/week3/transcript.sqlite',(err) => {
        if(err){
            console.log("error!!!");
            throw err;
        }
    });

    //we assume that exam is a well constructed exam
    this.add = (exam) => {
        return new Promise((resolve,reject) => {
            const sql='INSERT INTO exam(code,name,cfu,date,score) VALUES(?,?,?,?,?)';
            db.run(sql, [exam.code,exam.name,exam.cfu,exam.date,exam.score], (err) => {
                if(err)
                    reject(err);
                else
                    resolve(true);
            });
            
        });
    };

    this.getAll = () => {
        return new Promise((resolve,reject) => {
            const sql= 'SELECT * FROM exam';
            db.all(sql, (err,rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows.map((e) => new Exam(e.code,e.name,e.cfu,e.score,e.date)))
            });
        });
    };

    this.find = (courseCode) => {
        
    }
}

//async replace the return new Promise(etc)
//they're equivalent, async return a promise
async function main(){
    const exams = new ExamList();
 
    //thanks to the await I am sure that the getAll will also return the 
    //new exam ZZZZZ
    //await exams.add(new Exam('ZZZZZ','title2',6,24,'2021-09-01'));
    const myexam=await exams.getAll();
    console.log(myexam);
    //the return instruction replace the resolve of the promise
    return 3;
}

/*exams.add(new Exam('66zzz','title',6,24,'2021-09-01'))
    .then((result) => {
        console.log('Successfully inserted!');
    }).catch((err) => {
        console.log('Errore in insert',err);
    })
    */
main();
//this is writte asynchronously from the main
console.log(2);




