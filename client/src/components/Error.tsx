import React from 'react';

export default function Error() {
    const handleClose = () => {
        document.querySelector('.overlay.error')?.setAttribute('hidden', 'true');
    };

    return (
        <div className="overlay error" hidden>
            <div className="modal-custom">
                <div className="modal-header-custom">
                    <h5>Cảnh báo</h5>
                    <i className="fas fa-xmark" onClick={handleClose}></i>
                </div>
                <div className="modal-body-custom">
                    <p>Tên công việc không được phép để trống.</p>
                </div>
                <div className="modal-footer-footer">
                    <button className="btn btn-light" onClick={handleClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}
