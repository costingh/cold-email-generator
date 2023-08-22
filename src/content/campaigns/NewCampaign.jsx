import Icon from '@components/Icon'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import segmentsService from '@services/segments.service';
import useAuth from "/src/hook/auth";
import contactsService from '@services/contacts.service';
import async from 'async'
import SkeletonLoading from '@components/SkeletonLoading';

function NewCampaign() {
    const router = useRouter();
    const [segments, setSegments] = useState([])

    const { user } = useAuth();

    const step = router?.query?.step;

    const cancelCreateCampaign = () => {
        router.push(
            {
                pathname: '/dashboard',
                query: { view: 'campaigns' },
            },
            undefined,
            { shallow: true }
        );
    }

    const goToStep = _step => {
        router.push(
            {
                pathname: '/dashboard',
                query: { view: 'campaigns', create_campaign: true, step: _step },
            },
            undefined,
            { shallow: true }
        );
    }

    const prompts_suggestion = [
        'Personalized subject', 'Personalized compliment', 'Ask for a reply', 'How your business can help', 'What we do'
    ]

    useEffect(() => {
        setLoadingSegments(true)
        if (router?.query?.step == 'contacts') {
            segmentsService.getSegments(user?.email, (error, segments) => {
                setSegments(segments)
                setLoadingSegments(false)

                let _segments = [...segments]

                async.eachLimit(_segments, 5,
                    function (segment, cb) {
                        segmentsService.countContactsFromSegment(segment.id, (error, count) => {
                            segment.contacts_count = count;
                            cb()
                        })
                    },
                    function (err) {
                        setSegments(_segments)
                    }
                )
            })
        }
    }, [router.query])

    const [campaignName, setCampaignName] = useState('')
    const [campaignDescription, setCampaignDescription] = useState('')
    const [campaignSegments, setCampaignSegments] = useState([])
    const [filteredSegments, setFilteredSegments] = useState([])
    const [loadingSegments, setLoadingSegments] = useState(false)
    const [showPromptsSuggestion, setShowPromptsSuggestion] = useState(false)
    const [showCsvVariables, setShowCsvVariables] = useState(false)
    
    useEffect(() => {
        setFilteredSegments(segments)
    }, [segments])

    const addSegmentToCampaign = segment => {
        if (campaignSegments.map(c => c.id).includes(segment.id)) {
            setCampaignSegments(campaignSegments.filter(c => c.id !== segment.id))
        } else {
            setCampaignSegments(prev => [...prev, segment])
        }
    }

    const handleInputChange = (e, field) => {
        if (field == 'campaign_name') setCampaignName(e.target.value)
        if (field == 'campaign_desc') setCampaignDescription(e.target.value)

    }

    const handleSearchForSegment = e => {
        if (!e.target.value) setFilteredSegments(segments)
        setFilteredSegments(segments.filter(s => s.name.includes(e.target.value)))
    }

    return (
        <>
            <div className="navbar-campaigns">
                <div className='btn-outline' onClick={cancelCreateCampaign}>Cancel</div>
                <div className="d-flex align-items-center justify-content-center">
                    <div className={`step ${step == 'details' && 'active'}`} onClick={() => goToStep('details')}>
                        <Icon icon='checked' />
                        <span>1. Details</span>
                    </div>

                    <Icon icon='chevron-right' />

                    <div className={`step ${step == 'contacts' && 'active'}`} onClick={() => goToStep('contacts')}>
                        <Icon icon='layer' />
                        <span>2. Contacts</span>
                    </div>

                    <Icon icon='chevron-right' />

                    <div className={`step ${step == 'customize' && 'active'}`} onClick={() => goToStep('customize')}>
                        <Icon icon='settings' />
                        <span>3. Customize</span>
                    </div>

                    <Icon icon='chevron-right' />

                    <div className={`step ${step == 'overview' && 'active'}`} onClick={() => goToStep('overview')}>
                        <Icon icon='eye' />
                        <span>4. Overview</span>
                    </div>
                </div>

                <div className='btn-filled'>Save</div>

            </div>

            {step == 'details' &&
                <div className='create-campaign-wrapper'>
                    <h2>Enter details about campaign</h2>
                    <p>Create automated email campaigns by assigning segments of contacts for a specific campaign. This action assures that this contacts will receive emails that were set up for this specific campaign.</p>
                    <div className='d-flex' style={{ flexDirection: 'column' }}>
                        <label className='mt-4 mb-2' htmlFor="campaign_name" onChange={(e) => handleInputChange(e, 'campaign_name')}>Campaign Name</label>
                        <input type='text' id='campaign_name' placeholder='Enter a name for this campaign' />
                        <label className='mt-4 mb-2' htmlFor="campaign_desc" onChange={(e) => handleInputChange(e, 'campaign_desc')}>Campaign Description</label>
                        <textarea name="campaign_desc" placeholder='Type a description for this campaign' id="campaign_desc" cols="30" rows="10"></textarea>
                    </div>

                    <div className='btn-filled' onClick={() => goToStep('contacts')}>Next</div>
                </div>
            }


            {step == 'contacts' &&
                <div className='create-campaign-wrapper'>
                    <h2>Add contacts to your campaign</h2>
                    <p>Contacts that you have imported in the Contacts view, can now be added to this campaign. This action can be later modified accordingly.</p>

                    <div className="search-for-segment mt-4 d-flex align-items-center">
                        <Icon icon='search' />
                        <input type="text" placeholder='Search for a segment' onChange={handleSearchForSegment} />
                    </div>
                    <span className='muted-text'>{filteredSegments?.length || 0} segment(s) selected</span>

                    {loadingSegments && <div className="loading-segments">
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
                                        <div className='inner-section'>{segment?.industry?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}</div>
                                    </div>

                                    <div className='mt-3 d-flex align-items-center'>
                                        <span className='section-title'>Interests: </span>
                                        <div className='inner-section'>
                                            {segment?.interests && segment?.interests[0] && segment?.interests[0].split(',')?.map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                        </div>
                                    </div>

                                    <div className='mt-3 d-flex align-items-center'>
                                        <span className='section-title'>Job titles: </span>
                                        <div className='inner-section'>
                                            {segment?.jobTitle?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                        </div>
                                    </div>

                                    <div className='mt-3 d-flex align-items-center'>
                                        <span className='section-title'>Locations: </span>
                                        <div className='inner-section'>
                                            {segment?.location?.split(',').map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                                        </div>
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
            }

            {step == 'customize' &&
                <div className='create-campaign-wrapper'>

                    <div style={{ width: '100%', maxWidth: '900px' }}>
                        <div className='d-flex create-email' style={{ flexDirection: 'column' }}>
                            <label htmlFor="email_subject">Subject</label>
                            <input type="text" placeholder='Type a subject or a prompt to generate it automatically' />
                            <label htmlFor="email_body" className='mt-4'>Email</label>
                            <textarea name="email_body" id="email_body" cols="30" rows="10"></textarea>
                        </div>

                        <div className="d-flex align-items-center space-between actions w-100 mt-3 mb-3">
                            <div className='legend'>
                                <span>{'[[ ]]'} - AI Prompt</span>
                                <span>{'{{ }}'} - Variable</span>
                            </div>

                            <div className='preview-btn d-flex align-items-center'>
                                <Icon icon='eye' />
                                <p>Preview Email</p>
                            </div>

                        </div>

                        {/* ai prompts suggestion */}
                        <div className="prompts-suggestions d-flex align-items-center space-between" onClick={() => setShowPromptsSuggestion(!showPromptsSuggestion)}>
                            <div className="d-flex align-items-center">
                                <Icon icon='stars' />
                                <span className='ml-2'>AI Prompts Suggestions</span>
                            </div>

                            <div className={`show-prompts ${showPromptsSuggestion && 'active'}`}>
                                <Icon icon='chevron-right' />
                            </div>
                        </div>

                        <div className={`prompts-suggestions-wrapper ${showPromptsSuggestion && 'active'}`}>
                            {prompts_suggestion.map(p => <span key={p}>{p}</span>)}
                        </div>

                        {/* CSV variables */}
                        <div className="prompts-suggestions d-flex align-items-center space-between mt-4" onClick={() => setShowCsvVariables(!showCsvVariables)}>
                            <div className="d-flex align-items-center">
                                <Icon icon='stars' />
                                <span className='ml-2'>CSV variables</span>
                            </div>

                            <div className={`show-prompts ${showCsvVariables && 'active'}`}>
                                <Icon icon='chevron-right' />
                            </div>
                        </div>

                        <div className={`prompts-suggestions-wrapper csv-variables ${showCsvVariables && 'active'}`}>
                            {prompts_suggestion.map(p => <span key={p}>{p}</span>)}
                        </div>
                    </div>



                    <div className="d-flex" style={{ columnGap: '15px' }}>
                        <div className='btn-outline' onClick={() => goToStep('contacts')}>Back</div>
                        <div className='btn-filled' onClick={() => goToStep('overview')}>Next</div>
                    </div>
                </div>
            }

            {/* <div className="campaign-editor-panel">
                <div className="start-campaign">
                    <Icon icon='stars' />
                    <span>Campaign starts</span>
                </div>
            </div> */}
        </>
    )
}

export default NewCampaign