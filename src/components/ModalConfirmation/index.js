import React, {useState} from "react";
import {Button, Form, Modal} from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const DEFAULT_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos/"
const ModalConfirmation = (props) => {
    const dispatch = useDispatch()

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };

    const fireToEndpoint = () => {
        // console.log(props.endpoint)
        axios.delete(props.endpoint, config)
        .then((response) => {
            axios.get(DEFAULT_ENDPOINT+ props.group +"/items", config)
            .then((response) => {
                if(props.group === 1){
                    dispatch(updateGroupOne(response.data))
                }else if (props.group === 2){
                    dispatch(updateGroupTwo(response.data))
                }else if (props.group === 3){
                    dispatch(updateGroupThree(response.data))
                }else if (props.group === 4){
                    dispatch(updateGroupFour(response.data))
                } 
            })
            props.onHide()
            
        }).catch(err => {
            console.error(err);
        });;
    }

    return (
        <Modal
            show={props.show} onHide={props.onHide} animation={true}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="px-4">
                <Modal.Title><i class="bi bi-exclamation-triangle"></i>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 py-2">
              <p>Are you sure want to delete this task? your action can't be reverted</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button variant="outline-light" className="px-3 py-1" 
                onClick={props.onHide} style={{border:"1px solid black"}}><h6 className="mb-1">Cancle</h6></Button>
                <Button variant="danger" className="px-3 py-1" onClick={() => fireToEndpoint()}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalConfirmation;