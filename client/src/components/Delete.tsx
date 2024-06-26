interface DeleteProps {
    handleDeleteTask: () => void;
    handleCancelDelete: () => void;
}

export default function Delete({ handleDeleteTask, handleCancelDelete }: DeleteProps) {
    return (
        <div className="overlay delete" hidden>
            <div className="modal-custom">
                <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i className="fas fa-xmark" onClick={handleCancelDelete}></i>
                </div>
                <div className="modal-body-custom">
                    <p>Bạn chắc chắn muốn xóa công việc này?</p>
                </div>
                <div className="modal-footer-footer">
                    <button className="btn btn-light" onClick={handleCancelDelete}>Hủy</button>
                    <button className="btn btn-danger" onClick={handleDeleteTask}>Xóa</button>
                </div>
            </div>
        </div>
    );
}
