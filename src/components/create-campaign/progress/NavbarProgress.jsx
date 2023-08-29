import Icon from '@components/Icon'
import React from 'react'

function NavbarProgress({ cancelCreateCampaign, goToStep, step }) {
    return (
        <div className="navbar-campaigns">
            <div className='btn-outline' onClick={cancelCreateCampaign}>Cancel</div>
            <div className="d-flex align-items-center justify-content-center">
                <div className={`step ${step == 'details' && 'active'}`} onClick={() => goToStep('details')}>
                    <Icon icon='checked' />
                    <span>1. Details</span>
                </div>

                <div className="next-icon">
                    <Icon icon='chevron-right' />
                </div>

                <div className={`step ${step == 'contacts' && 'active'}`} onClick={() => goToStep('contacts')}>
                    <Icon icon='layer' />
                    <span>2. Contacts</span>
                </div>

                <div className="next-icon">
                    <Icon icon='chevron-right' />
                </div>

                <div className={`step ${step == 'customize' && 'active'}`} onClick={() => goToStep('customize')}>
                    <Icon icon='settings' />
                    <span>3. Customize</span>
                </div>

                <div className="next-icon">
                    <Icon icon='chevron-right' />
                </div>

                <div className={`step ${step == 'overview' && 'active'}`} onClick={() => goToStep('overview')}>
                    <Icon icon='eye' />
                    <span>4. Overview</span>
                </div>
            </div>

            <div className='btn-filled'>Save</div>
        </div>
    )
}

export default NavbarProgress