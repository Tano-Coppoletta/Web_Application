const { response } = require("express");

const APIURL='http://localhost:3001/api/v1';

function readExams(){
    const url=APIURL + '/exams';
    try{
    const response=await fetch(url);
        if(response.ok){
            const list= await response.json();
            return list;
        }else{
            //Error
            console.log(response.statusText);
        }
    }catch(ex){
        console.log(ex);
    }
}

async function addExam(exam){
    const url=APIURL+"/exams";
    try{
        const reponse= await fetch(url, {
            method: 'POST',
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        if(response.ok)
            return true;
        else{
            const text = await response.text();
            console.log(text);
            throw new TypeError(text);
        } 
    }catch(ex){
        console.log(ex);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadButton').addEventListener('click',async () => {
        const data = await readExams();
        document.getElementById('result').innerText=data;
    })
    document.getElementById('addButton'.addEventListener('click', ()=>{
        addExam({code:'99zzz',name:'Test exam',score:31,date:'2022/05/17',cfu:8});
    }))
});