import React from 'react'

function OverviewStep({handleInputChange, goToStep}) {
    return (
        <div className='create-campaign-wrapper'>
            <h2>This is how your campaign looks like</h2>
            <p>Create automated email campaigns by assigning segments of contacts for a specific campaign. This action assures that this contacts will receive emails that were set up for this specific campaign.</p>
            <div className='d-flex' style={{ flexDirection: 'column' }}>
                <label className='mt-4 mb-2' htmlFor="campaign_name" onChange={(e) => handleInputChange(e, 'campaign_name')}>Campaign Name</label>
                <input type='text' id='campaign_name' placeholder='Enter a name for this campaign' />
                <label className='mt-4 mb-2' htmlFor="campaign_desc" onChange={(e) => handleInputChange(e, 'campaign_desc')}>Campaign Description</label>
                <textarea name="campaign_desc" placeholder='Type a description for this campaign' id="campaign_desc" cols="30" rows="10"></textarea>
            </div>

            <div className='btn-outline' onClick={() => goToStep('customize')}>Back</div>
        </div>
    )
}

export default OverviewStep