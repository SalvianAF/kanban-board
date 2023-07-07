import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";
import { updateTasks } from "../../redux/taskSlice";

const ModalForm = (props) => {
    const [firstInput, setFirstInput] = useState("")
    const [secondInput, setSecondInput] = useState("")
    const [isValid, setIsValid] = useState(true)
    const dispatch = useDispatch()
    //get data from store
    const {url} = useSelector((state) => state.endpoint)
    const {token} = useSelector((state) => state.endpoint)

    useEffect(() => {
        setFirstInput(props.name)
        setSecondInput(props.percentage)
    },[props.show]) //to trigering rerender


    const fireToEndpoint = () => {
        if (firstInput === "" || secondInput === "") {
            setIsValid(false)
        } else{
            setIsValid(true)
            const body = {};
            if (props.type === "add group"){
                body["title"] = firstInput;
                body["description"] = secondInput;
            }else{
                body["name"] = firstInput;
                body["progress_percentage"] = secondInput;
            }
            
            if (props.type === "edit task"){
                axios.patch(props.endpoint, body, token)  //updating task
                .then((response) => {
                    if (props.type === "edit task"){
                        const temp = {
                            "name": response.data.name,
                            "progress_percentage": response.data.progress_percentage
                        }
                        axios.post(url+ props.group +"/items", temp, token) //post the updated task
                        .then(() => {
                            axios.get(url+ props.group +"/items", token) // get tasks from group
                            .then((response) => {
                                const sortData = response.data.sort(function(a, b) {
                                    return new Date(b.updated_at) - new Date(a.updated_at); //descending to make sure newest updated data is in the top
                                })
                                if(props.group === 1){  //store tasks to appropriate group
                                    dispatch(updateGroupOne(sortData))
                                }else if (props.group === 2){
                                    dispatch(updateGroupTwo(sortData))
                                }else if (props.group === 3){
                                    dispatch(updateGroupThree(sortData))
                                }else if (props.group === 4){
                                    dispatch(updateGroupFour(sortData))
                                } 
                            }).catch(err => {
                                console.error(err);
                            });
                        })
                    }
                    props.onHide()
                    
                }).catch(err => {
                    console.error(err);
                });
            }else{
                axios.post(props.endpoint, body, token) // post new task or group
                .then(() => {
                    axios.get(props.endpoint, token) // get new task or group
                    .then((response) => {
                        console.log(props.endpoint)
                        if (props.type === "add group"){
                            dispatch(updateTasks(response.data))
                        }else{
                            const sortData = response.data.sort(function(a, b) {
                                return new Date(b.updated_at) - new Date(a.updated_at); //descending to make sure newest updated data is in the top
                            })
                            if(props.group === 1){  //store tasks to appropriate group
                                dispatch(updateGroupOne(sortData))
                            }else if (props.group === 2){
                                dispatch(updateGroupTwo(sortData))
                            }else if (props.group === 3){
                                dispatch(updateGroupThree(sortData))
                            }else if (props.group === 4){
                                dispatch(updateGroupFour(sortData))
                            } 
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                    props.onHide()
                    
                }).catch(err => {
                    console.error(err);
                });;
            }
            setFirstInput("")
            setSecondInput("")
        }
    }

    return (
        <Modal
            show={props.show} onHide={props.onHide} animation={true}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {props.type === "add group"? 
                    <Modal.Title>Add New Group</Modal.Title>
                :props.type === "edit task"? 
                    <Modal.Title>Edit Task</Modal.Title>
                :
                    <Modal.Title>Create Task</Modal.Title>
                }

            </Modal.Header>
            <Modal.Body style={{paddingTop:30}}>
                <Form>
                    <Form.Group >
                        {props.type === "add group"?
                            <div>
                                <h6>Title</h6>
                                <Form.Control value={firstInput} className="input" placeholder="Type Group Title" onChange={(e) => {
                                    setFirstInput(e.target.value);
                                }}/>
                                <h6>Description</h6>
                                <Form.Control value={secondInput} className="input" as="textarea" rows={3} placeholder="Type Group Description"
                                onChange={(e) => {
                                    setSecondInput(e.target.value);
                                }}/>
                                 {isValid?<></>:
                                    <Form.Text className="invalid">
                                        please make sure title and description is filled
                                    </Form.Text>
                                }
                            </div>
                        :
                            <div>
                                 <h6>Task Name</h6>
                                <Form.Control value={firstInput} className="input" placeholder="Type your Task" onChange={(e) => {
                                    setFirstInput(e.target.value);
                                }}/>
                                <h6>Progress</h6>
                                <Form.Control value={secondInput} className="input"  placeholder="70 or 70%" onChange={(e) => {
                                    setSecondInput(e.target.value);
                                }}/>
                                {isValid?<></>:
                                    <Form.Text className="invalid">
                                        please make sure task name and progress is filled
                                    </Form.Text>
                                }
                            </div>
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button variant="outline-light" onClick={props.onHide} style={{width:120}}>Cancle</Button>
                <Button variant="primary" style={{width:120, color:"white"}} onClick={() => fireToEndpoint()}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalForm