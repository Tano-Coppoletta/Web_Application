import {Exam,ExamList} from './exam';
import dayjs from 'dayjs';

function load_data(){
    const transcript=new ExamList();
    transcript.add(new Exam('02LSEOV','Computer architectures',10,18,dayjs('2022-01-01')));
    transcript.add(new Exam('01NYHOV','System and device programming',10,30,dayjs('2022-06-28')));
    transcript.add(new Exam('01TXYOV','Web application',6,30,dayjs('2022-03-01')));
    return transcript;
}

export default load_data;