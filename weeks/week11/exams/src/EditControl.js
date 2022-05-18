import {Button} from 'react-bootstrap';

function EditControl(props){
    //the two callback are identical
    return <p>{props.editable ? 
        <Button variant='outline-secondary' onClick={() => { props.setMode('view')}}>View</Button> : 
        <Button variant='outline-secondary'  onClick={() =>{props.setMode('change')}}>Change</Button> }
    </p>;
}

export default EditControl;