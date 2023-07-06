import React, {useState, useEffect} from "react";
import "./index.css";
import Task from "../Task";
import ModalForm from "../ModalForm";
import axios from "axios";

const DEFAULT_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos/"
const GroupTask = (props) => {
    const [modalShow, setModalShow] = useState(false)
    const [listTask, setListTask] = useState([])
    const endpoint = DEFAULT_ENDPOINT + props.group +'/items/'
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };

    useEffect(() => {
        getTaskList()
        console.log(props.group)
    }, [])

    const getTaskList =  () => {
        axios.get(endpoint, config)
        .then((response) => {
            setListTask(response.data)
            console.log(response.data)
        }).catch(err => {
            console.error(err);
        });;
    }

    const handleOnDrop = (e) => {
        const data = e.dataTransfer.getData("data").split(",")
        const body = {"target_todo_id": props.group}
        axios.patch(DEFAULT_ENDPOINT + data[1] + "/items/" + data[0], body, config)
        .then((response) => {
            console.log(response)
            if (props.type === "edit task"){
                const temp = {
                    "name": response.data.name,
                    "progress_percentage": response.data.progress_percentage
                }
                axios.post(DEFAULT_ENDPOINT+ props.group +"/items", temp, config)
                .then((resp) => console.log(resp))
            }
        }).catch(err => {
            console.error(err);
        });;
    }

    const handleonDragOver = (e) => {
        e.preventDefault()
    }

    return(
        <div className="board col-3 mb-2 " onDrop={handleOnDrop} onDragOver={(e) => handleonDragOver(e)}>
            <div className="p-2">
                <div className="group">
                    <p className="group-name m-0 px-2">{props.title}</p>
                </div>
                <p className="text-bold m-0 mt-2">{props.description}</p>

                {listTask.map((task) => <Task name={task.name} percentage={task.progress_percentage} endpoint={endpoint+task.id} 
                    group={task.todo_id} id={task.id}/>)}

                <a className="row mt-2 add-task" href="/#" onClick={() => setModalShow(true)}>
                    <i className="bi bi-plus-circle icon-bold col-1"></i>
                    <p className="text col-5">New Task</p>
                </a>
            </div>
            <ModalForm
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={"create task"}
                endpoint={endpoint}
            />
        </div>
    )
}
export default GroupTask;