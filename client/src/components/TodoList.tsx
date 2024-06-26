import { useEffect, useState } from 'react';
import AddTask from './AddTask';
import NavTabs from './NavTabs';
import Delete from './Delete';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../interface/interface';
import { getTask, updateTask, deleteTask } from '../store/reducers/taskReducer';

export default function TodoList() {
    const tasks = useSelector((state: { task: Task[] }) => state.task);
    const dispatch = useDispatch();
    const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        dispatch(getTask());
    }, [dispatch]);

    const handleToggleComplete = (task: Task) => {
        dispatch(updateTask({ ...task, completed: !task.completed }));
    };

    const confirmDeleteTask = (id: number) => {
        setTaskIdToDelete(id);
        document.querySelector('.overlay.delete')?.removeAttribute('hidden');
    };

    const handleDeleteTask = () => {
        if (taskIdToDelete !== null) {
            dispatch(deleteTask(taskIdToDelete));
            setTaskIdToDelete(null);
            document.querySelector('.overlay.delete')?.setAttribute('hidden', 'true');
        }
    };

    const handleCancelDelete = () => {
        setTaskIdToDelete(null);
        document.querySelector('.overlay.delete')?.setAttribute('hidden', 'true');
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
    };

    const clearEditTask = () => {
        setTaskToEdit(null);
    };

    return (
        <div className='custom-background'>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card">
                            <div className="card-body p-5">
                                <AddTask taskToEdit={taskToEdit} clearEditTask={clearEditTask} setError={setError} />
                                <NavTabs />
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active">
                                        <ul className="list-group mb-0">
                                            {
                                                tasks.map((task) => (
                                                    <li key={task.id} className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded" style={{ backgroundColor: '#f4f6f7' }}>
                                                        <div>
                                                            <input
                                                                className="form-check-input me-2"
                                                                type="checkbox"
                                                                checked={task.completed}
                                                                onChange={() => handleToggleComplete(task)}
                                                            />
                                                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                                                {task.name}
                                                            </span>
                                                        </div>
                                                        <div className="d-flex gap-3">
                                                            <i className="fas fa-pen-to-square text-warning" onClick={() => handleEditTask(task)}></i>
                                                            <i className="far fa-trash-can text-danger" onClick={() => confirmDeleteTask(task.id)}></i>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <Delete handleDeleteTask={handleDeleteTask} handleCancelDelete={handleCancelDelete} />
                                <Error message={error} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
