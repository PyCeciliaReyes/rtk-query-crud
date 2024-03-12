import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../api/apiSlice'

function TasksList(){

    const {data: tasks, isError, isLoading, error} = useGetTasksQuery();
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    if (isLoading) return <div>Loading...</div>;
    else if (isError) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3> Name: {task.name}</h3>
                    <p> Description: {task.description}</p>
                    <button onClick={() => deleteTask(task.id)} >Delete </button>
                    <input 
                    type='checkbox' 
                    id={task.id} 
                    checked={task.completed} 
                    onChange={(e) => {updateTask({
                        ...task,
                        completed: e.target.checked,
                    })}}/>
                    <label htmlFor={task.id}>Completed</label>
                </li>

            ))}
        </ul>
    )
}

export default TasksList;