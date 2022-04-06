
import {Button} from 'react-bootstrap';

function ExamRow(props){
    return <tr>
        <ExamData exam={props.exam}/>
        <ExamAction exam={props.exam}/>
    </tr>;
}

function ExamData(props){
    return <>
        <td>{props.exam.name}</td>
        <td>{props.exam.score}</td>
        <td>{props.exam.date.format('YYYY-MM-DD')}</td>
    </>;
}

function ExamAction(props){
    return <td><Button variant="danger">X</Button></td>
}

export default ExamRow;