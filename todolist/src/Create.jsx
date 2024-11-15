import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


function Create({ setTodos, todos }) {
    const [task, setTask] = useState("");
    const handleAdd = () => {
    axios.post('https://todo-list-backend-gfr7.onrender.com/add', { task: task })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };
    return (
        <div className='create_form'>
            <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}


export default Create;
