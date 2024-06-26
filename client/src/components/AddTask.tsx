import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/reducers/taskReducer";
import { Task } from "../interface/interface";

interface AddTaskProps {
    taskToEdit: Task | null;
    clearEditTask: () => void;
    setError: (message: string) => void;
}

export default function AddTask({ taskToEdit, clearEditTask, setError }: AddTaskProps) {
    const dispatch = useDispatch();
    const [nameTask, setNameTask] = useState("");
    const [task, setTask] = useState<Task>({
        id: 0,
        name: "",
        completed: false,
    });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (taskToEdit) {
            setNameTask(taskToEdit.name);
            setTask(taskToEdit);
            inputRef.current?.focus();
        }
    }, [taskToEdit]);

    const handleAddOrUpdateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameTask.trim()) {
            setError("Tên công việc không được phép để trống.");
            return;
        }
        if (taskToEdit) {
            dispatch(updateTask({ ...task, name: nameTask }));
            clearEditTask();
        } else {
            dispatch(addTask({ ...task, id: Date.now(), name: nameTask }));
        }
        setNameTask("");
        setError(""); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameTask(e.target.value);
    };

    return (
        <form onSubmit={handleAddOrUpdateTask} className="d-flex justify-content-center align-items-center mb-4">
            <div className="form-outline flex-fill">
                <input
                    ref={inputRef}
                    onChange={handleChange}
                    value={nameTask}
                    type="text"
                    id="form2"
                    className="form-control"
                />
                <label className="form-label" htmlFor="form2">Nhập tên công việc</label>
            </div>
            <button type="submit" className="btn btn-info ms-2">{taskToEdit ? "Sửa" : "Thêm"}</button>
        </form>
    );
}
