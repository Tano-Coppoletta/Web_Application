import {Col, Container, Row} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamTable from './ExamTable';
import load_data from './load_data';
import { useState } from 'react';

const myexamlist=load_data();


function App() {

  const [exams, setExams]= useState(myexamlist.examList);
  //the state is an array of objects of type Exam
 
  //remove the exam with code = to the code selected
  const removeExam = (code) => {
    setExams((oldExams) => (oldExams.filter((e)=>(e.code!==code))));
  }

  const addExam= (exam) => {
    //setExams([...exams,exam]);
    //this compute the array in the moment that the function is generated,
    //the value can change since we are using async operation
    //with a callback we guarantee that oldExams is the last array of exam
    setExams((oldExams) =>[...oldExams,exam]);
  }
  //const examAverage= () => (exams.reduce((s,e) => (s+e.score),0)/exams.length);

  const editExam= (exam) => {
    setExams((es) =>(es.map((e) => (e.code===exam.code ? exam : e))))
  }

  const examSum = exams.reduce((s,e)=>(s+e.score),0);
  const examAvg = examSum/exams.length;

  return (
    <Container>
      <Row>
        <Col>
          <h1>My Exams (Average: {examAvg })</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExamTable exams={exams} removeExam={removeExam} addExam={addExam} editExam={editExam}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
