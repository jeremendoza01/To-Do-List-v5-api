import React from "react";
import "./TaskList.css";

export const TaskList = ({ tasks, onDeleteTask, onEditTask }) => {
    return (
        <div className="task-list-container">
            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="task-item">
                        <div className="div-name-description">
                            <span className="task-name"><b>Nombre:</b> {task.name}</span>
                            <span className="task-description"><b>Descripcion:</b> {task.description}</span>
                        </div>
                        <div className="task-buttons">
                            <button className="button-edit" onClick={() => onEditTask(task)}>Modificar</button>
                            <button className="button-delete" onClick={() => onDeleteTask(task._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
