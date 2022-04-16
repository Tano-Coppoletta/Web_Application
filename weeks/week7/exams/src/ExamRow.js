
import {Button} from 'react-bootstrap';

function ExamRow(props){
    return <tr>
        <ExamData exam={props.exam}/>
        {props.editable && <ExamAction exam={props.exam} removeExam={props.removeExam}/>}
    </tr>;
}

function ExamData(props){
    return <>
        <td>{props.exam.code}</td>
        <td>{props.exam.name}</td>
        <td>{props.exam.score}</td>
        <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>;
}

function ExamAction(props){
    return <td>
            <Button variant="outline-danger" onClick={() =>{props.removeExam(props.exam.code)}}>Delete</Button>{' '}  
            <Button variant="outline-warning">Edit</Button>{' '}
        </td>
}

export default ExamRow;