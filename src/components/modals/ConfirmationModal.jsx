import React from 'react'

function ConfirmationModal({ close, title, description, confirmAction }) {
    return (
        <>
            <div id="right-sidebar-modal">
            </div>
            <div id="center-sidebar-modal-inner" style={{width: '500px', height: 'auto'}}>
                <div className="d-flex space-between align-items-center heading mb-4">
                    <h1>{title}</h1>
                </div>

                <p style={{textAlign: 'left', color: '#888'}}>{description}</p>

                <div className="divider mb-4 mt-4"></div>
                <div className="d-flex space-between align-items-center">
                    <div className="btn-outline" onClick={close}>Cancel</div>
                    <div className="btn-filled" onClick={confirmAction}>Delete</div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal