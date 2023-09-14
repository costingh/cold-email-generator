import CSVReader from '@components/CSVReader';
import { importContactsFromCSV } from '@lib/importContacts';
import React, { useEffect, useState } from 'react'
import useAuth from "/src/hook/auth";
import Icon from '@components/Icon';

function ImportContact({
    closeModal,
    handleChange,
    addingContact,
    addContact,
    handleSaveContacts,
    importingContacts,
    contactsImported
}) {
    const { user } = useAuth();
    const [activeTab, setActivetab] = useState('manual_import')
    const handleChangetab = tab => setActivetab(tab)
    const isActive = tab => activeTab === tab;
    const [importedContacts, setImportedContacts] = useState([]);
    const [processedContacts, setProcessedContacts] = useState([]);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        if (importedContacts && importedContacts.data) {
            const contacts_list = importedContacts.data;
            const headerRow = contacts_list[0];
            const contactDataRows = contacts_list.slice(1);

            let contacts = contactDataRows.map(contactRow => {
                const contact = {
                    email: '',
                    name: '',
                    phoneNumber: '',
                    company: '',
                    job_title: '',
                    user_email: user?.email,
                    // segments: [],
                    links: '',
                    interests: '',
                    social_media: '',
                    biography: '',
                    education: '',
                    location: ''
                };

                contactRow.forEach((value, index) => {
                    const headerValue = headerRow[index]?.toLowerCase(); // Convert header to lowercase for case-insensitive matching

                    if (headerValue) {
                        if (headerValue.includes('email')) {
                            contact.email = value;
                        } else if (headerValue.includes('name')) {
                            contact.name = value;
                        } else if (headerValue.includes('phone')) {
                            contact.phoneNumber = value;
                        } else if (headerValue.includes('company')) {
                            contact.company = value;
                        } else if (headerValue.includes('position' || 'job_title')) {
                            contact.job_title = value;
                        } else if (headerValue.includes('biography')) {
                            contact.biography = value;
                        } else if (headerValue.includes('education')) {
                            contact.education = value;
                        } else if (headerValue.includes('location')) {
                            contact.location = value;
                        } else if (headerValue.includes('links')) {
                            contact.links = value;
                        } else if (headerValue.includes('interests')) {
                            contact.interests = value;
                        } else if (headerValue.includes('social' || 'social_media')) {
                            contact.social_media = value;
                        }
                    }
                });
                return contact;
            });

            let last_element = contacts[contacts.length] ? contacts[contacts.length] : contacts[contacts.length - 1];
            if (!last_element.email && !last_element.name && !last_element.phoneNumber && !last_element.company && !last_element.job_title) contacts.pop()
            setProcessedContacts(contacts)
        }
    }, [importedContacts])
    
    return (
        <>
            <div id="right-sidebar-modal">
            </div>
            <div id="right-sidebar-modal-inner">

                <div style={{ height: '30%' }}>
                    <div className="d-flex space-between align-items-center heading" style={{ height: '40%' }}>
                        <div>
                            <h1>Create or import contacts</h1>
                            <p>Fill in required contact info for creating a contact or choose a csv file to bulk import contacts from it</p>
                        </div>
                        <svg onClick={closeModal} viewBox="0 0 24 24" width='25' style={{ cursor: 'pointer' }} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96967C9.73741 8.67678 9.26253 8.67678 8.96964 8.96967C8.67675 9.26256 8.67675 9.73744 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2626 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9697L13.0606 12L15.0303 10.0303C15.3232 9.73746 15.3232 9.26258 15.0303 8.96969C14.7374 8.6768 14.2625 8.6768 13.9696 8.96969L12 10.9394L10.0303 8.96967Z" fill="#ccccccd7"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#ccccccd7"></path> </g></svg>
                    </div>

                    <div className="alert-container mb-4">
                        <div>
                            <Icon icon='alert' />
                        </div>
                        <p>Some fields are not required for importing a contact. You can save a contact with missing values for some fields, but there are a few required data that you always need to fill in</p>
                    </div>

                    <div className="tab-wrapper">
                        <div className="switch-tab">
                            <div className={`tab ${isActive('manual_import') && 'active'}`} onClick={() => handleChangetab('manual_import')}>
                                Manual import
                            </div>
                            <div className={`tab ${isActive('csv_import') && 'active'}`} onClick={() => handleChangetab('csv_import')}>
                                CSV import
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'manual_import' && <div className="modal-content manual_import" style={{ height: '60%', overflowY: 'auto', paddingTop: '20px' }}>
                    <div className="d-flex">
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" onChange={(e) => handleChange(e, 'email')} required /><br />
                        </div>
                        <div>
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" onChange={(e) => handleChange(e, 'name')} required /><br />
                        </div>
                    </div>

                    <div className="d-flex">
                        <div>
                            <label for="phoneNumber">Phone Number:</label>
                            <input type="tel" id="phoneNumber" onChange={(e) => handleChange(e, 'phoneNumber')} name="phoneNumber" /><br />
                        </div>
                        <div>
                            <label for="company">Company:</label>
                            <input type="text" id="company" onChange={(e) => handleChange(e, 'company')} name="company" /><br />
                        </div>
                    </div>

                    <div className="d-flex">
                        <div>
                            <label for="job_title">Job Title:</label>
                            <input type="text" id="job_title" onChange={(e) => handleChange(e, 'job_title')} name="job_title" /><br />
                        </div>
                        <div>
                            <label for="location">Location:</label>
                            <input type="text" id="location" onChange={(e) => handleChange(e, 'location')} name="location" /><br />
                        </div>
                    </div>

                    <div className="d-flex">
                        <div>
                            <label for="education">Education:</label>
                            <input type="text" id="education" onChange={(e) => handleChange(e, 'education')} name="education" /><br />
                        </div>
                        <div>
                            <label for="biography">Biography:</label>
                            <input type="text" id="biography" onChange={(e) => handleChange(e, 'biography')} name="biography" /><br />
                        </div>
                    </div>
                </div>}

                {activeTab === 'csv_import' && <div className="modal-content" style={{ height: '60%', overflowY: 'auto', paddingTop: '20px' }}>
                    <div style={{ paddingTop: '40px' }}>
                        <CSVReader setImportedContacts={setImportedContacts} />
                        {processedContacts?.length ?
                            <div className='csv-import-contacts'>
                                <p>{processedContacts?.length} contacts are ready to be imported</p>
                                <div className="d-flex" style={{ columnGap: '10px' }}>
                                    <div className="btn-outline" onClick={() => setPreview(true)}><Icon icon='eye' /> See preview</div>
                                    <div className="btn-filled" onClick={() => handleSaveContacts(processedContacts)}><Icon icon='save' /> Save contacts now</div>
                                </div>
                            </div> : <></>
                        }
                        {importingContacts && <span style={{ fontSize: '14px', fontWeight: '600', color: '#111', marginBottom: '10px', textAlign: 'center', margin: '20px auto' }}>Importing data...</span>}
                        {preview && processedContacts && !contactsImported && <>
                            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111', marginBottom: '10px' }}>Short preview</p>

                            {processedContacts.map((pc, idx) =>
                                <div className='preview-contacts' key={pc.email}>{idx + 1}. {pc.name} - {pc.email}</div>
                            )}
                        </>}
                    </div>
                </div>}

                <div style={{ height: '5%' }}>
                    <div className="divider mb-4 mt-4"></div>

                    <div className="d-flex space-between align-items-center">
                        <div className="btn-outline" onClick={closeModal}>Cancel</div>
                        <button className="btn-filled" style={{ minWidth: '107px', minHeight: '31.5px' }} onClick={addContact}>
                            {!addingContact ? <>Add Contact</> : <>
                                <svg className="rotating-element-animation" viewBox="0 0 24 24" height='14' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#fff" stroke-width="3.55556" stroke-linecap="round"></path> </g></svg>
                            </>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImportContact