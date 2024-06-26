import { useDispatch } from 'react-redux';
import { getTask } from '../store/reducers/taskReducer';

export default function NavTabs() {
    const dispatch = useDispatch();

    const handleFilterTasks = (filter: string) => {
        dispatch(getTask({ filter }));
    };

    return (
        <ul className="nav nav-tabs mb-4 pb-2">
            <li className="nav-item" role="presentation">
                <a className="nav-link active" onClick={() => handleFilterTasks('all')}>Tất cả</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link" onClick={() => handleFilterTasks('completed')}>Đã hoàn thành</a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link" onClick={() => handleFilterTasks('incomplete')}>Chưa hoàn thành</a>
            </li>
        </ul>
    );
}

