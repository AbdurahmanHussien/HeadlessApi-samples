import React, { useState, useEffect } from 'react';
import api from '../services/liferay/externalApi';


function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api("http://98.85.104.136:8082/rest/eservices/v1/tasks?systemCode=MENDIX&ADUserName=john.doe")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTasks(data.Tasks);
            })
            .catch((error) => {
                console.error("API CRASHED:", error);
            });
    }, []);

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.TaskId}>{task.TaskTitleEN}
                        <span>{task.TaskTitleAR}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Tasks;