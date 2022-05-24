import { Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import ExamTable from './ExamTable';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import API from './API';
import AddExamForm from './AddExamForm';

function App() {

  const [exams, setExams] = useState([]);
  // an array of objects of type Exam

  const [loading, setLoading] = useState(true);

  // INITIAL LOAD OF THE EXAM LIST, at application startup time
  useEffect(() => {
    async function load() {
      const list = await API.readExams();
      setExams(list);
      setLoading(false);
    }
    load();
  }, []);

  const removeExam = async (code) => {
    try{
      setLoading(true);
      await API.removeExam(code);
     // setExams((oldExams)=>(oldExams.filter((e)=>(e.code!=code))))
      const list=await API.readExams();
      setExams(list);
      setLoading(false);
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  const addExam = async (exam) => {
    try{
      setLoading(true);
      await API.addExam(exam);
      const list=await API.readExams();
      setExams(list);
      setLoading(false);
    }catch(err){
      throw err;
    }
  }

  const editExam = async (exam) => {
    try{
      setLoading(true);
      await API.editExam(exam);
      console.log("!!!!!!!!!!!!")
      const list=await API.readExams();
      setExams(list);
      setLoading(false); 
    }catch(err){
      throw err;
    }
  }


  const getExamByCode = (code) => {
    return exams.filter((e) => (e.code === code))[0];
  }

  const examAvg = exams.reduce((s, e) => (s + e.score), 0) / exams.length;

  return (
    <BrowserRouter>
      <Container>
        <Row>
          <Col>
            <h1>My Exams (Average: {examAvg})</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Routes>
              <Route index element={<ExamTable loading={loading} exams={exams} editable={false} />} />
              <Route path='/change' element={<ExamTable loading={loading} exams={exams} editable={true} removeExam={removeExam} />} />
              <Route path='/add' element={<AddExamForm loading={loading} mode='add' addOrEditExam={addExam} />} />
              <Route path='/edit/:examCode' element={<AddExamForm loading={loading} mode='edit' addOrEditExam={editExam} getExamByCode={getExamByCode} />} />
            </Routes>
          </Col>
        </Row>

      </Container>
    </BrowserRouter>
  );
}

export default App;
