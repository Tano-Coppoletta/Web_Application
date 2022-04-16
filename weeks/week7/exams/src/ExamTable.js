import {Button, Table} from 'react-bootstrap';
import ExamRow from './ExamRow';
import {useState} from 'react';
import EditControl from './EditControl';
import AddExamForm from './AddExamForm'

function ExamTable(props){

    const [editable,setEditable] = useState(false);

    //I create a function that change the state and I can pass it to the child of the table
    const changeEditable= (value) => {setEditable(value)};
    //secondo way of doing the same thing
    const toggleEditable= () => {setEditable( (oldEditable) => (!oldEditable))}
    
    //on click we change the state of the bool editable and we change the button
    return <>
    <EditControl editable={editable} toggleEditable={toggleEditable}/>
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
            {props.exams.map((exam)=> (<ExamRow key={exam.code} exam={exam} editable={editable} removeExam={props.removeExam}/>))}
        </tbody>
        <tfoot>
            <tr>
                <AddExamForm/>
            </tr>
        </tfoot>
    </Table>
    </>

}

export default ExamTable;