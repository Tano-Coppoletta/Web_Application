'use strict';


function Exam(code, name, cfu, score, date){
    this.code=code;
    this.name=name;
    this.cfu=cfu;
    this.score=score;
    this.date=dayjs(date);
}

//this return an object
function createExam(code, name, cfu, score, date){
    return {
        code: code,
        name: name,
        cfu: cfu,
        score: score,
        date: dayjs(date)
    }
}

function ExamList(){
    this.examList=[];

    this.add= (exam) => {
        this.examList.push(exam);
    }

    //find an exam object given the exam code
    this.find= (code) => {
        const result =this.examList.filter((exam)=>exam.code===code);
        if(result.length)
            return result[0];
        else
            return undefined;
    //this can be written as
    // return result.lenght ? result[0] : undefined;

    //    for(let exam of this.examList){
    //        if(exam.code === code){
    //            return exam;
    //        }
    //    }
    //    return undefined;
    }

  /*  this.afterDate = (startDate) => {
        const result=new ExamList();

        result.examList= this.examList.filter((exam)=> exam.date.isSameOrAfter(startDate));
        return result;
    //    const startDay=dayjs(startDate);
    //    for(let exam of this.examList){
    //        if(exam.date.isSameOrAfter(startDay)) //compare startDay with exam.date
    //            result.add(exam);
    //    }
    //    return result;
    }
*/
    this.print = () => {
        this.examList.forEach((exam,i) => {
            console.log(`${i+1}) ${exam.name} - ${exam.score}`)
        })
    }

    this.average = () => {
      // const scores=this.examList.map(exam => exam.score)
      // console.log(scores);
      //  const sum= scores.reduce((partial, current)=> partial+current, 0) //0 is the first parameter of the (partial,current) function
      //  console.log(sum);

        return this.examList.map(exam => exam.score).reduce((partial, current)=> partial+current, 0)
        / this.examList.length;
    }
}

