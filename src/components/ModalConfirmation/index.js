import React, {useState} from "react";
import {Button, Form, Modal} from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupOne } from "../../redux/groupOneSlice";
import { updateGroupTwo } from "../../redux/groupTwoSlice";
import { updateGroupThree } from "../../redux/groupThreeSlice";
import { updateGroupFour } from "../../redux/groupFourSlice";

const ModalConfirmation = (props) => {
    const dispatch = useDispatch()
    const {url} = useSelector((state) => state.endpoint)
    const {token} = useSelector((state) => state.endpoint)

    const fireToEndpoint = () => {
        axios.delete(props.endpoint, token)
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
                <Modal.Title><i className="bi bi-exclamation-triangle pr-2" style={{color:"#E11428"}}></i>Delete Task</Modal.Title>
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