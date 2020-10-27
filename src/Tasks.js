import React, { useState, useEffect } from 'react';
import { Badge, Card, Button, Alert } from 'reactstrap'
import  Login from './components/auth/login'
import { useAuth } from './components/auth/auth';


export default function Tasks() {
 
  const { user } = useAuth();
  const todoAPI = 'https://deltav-todo.azurewebsites.net/api/v1/Todos';
  

  // const[tasks,setTasks] = useState([
  //   {task:"Do Stuff", who:"Bob", difficulty: 1, status:true},
  //   {task:"Do More Stuff", who:"Bob", difficulty: 1, status:true},
  //   {task:"Do Even More Stuff", who:"Bob", difficulty: 1, status:true},
  //   {task:"Do Even More More Stuff", who:"Bob", difficulty: 1, status:false}
  // ])

  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    async function getToDos() {
      const result = await fetch(`${todoAPI}`);
      const resultBody = await result.json();
  
      return setTasks(resultBody);
    }
    getToDos();
  },[]);

  async function removeTask(index) {
    let selectedTask = tasks[index];
    setTasks(tasks.filter((task,idx) => idx !== index));

    await fetch(`${todoAPI}/${selectedTask.id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
  } 

  async function updateTask(index) {
    let selectedTask = tasks[index];
    setTasks(completionStatus(index));

    await fetch(`${todoAPI}/${selectedTask.id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedTask)
    });
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
        arr[index].completed = !arr[index].completed
      }
    }
    return arr
  }
  function countTasks(){
    let count = 0;
    tasks.forEach(element => {
      if(element.completed === false) {
        count = count + 1;
        return count
      }
      return count;
    });
    return count;
  }
  async function addTask(newTask) {
    setTasks([newTask, ...tasks]);
    const response = await fetch(`${todoAPI}`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${user.token}`,'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    });
    console.log(JSON.stringify(newTask));
    console.log(response);
  }
  function TaskCard(task,idx) {
    if(!user) {
      return (
        <Alert color={task.completed === true? "success" : "danger"} key={idx}className={taskStatus(task.completed)}>
          <Badge color={task.completed === true? "success" : "danger"} pill>{task.completed === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.title}</h3>
        </Alert>
      )
    }
    if(user.permissions.includes("delete")) {
      return (
        <Card>
          <Alert onClick={() => updateTask(idx)} color={task.completed === true? "success" : "danger"} key={idx}className={taskStatus(task.completed)}>
          <Badge color={task.completed === true? "success" : "danger"} pill>{task.completed === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.title}</h3>
          </Alert>
          <Button onClick={() => removeTask(idx)}>Delete</Button>
      </Card>
        
      )
    }
    else {
      return (
        <Alert onClick={() => updateTask(idx)} color={task.completed === true? "success" : "danger"} key={idx}className={taskStatus(task.completed)}>
          <Badge color={task.completed === true? "success" : "danger"} pill>{task.completed === true? "Complete" : "Incomplete"}</Badge>
          <br></br>
          <h3>Task: {task.title}</h3>
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
    const { title } = e.target;
    const { assignedTo } = e.target;
    const { difficulty } = e.target;
    


    const newTask = {
      title: title.value,
      difficulty: parseInt(difficulty.value),
      assignedTo: assignedTo.value,
      completed: false,
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
        <input name="title" placeholder="Item Details"></input>
        <br />
        <label>Assigned To</label>
        <br />
        <input name="assignedTo" placeholder="Assignee Name"></input>
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







