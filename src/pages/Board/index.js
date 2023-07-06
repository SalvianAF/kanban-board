import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import GroupTask from "../../components/GroupTask";
import "./index.css"
import axios from "axios";
import ModalForm from "../../components/ModalForm";

const ADD_GROUP_ENDPOINT = "https://todo-api-18-140-52-65.rakamin.com/todos"
const Board = () => {
    const [listGroup, setListGroup] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
    };

    useEffect(() => {
        getGroupList()
    }, [])

    const getGroupList = async () => {
        axios.get('https://todo-api-18-140-52-65.rakamin.com/todos/', config)
        .then((response) => {
            setListGroup(response.data)
            console.log(listGroup.length)
            // console.log(listGroup)
        }).catch(err => {
            console.error(err);
        });;
    }


    return(
        <div>
            <div className="navbar px-4 py-3">
                <h5 className="mr-4 mb-0">Product Roadmap</h5>
               {listGroup.length < 4? 
                    <Button className="button-primary" onClick={() => setModalShow(true)}><i class="bi bi-plus-lg icon-bold"></i> &nbsp;Add New Group</Button>
               : <></>}
                

            </div>
            <div className="m-4 d-flex justify-content-between">
                {Object.values(listGroup).map((group,idx) => <GroupTask title={group.title} description={group.description} group={idx+1}/>)}
                   
            </div>
            <ModalForm
                show={modalShow}
                onHide={() => setModalShow(false)}
                type={"add group"}
                endpoint={ADD_GROUP_ENDPOINT}
            />
        </div>
    )
}
export default Board;