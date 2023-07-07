import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import GroupTask from "../../components/GroupTask";
import "./index.css"
import axios from "axios";
import ModalForm from "../../components/ModalForm";
import { useSelector, useDispatch } from 'react-redux'
import { updateTasks } from "../../redux/taskSlice";
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const DEFAULT_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos"
const Board = () => {
    // const [taskList, setListGroup] = useState([]);
    const {taskList} = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    const group = [1,2,3,4]
    const [modalShow, setModalShow] = useState(false);

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };

    useEffect(() => {
        getGroupList()
        getTaskPerGrop()
    }, [])

    const getGroupList = async () => {
        axios.get(DEFAULT_ENDPOINT, config)
        .then((response) => {
            dispatch(updateTasks(response.data))
            // console.log(taskList.length)
            // console.log(taskList)
        }).catch(err => {
            console.error(err);
        });;
    }

    const getTaskPerGrop = () => {
        group.map((val) => {
            axios.get(DEFAULT_ENDPOINT +"/"+ val + "/items", config)
            .then((response) => {
                const sortData = response.data.sort(function(a, b) {
                    return new Date(b.updated_at) - new Date(a.updated_at); //descending
                })
                
                if(val === 1){
                    dispatch(updateGroupOne(sortData))
                }else if (val === 2){
                    dispatch(updateGroupTwo(sortData))
                }else if (val === 3){
                    dispatch(updateGroupThree(sortData))
                }else if (val === 4){
                    dispatch(updateGroupFour(sortData))
                }
                // console.log(taskList)
            }).catch(err => {
                console.error(err);
            });;
        })
    }


    return(
        <div>
            <div className="navbar px-4 py-3">
                <h5 className="mr-4 mb-0">Product Roadmap</h5>
               {taskList.length < 4? 
                    <Button className="button-primary" onClick={() => setModalShow(true)}><i class="bi bi-plus-lg icon-bold"></i> &nbsp;Add New Group</Button>
               : <></>}
                

            </div>
            <div className="m-4 d-flex justify-content-between">
                {Object.values(taskList).map((group,idx) => <GroupTask title={group.title} description={group.description} group={idx+1}/>)}
                   
            </div>
            <ModalForm
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={"add group"}
                endpoint={DEFAULT_ENDPOINT}
            />
        </div>
    )
}
export default Board;