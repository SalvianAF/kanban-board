import React, {useState} from "react";
import {Button, Form, Modal} from 'react-bootstrap';
import axios from "axios";

const CREATE_TASK_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos/"
const ModalForm = (props) => {
    const [firstInput, setFirstInput] = useState(props.name)
    const [secondInput, setSecondInput] = useState(props.percentage)
    const [isValid, setIsValid] = useState(true)

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };

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
                console.log(props.endpoint)
                axios.patch(props.endpoint, body, config)
                .then((response) => {
                    console.log(response)
                    if (props.type === "edit task"){
                        const temp = {
                            "name": response.data.name,
                            "progress_percentage": response.data.progress_percentage
                        }
                        axios.post(CREATE_TASK_ENDPOINT+ props.group +"/items", temp, config)
                        .then((resp) => console.log(resp))
                    }
                    props.onHide()
                    
                }).catch(err => {
                    console.error(err);
                });
            }else{
                axios.post(props.endpoint, body, config)
                .then((response) => {
                    console.log(response)
                    props.onHide()
                    
                }).catch(err => {
                    console.error(err);
                });;
            }
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
                <Button variant="primary" style={{width:120}} onClick={() => fireToEndpoint()}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalForm