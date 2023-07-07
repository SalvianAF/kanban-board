import React, {useState} from "react";
import "./index.css";
import { ProgressBar } from "react-bootstrap";
import ModalForm from "../ModalForm";
import ModalConfirmation from "../ModalConfirmation";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const Bar = (props) => {
    const [modalFormShow, setModalFormShow] = useState(false)
    const [modalConfShow, setModalConfShow] = useState(false)
    const {url} = useSelector((state) => state.endpoint)
    const {token} = useSelector((state) => state.endpoint)
    const dispatch = useDispatch()

    const moveGroup = (direction) => {
        let newGroup = props.group
        if (direction === "left"){ //decrement the group id
            newGroup -= 1
        } else if (direction === "right"){ //increment the group id
            newGroup += 1
        }
        const body = {"target_todo_id": newGroup}
        axios.patch(props.endpoint, body, token) // updating task; my assumption this update trigering post in backend
        .then((response) => {
            axios.get(url+ newGroup +"/items", token) // get tasks from new group
            .then((response) => {
                const sortData = response.data.sort(function(a, b) {
                    return new Date(b.updated_at) - new Date(a.updated_at); //descending to make sure newest updated data is in the top
                })
                if(newGroup === 1){ //store tasks to appropriate group
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
            axios.get(url+ props.group +"/items", token) // get tasks from current group
            .then((response) => {
                const sortData = response.data.sort(function(a, b) {
                    return new Date(b.updated_at) - new Date(a.updated_at); //descending to make sure newest updated data is in the top
                })
                if(props.group === 1){ //store tasks to appropriate group
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
            <div className="btn-group dropdown col-2 icon">
                <a  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/#">
                   <h5><i className="bi bi-three-dots px-0" style={{color:"#757575"}}></i></h5>
                </a>
                <div className="dropdown-menu">
                    <div className="dropdown-item"  onClick={() => moveGroup("right")}><i className="bi bi-arrow-right icon-bold pr-4"></i>Move Right</div>
                    <div className="dropdown-item" onClick={() => moveGroup("left")}><i className="bi bi-arrow-left icon-bold pr-4"></i>Move Left</div>
                    <div className="dropdown-item" onClick={() => setModalFormShow(true)}><i className="bi bi-pencil-square icon-bold pr-4"></i>Edit</div>
                    <div className="dropdown-item danger"  onClick={() => setModalConfShow(true)}><i className="bi bi-trash3 icon-bold pr-4"></i>Delete</div>
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