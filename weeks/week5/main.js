'use strict'

function generateTable(exams){
    const tbody=document.querySelector('tbody');
    tbody.innerHTML='';

    exams.examList.forEach((exam) => {
         const tr=document.createElement('tr');
        // const td1=document.createElement('td');
        // td1.textContent=exam.name;
        // const td2=document.createElement('td');
        // td2.textContent=exam.score;
        // const td3=document.createElement('td');
        // td3.textContent=exam.date.format("YYYY-MM-DD");
        // tr.appendChild(td1);
        // tr.appendChild(td2);
        // tr.appendChild(td3);
        // tbody.append(tr);
        
        tr.innerHTML=`<td>${exam.name}</td><td>${exam.score}</td><td>${exam.date.format('YYYY-MM-DD')}</td>
        <td><button type="button" class="btn btn-danger">X</button></td>`

        tbody.appendChild(tr);

        const buttonX=tr.querySelector('button');
        buttonX.addEventListener('click',(event) => {
            console.log(`Delete exam ${exam.code}`);
            exams.examList= exams.examList.filter((e)=>e.code!==exam.code) ;
            //re-generate list
            generateTable(exams);
        })

        tbody.appendChild(tr);
        updateAverage(exams);


    })
}

function updateAverage(exams){
    const average=exams.average();
    document.querySelector('#average').textContent=average;
}

document.addEventListener('DOMContentLoaded',(event)=> {
    const exams=new ExamList();
    exams.add(new Exam('123abc','whatever course',8,27,'2020-03-08'));
    exams.add(new Exam('66zzz','title',6,24,'2021-09-01'));

    generateTable(exams);

   
})

