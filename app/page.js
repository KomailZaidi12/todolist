"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [mainTask, setMainTask] = useState([])
  const [editingIndex, setEditingIndex] = useState(null);

  let renderTask = <h2> No Task update</h2>

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between">
          <div className='flex justify-between items-center mb-5 w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <h6 className='text-lg font-medium'>{t.desc}</h6>
          </div>
          <button
            onClick={() => editHandler(i)}
            className='bg-blue-400 text-white px-4 py-2 rounded font-bold mr-2'>
            Edit
          </button>
          <button onClick={ ()=>{
            deleteHandler(i)
          }} className='bg-red-400 text-white px-4 py-2 rounded font-bold'>Delete</button>
        </li>
      )
    });
  }
// submit handler event
  const submitHandler = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Edit existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editingIndex] = { title, desc };
      setMainTask(updatedTasks);
      setEditingIndex(null);
    } else {
      // Add new task
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle('');
    setDesc('');
  };
// delete handler event
  const deleteHandler = (i) =>{
    let copyTask = [...mainTask]
    copyTask.splice(i,1)
    setMainTask(copyTask)
  }
  const editHandler = (i) => {
    const taskToEdit = mainTask[i];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditingIndex(i);
  };
  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Komail TodoList</h1>
      <form onSubmit={submitHandler}>
        <input type="text" className='text-2xl border-zinc-800 border-4 px-2 m-8 py-2' placeholder='Enter Title here'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" className='text-2xl border-zinc-800 border-4 px-2 m-8 py-2' placeholder='Enter Description here'
          value={desc} onChange={(e) => { setDesc(e.target.value) }}
        />
        <button className='bg-black text-white px-4 py-2 text-2xl font-bold rounded'>Add Task</button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200 ">
        <ul className='text-black'>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page