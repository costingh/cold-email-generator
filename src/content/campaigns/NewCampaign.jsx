import Icon from '@components/Icon'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import segmentsService from '@services/segments.service';
import useAuth from "/src/hook/auth";
import contactsService from '@services/contacts.service';
import async from 'async'
import SkeletonLoading from '@components/SkeletonLoading';
import EmailFormatter from '@components/EmailFormatter';
import OverviewStep from '@components/create-campaign/steps/OverviewStep';
import DetailsStep from '@components/create-campaign/steps/DetailsStep';
import NavbarProgress from '@components/create-campaign/progress/NavbarProgress';
import ContactsStep from '@components/create-campaign/steps/ContactsStep';
import CustomizeStep from '@components/create-campaign/steps/CustomizeStep';


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

    const [emailSubject, setEmailSubject] = useState('[[ Personalized email subject about increasing productivity ]]')
    // const [emailBody, setEmailBody] = useState('')
    const [emailBody, setEmailBody] = useState(
        `Hello {{first_name}},
            \n[[Opening: Share a personal anecdote about a common struggle in outreach]]
            \n[[Explanation: Highlight Quixly's capabilities]]
            \n[[Call to Action: Invite for a discussion]]
            \nThanks for your time,\nCostin Gheorghe\nCEO,Quixly.ai`
    );

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

    const csv_variables = [
        'Name', 'Email', 'Company', 'Phone Number', 'Job Title', 'Education', 'Interests', 'Social media'
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

    // useEffect(() => {
    //     console.log(campaignSegments)
    // }, [campaignSegments])

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