import {Button} from 'react-bootstrap';

function EditControl(props){
    //the two callback are identical
    return <p>{props.editable ? 
        <Button onClick={() => { props.toggleEditable()}}>View</Button> : 
        <Button onClick={props.toggleEditable}>Change</Button> }
    </p>;
}

export default EditControl;