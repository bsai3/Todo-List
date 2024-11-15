import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
    axios.get("https://todo-list-backend-gfr7.onrender.com/get")
        .then(result => setTodos(result.data))
        .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
    axios.put(`https://todo-list-backend-gfr7.onrender.com/update/${id}`, { done: true })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create setTodos={setTodos} todos={todos} />
            {todos.length === 0 ? (
                <div><h2>No Records</h2></div>
            ) : (
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                            {todo.done ? 
                                <BsFillCheckCircleFill className='icon' /> : 
                                <BsCircleFill className='icon' />
                            }
                            <p className={todo.done ? "line" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
