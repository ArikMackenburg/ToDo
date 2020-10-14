import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'


export default function Tasks() {

  const[tasks,setTasks] = useState([
    {task:"Do Stuff", who:"Bob", difficulty: 1, status:true},
    {task:"Do More Stuff", who:"Bob", difficulty: 1, status:true},
    {task:"Do Even More Stuff", who:"Bob", difficulty: 1, status:true},
    {task:"Do Even More More Stuff", who:"Bob", difficulty: 1, status:false}
  ])

  function removeTask(index) {
    setTasks(tasks.filter((task,idx) => idx !== index));
  } 

  function updateTask(index) {
      setTasks(completionStatus(index));
  }

  function taskStatus(status) {
    if(status === true) {
      return "taskItem"
    }
    else
      return "incompleteTaskItem"
  }
  function completionStatus(index) {
    let arr = []
    for(let i = 0; i < tasks.length; i++) {
      arr[i] = tasks[i]
      if (i === index) {
        arr[index].status = !arr[index].status
      }
    }
    return arr
  }
  function countTasks(){
    let count = 0;
    tasks.forEach(element => {
      if(element.status === false) {
        count = count + 1;
        return count
      }
      return count;
    });
    return count;
  }
  function addTask(newTask) {
    setTasks([newTask, ...tasks]);
  }

  return (
    <div className="taskDiv">
      <h2>To Do List Manager ({countTasks()})</h2>
    
      <TaskForm onSave={addTask}/>

      <section>
        <ul>
          {tasks.map((task,idx) =>(
            
            <li key={idx}className={taskStatus(task.status)}>Task: {task.task} Status: {task.state === true? "Complete" : "Incomplete"}
              <button onClick={() => updateTask(idx)}>Update</button>
              <button onClick={() => removeTask(idx)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function TaskForm(props) {
  const { onSave } = props;

  function handleSubmit(e) {
    e.preventDefault();

    // e.target = the form that was submitted
    // Grab reference to the name input
    const { task } = e.target;
    const { who } = e.target;
    const { difficulty } = e.target;
    


    const newTask = {
      task: task.value,
      who: who.value,
      difficulty: difficulty.value,
      status: false,
    };

    onSave(newTask);
  }

  return (
    

      <form onSubmit={handleSubmit}>
        <h4>Add To Do Item</h4>
        <label>To Do Item</label>
        <br />
        <input name="task" placeholder="Item Details"></input>
        <br />
        <label>Assigned To</label>
        <br />
        <input name="who" placeholder="Assignee Name"></input>
        <br />
        <input name="difficulty" className="slide" type="range" min="1" max="5"></input>
        <button>Add Item</button>
      </form>
  );
}





