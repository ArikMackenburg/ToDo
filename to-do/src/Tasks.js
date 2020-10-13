import React from 'react';
import Button from 'react-bootstrap/Button'

export default function Tasks( props ) {
  const { tasks } = props;
  console.log(tasks);
  let count = countTasks(tasks);
  console.log(count);
  
  return (
    <div className="taskDiv">
      <h2>To Do List Manager ({countTasks(tasks)})</h2>
    
      <form>
        <h4>Add To Do Item</h4>
        <label>To Do Item</label>
        <br />
        <input placeholder="Item Details"></input>
        <br />
        <label>Assigned To</label>
        <br />
        <input placeholder="Assignee Name"></input>
        <br />
        <input className="slide" type="range" min="1" max="100"></input>
        <Button>Add Item</Button>
      </form>

      <section>
        <ul>
          {tasks.map((task) =>(
            <li className={taskStatus(task)}>Task: {task.task} Status: {task.complete}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function countTasks(tasks){
  let count = 0;
  tasks.forEach(element => {
    if(element.complete === true) {
      count = count + 1;
      return count
    }
    return count;
  });
  return count;
}

function taskStatus(task) {
  if(task.complete === true) {
    return "taskItem"
  }
  else
    return "incompleteTaskItem"
}

