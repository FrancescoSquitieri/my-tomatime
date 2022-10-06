import AddTodoCardStyle from './AddTodoCard.module.css';
import {IoMdAddCircleOutline} from "react-icons/io";
import {useState} from "react";
import ToDoModal from '../../ToDoModal/ToDoModal';

export const AddTodoCard = () => {
    const [show, setShow] = useState(false);
    return (
        <div className={`${AddTodoCardStyle.AddTodoCard} rounded-3`}>
                <IoMdAddCircleOutline className={`text-muted fs-2 pointer`} onClick={() => setShow(true)} />
                <span className='text-muted ms-3 rubik'>Add Task</span>
            <ToDoModal show={show} setShow={setShow} />
        </div>
    )
}  