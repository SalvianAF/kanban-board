import React from "react";
import "./index.css";
import Bar from "../Bar";


const Task = (props) => {

    const handleOnDragStart = (e, id, group) => {
        e.dataTransfer.setData("data", [id, group]);
    } 

    return(
        <div className="card mt-2 drag-content" draggable onDragStart={(e) => handleOnDragStart(e, props.id, props.group)}>
            <div className="content">
                <h6 className="task-name">{props.name}||{props.id},{props.group}</h6>
                <div className="line"></div>
                <Bar percentage={props.percentage} name={props.name} endpoint={props.endpoint} group={props.group}/>
            </div>           
        </div>
    )
}
export default Task;