import React, {useState, useEffect} from "react";
import "./index.css";
import Task from "../Task";
import ModalForm from "../ModalForm";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const GroupTask = (props) => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const {url} = useSelector((state) => state.endpoint)
    const {token} = useSelector((state) => state.endpoint)
    const color = ["blue", "yellow", "red", "green"]
    const endpoint = url + props.group +'/items/'
    const listTask = useSelector(state => {
        if(props.group === 1) {
            return state.groupOne.groupOneList
        }else if (props.group === 2){
            return state.groupTwo.groupTwoList
        }else if (props.group === 3){
            return state.groupThree.groupThreeList
        }else if (props.group === 4){
            return state.groupFour.groupFourList
        }
        return null;
     })


    const handleOnDrop = (e) => {
        const data = e.dataTransfer.getData("data").split(",")
        if (data[1] != props.group){
            const body = {"target_todo_id": props.group}
            axios.patch(url + data[1] + "/items/" + data[0], body, token)
            .then((response) => {
                axios.get(url+ props.group +"/items", token)
                .then((response) => {
                    const sortData = response.data.sort(function(a, b) {
                        return new Date(b.updated_at) - new Date(a.updated_at); //descending
                    })
                    if(props.group === 1){
                        dispatch(updateGroupOne(sortData))
                    }else if (props.group === 2){
                        dispatch(updateGroupTwo(sortData))
                    }else if (props.group === 3){
                        dispatch(updateGroupThree(sortData))
                    }else if (props.group === 4){
                        dispatch(updateGroupFour(sortData))
                    } 
                })
                axios.get(url+ data[1] +"/items", token)
                .then((response) => {
                    const sortData = response.data.sort(function(a, b) {
                        return new Date(b.updated_at) - new Date(a.updated_at); //descending
                    })
                    if(data[1] == 1){
                        dispatch(updateGroupOne(sortData))
                    }else if (data[1] == 2){
                        dispatch(updateGroupTwo(sortData))
                    }else if (data[1] == 3){
                        dispatch(updateGroupThree(sortData))
                    }else if (data[1] == 4){
                        dispatch(updateGroupFour(sortData))
                    } 
                })
            })
        }
    
    }

    const handleonDragOver = (e) => {
        e.preventDefault()
    }

    return(
        <div className={"group-container col-md-3 mb-2 "+ color[props.group-1]} onDrop={handleOnDrop} onDragOver={(e) => handleonDragOver(e)}>
            <div className="p-2">
                <div className={"group "+ color[props.group-1]}>
                    <p className="group-name m-0 px-2">{props.title}</p>
                </div>
                <p className="text-bold m-0 mt-2">{props.description}</p>

                {listTask.map((task) => <Task name={task.name} percentage={task.progress_percentage} endpoint={endpoint+task.id} 
                    group={task.todo_id} id={task.id} key={task.id}/>)}

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
                group={props.group}
            />
        </div>
    )
}
export default GroupTask;