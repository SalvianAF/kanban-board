import React, {useState} from "react";
import "./index.css";
import { ProgressBar } from "react-bootstrap";
import ModalForm from "../ModalForm";
import ModalConfirmation from "../ModalConfirmation";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const DEFAULT_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos/"
const Bar = (props) => {
    const [modalFormShow, setModalFormShow] = useState(false)
    const [modalConfShow, setModalConfShow] = useState(false)

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };
    const dispatch = useDispatch()

    const moveGroup = (direction) => {
        let newGroup = props.group
        if (direction === "left"){
            newGroup -= 1
        } else if (direction === "right"){
            newGroup += 1
        }
        const body = {"target_todo_id": newGroup}
        axios.patch(props.endpoint, body, config)
        .then((response) => {
            // console.log(response)
            // const temp = {
            //     "name": response.data.name,
            //     "progress_percentage": response.data.progress_percentage
            // }
            // axios.post(DEFAULT_ENDPOINT+ newGroup +"/items", temp, config)
            // .then((resp) => {
                axios.get(DEFAULT_ENDPOINT+ newGroup +"/items", config)
                .then((response) => {
                    // dispatch(updateTasks(response.data))
                    const sortData = response.data.sort(function(a, b) {
                        return new Date(b.updated_at) - new Date(a.updated_at); //descending
                    })
                    console.log(response)
                    if(newGroup === 1){
                        dispatch(updateGroupOne(sortData))
                    }else if (newGroup === 2){
                        dispatch(updateGroupTwo(sortData))
                    }else if (newGroup === 3){
                        dispatch(updateGroupThree(sortData))
                    }else if (newGroup === 4){
                        dispatch(updateGroupFour(sortData))
                    } 
                // })
                })
                axios.get(DEFAULT_ENDPOINT+ props.group +"/items", config)
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
        }
            
        ).catch(err => {
            console.error(err);
        });;
    }



    return(
        <div className="row">
            <div className="col-8" >
                {props.percentage === 100 ?
                    <ProgressBar now={props.percentage} className="mt-1" variant="success"/>
                :
                    <ProgressBar now={props.percentage} className="mt-1"/>
                }
            </div>
            {props.percentage === 100 ? 
                <i className="bi bi-check-circle-fill col-2 pl-0"></i>
            :
                <p className="col-2 percentage px-0 my-0">{props.percentage}%</p>
            }
            <div class="btn-group dropdown col-2 icon">
                <a  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/#">
                   <h5><i className="bi bi-three-dots px-0" style={{color:"#757575"}}></i></h5>
                </a>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="/#" onClick={() => moveGroup("right")}><i className="bi bi-arrow-right icon-bold pr-4"></i>Move Right</a>
                    <a className="dropdown-item" href="/#" onClick={() => moveGroup("left")}><i className="bi bi-arrow-left icon-bold pr-4"></i>Move Left</a>
                    <a className="dropdown-item" href="/#" onClick={() => setModalFormShow(true)}><i className="bi bi-pencil-square icon-bold pr-4"></i>Edit</a>
                    <a className="dropdown-item danger" href="/#" onClick={() => setModalConfShow(true)}><i className="bi bi-trash3 icon-bold pr-4"></i>Delete</a>
                </div>
                <ModalForm
                    show={modalFormShow}
                    onHide={() => setModalFormShow(false)}
                    type={"edit task"}
                    endpoint={props.endpoint}
                    name={props.name}
                    percentage={props.percentage}
                    group={props.group}
                />
                <ModalConfirmation
                    show={modalConfShow}
                    onHide={() => setModalConfShow(false)}
                    endpoint={props.endpoint}
                    group={props.group}
                />
            </div>
           
            
        </div>
    )
}
export default Bar;