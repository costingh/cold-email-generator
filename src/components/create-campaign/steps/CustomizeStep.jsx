import EmailFormatter from '@components/EmailFormatter'
import Icon from '@components/Icon'
import React, { useState } from 'react'
import OpenAI from '@services/openai.service'

function CustomizeStep({
    setShowPromptsSuggestion,
    showPromptsSuggestion,
    prompts_suggestion,
    csv_variables,
    showCsvVariables,
    setShowCsvVariables,
    goToStep,
    emailSubject,
    setEmailSubject,
    emailBody,
    setEmailBody,
}) {

    const handlePreviewEmail = async () => {
        let prompt = 'I want to generate a cold email for a user. The template is like this: {{x}} - is a csv variable that i will replace, so leave it untouched. [[y]] represents a prompt for you that you should replace. Create me the mail starting with this template, and make it short: ' + emailBody;
        OpenAI.generateAnswer(prompt, (error, cold_email) => {
            console.log(error)
            console.log(cold_email)
        })
    }

    return (
        <div className='create-campaign-wrapper'>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h2 className='mb-2'>Customize email</h2>
                <p style={{ maxWidth: '100%' }} className='mb-4'>Create a custom email for each contact using AI. If that's not what you wish, you can just send the same email to all of them.</p>
                <div className="d-flex w-100" style={{ columnGap: '30px', padding: '0 30px' }}>
                    <div style={{ width: '55%' }}>
                        <div className='d-flex create-email' style={{ flexDirection: 'column' }}>
                            <label htmlFor="email_subject">Subject</label>
                            <input type="text" placeholder='Type a subject or a prompt to generate it automatically' value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
                            <label htmlFor="email_body" className='mt-4'>Email</label>
                            {/* <textarea  name="email_body" id="email_body" cols="30" rows="11" value={emailBody} onChange={(e) => handleEmailTextareaChange(e)}></textarea> */}

                            <EmailFormatter
                                emailBody={emailBody}
                                setEmailBody={setEmailBody}
                            />
                        </div>

                        <div className="d-flex align-items-center space-between actions w-100 mt-3 mb-3">
                            <div className='legend'>
                                <span>{'[[ ]]'} - AI Prompt</span>
                                <span>{'{{ }}'} - Variable</span>
                            </div>

                            <div className="d-flex align-items-center" style={{ columnGap: '20px' }}>
                                <div className='btn-outline'>18 emails</div>
                                <div className='preview-btn d-flex align-items-center'>
                                    <Icon icon='eye' />
                                    <p onClick={handlePreviewEmail}>Preview Email</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={{ width: '45%', paddingTop: '30px' }}>

                        <div className="alert-container" style={{ marginBottom: '40px' }}>
                            <div>
                                <Icon icon='robot' />
                            </div>
                            <p>We use AI to generate content based on your prompts. </p>
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
                            {csv_variables.map(p => <span key={p}>{p}</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex" style={{ columnGap: '15px' }}>
                <div className='btn-outline' onClick={() => goToStep('contacts')}>Back</div>
                <div className='btn-filled' onClick={() => goToStep('overview')}>Next</div>
            </div>
        </div>
    )
}

export default CustomizeStep