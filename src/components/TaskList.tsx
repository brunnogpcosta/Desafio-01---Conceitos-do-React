import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}


export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [counter, setCounter] = useState(1)
  const [chaged, setChanged] = useState(false)



  useEffect(() => {
    setTasks(tasks)
    setChanged(false)
  }, [chaged]);


  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    const myTask = {
      id: counter,
      title: newTaskTitle,
      isComplete: false
    }

    if (myTask.title !== "") {
      setCounter(counter + 1)
      //console.log("Task: ", myTask)
      setTasks([...tasks, myTask])
    }
  }


  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter((item) => item.id !== id);
    //console.log(newList)
    setTasks(newTaskList)

  }


  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    const selectTask = tasks.find((el) => el.id == id)
    selectTask!.isComplete = selectTask?.isComplete ? false : true
    setChanged(true)
    //console.log(tasks)

  }





  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}