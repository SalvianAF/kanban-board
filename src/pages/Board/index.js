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

const Board = () => {
    const {taskList} = useSelector((state) => state.tasks)
    const {url} = useSelector((state) => state.endpoint)
    const {token} = useSelector((state) => state.endpoint)
    const dispatch = useDispatch()
    const group = [1,2,3,4]
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        getGroupList()
        getTaskPerGrop()
    }, [])

    const getGroupList = async () => {
        axios.get(url, token)
        .then((response) => {
            dispatch(updateTasks(response.data))
        }).catch(err => {
            console.error(err);
        });;
    }

    const getTaskPerGrop = async () => {
        group.map((val) => {
            axios.get(url + val + "/items", token)
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
            }).catch(err => {
                console.error(err);
            });
        })
    }


    return(
        <div>
            <div className="navbar px-4 py-3">
                <h5 className="mr-4 mb-0">Product Roadmap</h5>
               {taskList.length < 4? 
                    <Button className="button-primary" onClick={() => setModalShow(true)}><i className="bi bi-plus-lg icon-bold"></i> &nbsp;Add New Group</Button>
               : <></>}
                

            </div>
            <div className="m-4 d-flex justify-content-between">
                {Object.values(taskList).map((group,idx) =>
                     <GroupTask title={group.title} description={group.description} group={idx+1} key={idx}/>
                )}
                   
            </div>
            <ModalForm
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={"add group"}
            />
        </div>
    )
}
export default Board;