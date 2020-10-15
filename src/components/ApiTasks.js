import React, { useContext, useState } from 'react';


const usersAPI = 'https://deltav-todo.azurewebsites.net/api/v1/Todos';

export const TaskContext = React.createContext();

export function useList() {
  const taskContext = useContext(TaskContext);
  if (!taskContext) throw new Error('You are missing TaskProvider!');
  return taskContext;
}

export function TaskProvider(props) {
  const [state, setState] = useState({
    tasks: null,

    
  })
  async function getTasks(props){
  

    const result = await fetch(`${usersAPI}`, {
      method:'get',
    });
    const resultBody = await result.json();
    
    if(result.ok) {
      return setTasks(resultBody);
    }
  
    
  }
  function setTasks(tasks) {
    setState(prevState => ({
      ...prevState,
      tasks,
    }));
  } 
  return (
    <TaskContext.Provider value={state}>
      {props.children}
    </TaskContext.Provider>
  )
}





