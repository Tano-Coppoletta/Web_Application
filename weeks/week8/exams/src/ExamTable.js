import {Button, Table} from 'react-bootstrap';
import ExamRow from './ExamRow';
import {useState} from 'react';
import EditControl from './EditControl';
import AddExamForm from './AddExamForm'

function ExamTable(props){

   // const [editable,setEditable] = useState(false);
    const [mode,setMode]= useState('view'); //allowed values: view,change,edit,add
    const editable=(mode!=='view'); //editable is true if it is not 'view'
 
    const [editedExam,setEditedExam]=useState({});

    const editExam= (exam) => {
        setMode('edit');
        setEditedExam(exam);
    }
    //on click we change the state of the bool editable and we change the button
    return <>
    <EditControl editable={editable} setMode={setMode}/>
    <Table striped={true}>
        <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
                {editable && <th>Action</th>}
            </tr>
        </thead>
        <tbody>
            {props.exams.map((exam)=> (<ExamRow key={exam.code} exam={exam} removeExam={props.removeExam}
            mode={mode} setMode={setMode} editable={editable} editExam={editExam}/>))}
        </tbody>
    </Table>
    {mode==='change' && 
        <div align='right'><Button type='button' variant='outline-success' onClick={() => setMode('add')}>Add</Button></div>}
    {mode === 'add' && 
        <AddExamForm mode={mode} setMode={setMode} addOrEditExam={props.addExam}></AddExamForm>}
    {mode === 'edit' &&
        <AddExamForm mode={mode} setMode={setMode} editedExam={editedExam} addOrEditExam={props.editExam}/>}
    </>

}

export default ExamTable;