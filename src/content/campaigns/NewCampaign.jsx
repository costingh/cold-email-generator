import React, { useEffect, useState } from 'react';

import async from 'async';
import { useRouter } from 'next/router';
import routerService from '@services/router.service';
import segmentsService from '@services/segments.service';
import DetailsStep from '@components/create-campaign/steps/DetailsStep';
import OverviewStep from '@components/create-campaign/steps/OverviewStep';
import ContactsStep from '@components/create-campaign/steps/ContactsStep';
import CustomizeStep from '@components/create-campaign/steps/CustomizeStep';
import NavbarProgress from '@components/create-campaign/progress/NavbarProgress';

import useAuth from "/src/hook/auth";


function NewCampaign() {
    const router = useRouter();
    const { user } = useAuth();
    const [segments, setSegments] = useState([])
    const [campaignName, setCampaignName] = useState('')
    const [campaignDescription, setCampaignDescription] = useState('')
    const [campaignSegments, setCampaignSegments] = useState([])
    const [filteredSegments, setFilteredSegments] = useState([])
    const [loadingSegments, setLoadingSegments] = useState(false)
    const [showPromptsSuggestion, setShowPromptsSuggestion] = useState(false)
    const [showCsvVariables, setShowCsvVariables] = useState(false)
    const [error, setError] = useState('')

    const prompts_suggestion = [
        'Personalized subject', 'Personalized compliment', 'Ask for a reply', 'How your business can help', 'What we do'
    ]

    const csv_variables = [
        'Name', 'Email', 'Company', 'Phone Number', 'Job Title', 'Education', 'Interests', 'Social media'
    ]
    
    const [emailSubject, setEmailSubject] = useState('[[ Personalized email subject about increasing productivity ]]')

    const [emailBody, setEmailBody] = useState(
        `Hello {{first_name}},
            \n[[Opening: Share a personal anecdote about a common struggle in outreach]]
            \n[[Explanation: Highlight Quixly's capabilities]]
            \n[[Call to Action: Invite for a discussion]]
            \nThanks for your time,\nCostin Gheorghe\nCEO,Quixly.ai`
    );

    const step = router?.query?.step;

    const cancelCreateCampaign = () => {
        routerService.navigate(router, '/dashboard', { view: 'campaigns' }, true)
    }

    const goToStep = _step => {
        setError('')
        if (step === 'details' && (_step == 'contacts' || _step == 'customize' || _step == 'overview')) {
            if (!campaignName) {
                setError('Fill in the campaign name')
                return;
            }
            if(!campaignDescription) {
                setError('Fill in the campaign description')
                return;
            }
        } else if (step == 'contacts' && (_step == 'customize' || _step == 'overview')) {
            if (!campaignSegments?.length) {
                setError('Please choose at leas one segment for this campaign')
                return;
            }
        } else if (step == 'customize' && _step == 'overview') {
            if (!emailSubject) {
                setError('Enter a valid email subject')
                return;
            }
            if (!emailBody) {
                setError('Enter a valid email body')
                return;
            }
        }

        routerService.navigate(router, '/dashboard', { view: 'campaigns', create_campaign: true, step: _step }, true)
    }

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

    // encode segments names in the url of a campaign in the new campaign creation view
    // get tehe segments names and search the actual segments with this names
    // create a list with this segments and add it to the campaign
    // this runs when the user refreshes the page, or segments change, or when the user navigates from segments view to new campaign, resulting in creating a campaign with the segments from previous view
    useEffect(() => {
        try {
            if(router?.query?.selected_segments) {
                let segmentsNames = router?.query?.selected_segments.split(',')
                segmentsNames.pop();
                let segmentsToBeSetAsActive = [];
                segmentsNames.map(segment_name_from_url => {
                    segments.map(segment_from_service => {
                        console.log()
                        if(segment_from_service.name == segment_name_from_url) segmentsToBeSetAsActive.push(segment_from_service)
                    })
                })
               
                if(segmentsToBeSetAsActive.length) setCampaignSegments(segmentsToBeSetAsActive)
            }
        } catch(error) {
            console.log(error)
        }
    }, [segments])

    useEffect(() => {
        setFilteredSegments(segments)
    }, [segments])

    const addSegmentsToUrl = (segments) => routerService.updateUrlParam(router, 'selected_segments', segments.map(seg => seg.name + ',' ))


    const addSegmentToCampaign = segment => {
        if (campaignSegments.map(c => c.id).includes(segment.id)) {
            let newSegments = campaignSegments.filter(c => c.id !== segment.id);
            setCampaignSegments(newSegments)
            addSegmentsToUrl(newSegments)
        } else {
            const newSegments = [...campaignSegments, segment];
            setCampaignSegments(newSegments);
            addSegmentsToUrl(newSegments);
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
            {/* PROGRESS NAVBAR => 1.Details, 2. Contacts, 3. Customize, 4. Overview */}
            <NavbarProgress
                cancelCreateCampaign={cancelCreateCampaign}
                goToStep={goToStep}
                step={step}
            />

            {step == 'details' &&
                <DetailsStep
                    handleInputChange={handleInputChange}
                    goToStep={goToStep}
                    campaignName={campaignName}
                    campaignDescription={campaignDescription}
                />
            }
            {step == 'contacts' &&
                <ContactsStep
                    loadingSegments={loadingSegments}
                    campaignSegments={campaignSegments}
                    filteredSegments={filteredSegments}
                    handleSearchForSegment={handleSearchForSegment}
                    addSegmentToCampaign={addSegmentToCampaign}
                    goToStep={goToStep}
                />
            }

            {step == 'customize' &&
                <CustomizeStep
                    setShowPromptsSuggestion={setShowPromptsSuggestion}
                    showPromptsSuggestion={showPromptsSuggestion}
                    prompts_suggestion={prompts_suggestion}
                    csv_variables={csv_variables}
                    showCsvVariables={showCsvVariables}
                    setShowCsvVariables={setShowCsvVariables}
                    goToStep={goToStep}
                    emailSubject={emailSubject}
                    setEmailSubject={setEmailSubject}
                    emailBody={emailBody}
                    setEmailBody={setEmailBody}
                    campaignSegments={campaignSegments}
                />
            }

            {step == 'overview' && <OverviewStep handleInputChange={handleInputChange} goToStep={goToStep} />}
            <div className={`error-msg ${error && 'show'}`}>{error}</div>
        </>
    )
}

export default NewCampaign