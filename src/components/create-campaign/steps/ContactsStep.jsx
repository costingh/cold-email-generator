import Icon from '@components/Icon'
import SkeletonLoading from '@components/SkeletonLoading'
import React from 'react'

function ContactsStep({
    handleSearchForSegment,
    loadingSegments,
    filteredSegments,
    campaignSegments,
    addSegmentToCampaign,
    goToStep
}) {
    
    return (
        <div className='create-campaign-wrapper'>
            <h2>Add contacts to your campaign</h2>
            <p>Contacts that you have imported in the Contacts view, can now be added to this campaign. This action can be later modified accordingly.</p>

            <div className="search-for-segment mt-4 d-flex align-items-center">
                <Icon icon='search' />
                <input type="text" placeholder='Search for a segment' onChange={handleSearchForSegment} />
            </div>
            <span className='muted-text'>{campaignSegments?.length || 0} segment(s) selected</span>

            {loadingSegments &&
                <div className="loading-segments">
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                </div>
            }

            <div className='d-flex segments-tabs-wrapper mb-4'>

                {!loadingSegments && filteredSegments?.length == 0 && <div className='no-results'>No results available</div>}
                {!loadingSegments && filteredSegments.map(segment => <div className={`segment-tab ${campaignSegments.map(c => c.id).includes(segment.id) && 'active'}`}>
                    <div key={segment.id} className="heading">
                        <div className="d-flex align-items-center">
                            <span className='muted-text'>{segment.name} · </span>
                            <span className='muted-text ml-1' style={{ fontSize: '14px', color: '#888', fontWeight: 400 }}>{segment.contacts_count || 0} contacts</span>
                        </div>
                        <div className="check-box" onClick={() => addSegmentToCampaign(segment)}>
                            {campaignSegments.map(c => c.id).includes(segment.id) && <Icon icon='check' />}
                        </div>
                    </div>

                    <div className='body'>
                        <div className='segment-data'>
                            <div className='mt-3 d-flex align-items-center'>
                                <span className='section-title'>Industry: </span>
                                {segment?.industry && <div className='inner-section'>{segment?.industry?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}</div>}
                                {!segment?.industry && <span className='pill ml-2 mr-2' style={{textAlign: 'center'}}>-</span>}
                            </div>

                            <div className='mt-3 d-flex align-items-center'>
                                <span className='section-title'>Interests: </span>
                                <div className='inner-section'>
                                    {segment?.interests && segment?.interests[0] && segment?.interests[0].split(',')?.map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                </div>
                            </div>

                            <div className='mt-3 d-flex align-items-center'>
                                <span className='section-title'>Job titles: </span>
                                {segment?.jobTitle && <div className='inner-section'>
                                    {segment?.jobTitle?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                </div>}
                                {!segment?.jobTitle && <span className='pill ml-2 mr-2' style={{textAlign: 'center'}}>-</span>}
                            </div>

                            <div className='mt-3 d-flex align-items-center'>
                                <span className='section-title'>Locations: </span>
                                {segment?.location && <div className='inner-section'>
                                    {segment?.location?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                </div>}
                                {!segment?.location && <span className='pill ml-2 mr-2' style={{textAlign: 'center'}}>-</span>}
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    {/* <div className="body">{segment.contacts_count || 0} contacts</div> */}
                </div>)}
            </div>

            <div className="d-flex" style={{ columnGap: '15px' }}>
                <div className='btn-outline' onClick={() => goToStep('details')}>Back</div>
                <div className='btn-filled' onClick={() => goToStep('customize')}>Next</div>
            </div>
        </div>
    )
}

export default ContactsStep