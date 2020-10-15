import React, { useState } from 'react';
import { Badge, Card, Button, Alert } from 'reactstrap'
import  Login from './components/auth/login'
import { useAuth } from './components/auth/auth';


export default function Tasks() {

  const { user } = useAuth();

  

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
  function TaskCard(task,idx) {
    if(!user) {
      return (
        <Alert onClick={() => updateTask(idx)} color={task.status === true? "success" : "danger"} key={idx}className={taskStatus(task.status)}>
          <Badge color={task.status === true? "success" : "danger"} pill>{task.status === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.task}</h3>
        </Alert>
      )
    }
    if(user.permissions.includes("delete")) {
      return (
        <Alert onClick={() => updateTask(idx)} color={task.status === true? "success" : "danger"} key={idx}className={taskStatus(task.status)}>
          <Badge color={task.status === true? "success" : "danger"} pill>{task.status === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.task}</h3>
          <Button onClick={() => removeTask(idx)}>Delete</Button>
        </Alert>
      )
    }
    else {
      return (
        <Alert onClick={() => updateTask(idx)} color={task.status === true? "success" : "danger"} key={idx}className={taskStatus(task.status)}>
          <Badge color={task.status === true? "success" : "danger"} pill>{task.status === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.task}</h3>
        </Alert>
      )
    }
  }

  return (
    <div className="taskDiv">
      <Header countTasks={countTasks}></Header>
    
      <TaskForm onSave={addTask}/>

      <section>
        <ul>
          {tasks.map((task,idx) =>(
            <div>{TaskCard(task,idx)}</div>            
          ))}
        </ul>
      </section>
    </div>
  );
}


function TaskForm(props) {
  const { onSave } = props;
  const { user } = useAuth();
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
  if(!user) {
    return null;
  }
  else if(user.permissions.includes("create")) {
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
        <Button>Add Item</Button>
      </form>
    );
  }
  return null;
  
}

function Header(props) {
  const {countTasks} = props
  return (
    <div className="taskBar">
      <Login ></Login>
      <br></br>
      <h2>To Do List Manager ({countTasks()})</h2>
    </div>   
  )
}







