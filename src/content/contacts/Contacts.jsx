import React, { useEffect, useState } from 'react';

import moment from 'moment';
import Icon from '@components/Icon';
import { useRouter } from 'next/router';
import { paginate } from '@lib/paginate';
import Pagination from '@components/Pagination';
import routerService from '@services/router.service';
import { useDispatch, useSelector } from "react-redux";
import segmentsService from '@services/segments.service';
import contactsService from '@services/contacts.service';
import SkeletonLoading from '@components/SkeletonLoading';
import ConfirmationModal from '@components/modals/ConfirmationModal';
import { selectContactsState, removeContact } from "@store/contactsSlice";
import { selectSegmentsState, selectCurrentSegment, setCurrentSegment, removeSegment } from "@store/segmentsSlice";

function Contacts({
    loadingContacts,
    currentPage,
    pageSize,
    onPageChange
}) {
    const dispatch = useDispatch();

    const router = useRouter();
    const { view, segment } = router.query;

    const contactsList = useSelector(selectContactsState);
    const segmentsList = useSelector(selectSegmentsState);
    const currentSegment = useSelector(selectCurrentSegment);

    const [paginatedData, setPaginatedData] = useState([])
    const [filteredContacts, setFilteredContacts] = useState(contactsList)
    const [isFocusedContactId, setIsFocusedContactId] = useState(null)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState('');
    const [currentContact, setCurrentContact] = useState(null)

    useEffect(() => {
        let _segment = segmentsList.find(seg => seg.name === segment) || null;
        dispatch(setCurrentSegment(_segment));
    }, [router])

    useEffect(() => {
        const paginatedContacts = paginate(filteredContacts, currentPage, pageSize);
        setPaginatedData(paginatedContacts)
    }, [filteredContacts, currentPage, pageSize])

    const handleDeleteSegment = () => {
        setConfirmDeleteModal('segment_delete')
    }

    const closeModal = () => {
        setConfirmDeleteModal('')
        setCurrentContact(null)
    }

    const confirmDelete = (payload) => {
        if (payload == 'segment') {

            if (!currentSegment) {
                alert('Error in deciding which segment to delete. Please refresh your page')
            } else {
                segmentsService.deleteSegment(currentSegment.id, (err, res) => {
                    if (res) {
                        dispatch(removeSegment(currentSegment));
                        setConfirmDeleteModal('')
                    }
                })
            }
        } else if (payload == 'contact') {
            if (!currentContact) {
                alert('Error in deciding which contact to delete. Please refresh your page')
            } else {
                contactsService.deleteContact(currentContact.id, (err, res) => {
                    if (res) {
                        dispatch(removeContact(currentContact));
                        setConfirmDeleteModal('')
                        setCurrentContact(null)
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (currentSegment) {
            routerService.updateUrlParam(router, 'segment', currentSegment.name)
        }

    }, [currentSegment])

    const handleDeleteContact = (contact) => {
        setCurrentContact(contact)
        setConfirmDeleteModal('contact_delete')
    }

    const contactsEmptyFilters = {

    }
    const [contactsFilters, setContactsFilters] = useState(contactsEmptyFilters)

    const resetContactsFilters = () => setContactsFilters(contactsEmptyFilters)

    const handleFilterChange = (e, filter_type) => {
        switch (filter_type) {
            case 'filter_by_name':
                setContactsFilters({ ...contactsFilters, email: e.target.value })
                setContactsFilters({ ...contactsFilters, name: e.target.value })
                break;
            case 'filter_by_location':
                setContactsFilters({ ...contactsFilters, location: e.target.value })
                break;
            case 'filter_by_job':
                setContactsFilters({ ...contactsFilters, job_title: e.target.value })
                break;
            case 'filter_by_biography':
                setContactsFilters({ ...contactsFilters, biography: e.target.value })
                break;
           
            default:
                break;
        }
    }

    useEffect(() => {
        let filteredResults = [...contactsList];
        
        if(contactsFilters?.name) filteredResults = filteredResults.filter(c => c.name.toLowerCase().includes(contactsFilters?.name))
        if(contactsFilters?.email) filteredResults = filteredResults.filter(c => c.email.toLowerCase().includes(contactsFilters?.email))
        if(contactsFilters?.location) filteredResults = filteredResults.filter(c => c.location.toLowerCase().includes(contactsFilters?.location))
        if(contactsFilters?.job_title) filteredResults = filteredResults.filter(c => c.job_title.toLowerCase().includes(contactsFilters?.job_title))
        if(contactsFilters?.biography) filteredResults = filteredResults.filter(c => c.biography.toLowerCase().includes(contactsFilters?.biography))

        setFilteredContacts(filteredResults)

    }, [contactsFilters, contactsList])

    return (
        <>
            <div className='d-flex align-items-center space-between mt-3'>

                {confirmDeleteModal == 'segment_delete' &&
                    <ConfirmationModal
                        close={closeModal}
                        confirmAction={(e) => confirmDelete('segment')}
                        title='Are you sure you want to delete this segment?'
                        description='Once deleted, a segment cannot be recovered, so be careful.'
                    />
                }

                {confirmDeleteModal == 'contact_delete' &&
                    <ConfirmationModal
                        close={closeModal}
                        confirmAction={(e) => confirmDelete('contact')}
                        title='Are you sure you want to delete this contact?'
                        description='Once deleted, a contact cannot be recovered, so be careful with this action.'
                    />
                }
                <div style={{ display: 'block' }}>
                    <div className="d-flex align-items-center">
                        <h2>{!currentSegment ? 'All contacts' : 'Segment - ' + currentSegment?.name}</h2>
                        {currentSegment && <div style={{ marginLeft: '20px', transform: 'scale(1.2)', cursor: 'pointer' }} onClick={handleDeleteSegment}>
                            <Icon icon='trash' />
                        </div>}
                    </div>
                    {currentSegment && <span className='muted-text'>{currentSegment.description}</span>}
                </div>
                <div className="right-wrapper">
                    <div className='d-flex align-items-center column-gap-2'>
                        <div className='btn-outline'>PDF</div>
                        <div className='btn-outline d-flex align-items-center'>
                            <svg viewBox="0 0 24 24" width='18' height='18' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 19V12M12 12L9.75 14.3333M12 12L14.25 14.3333M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333" stroke="#111" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg>
                            <span>CSV</span>
                        </div>
                    </div>
                    {currentSegment && <div className="date">{moment(currentSegment?.createdAt).format('MM-DD-YYYY')}</div>}
                </div>
            </div>

            {currentSegment &&
                <div className='segment-data'>
                    <div className='mt-3'>
                        <span className='section-title'>Industry: </span>
                        {currentSegment?.industry?.split(',').map(i => <span className='pill ml-2 mr-2'>{i || '-'}</span>)}
                    </div>

                    <div className='mt-3'>
                        <span className='section-title'>Interests: </span>
                        {currentSegment?.interests && currentSegment?.interests[0] && currentSegment?.interests[0].split(',')?.map(i => <span className='pill ml-2 mr-2'>{i}</span>)}
                    </div>

                    <div className='mt-3'>
                        <span className='section-title'>Job titles: </span>
                        {currentSegment?.jobTitle?.split(',').map(i => <span className='pill ml-2 mr-2'>{i || '-'}</span>)}
                    </div>

                    <div className='mt-3'>
                        <span className='section-title'>Locations: </span>
                        {currentSegment?.location?.split(',').map(i => <span className='pill ml-2 mr-2'>{i || '-'}</span>)}
                    </div>
                </div>
            }


            {!currentSegment && <div className='top-bar mt-4'>
                <div className='option'>
                    <span>Search by email or name</span>
                    <div>
                        <Icon icon='user' />
                        <input type='text' placeholder='john.doe@gmail.com' onChange={(e) => handleFilterChange(e, 'filter_by_name')}/>
                    </div>
                </div>
                <div className='option'>
                    <span>Search by location</span>
                    <div>
                        <Icon icon='location' />
                        <input type='text' placeholder='United States' onChange={(e) => handleFilterChange(e, 'filter_by_location')}/>
                    </div>
                </div>
                <div className='option'>
                    <span>Search by job</span>
                    <div>
                        <Icon icon='job' />
                        <input type='text' placeholder='Marketing Specialist' onChange={(e) => handleFilterChange(e, 'filter_by_job')}/>
                    </div>
                </div>
                <div className='option'>
                    <span>Search by biography</span>
                    <div>
                        <Icon icon='biography' />
                        <input type='text' placeholder='Digital marketing' onChange={(e) => handleFilterChange(e, 'filter_by_biography')}/>
                    </div>
                </div>
            </div>}

            <div className='muted-text mt-4'>{paginatedData?.length} contacts available</div>
            <div className='table mt-4'>
                <div className='table-row table-header'>
                    <div>Name</div>
                    <div>Job</div>
                    <div>Location</div>
                    <div>Biography</div>
                    <div>Education</div>
                    <div>Links</div>
                    <div>Interests</div>
                </div>

                {!loadingContacts && paginatedData.length == 0 && <div className='no-contacts'>Cannot found any contacts matching this criteria</div>}
                {!loadingContacts && paginatedData.map((contact, idx) => (
                    <div className='table-row' key={idx} onMouseEnter={(e) => setIsFocusedContactId(contact.id)} onMouseLeave={(e) => setIsFocusedContactId(null)}>
                        <div className='stacked'>
                            <div className="d-flex align-items-center space-between" style={{ paddingRight: '15px' }}>
                                <span>{contact.name}</span>
                                <span style={{ display: isFocusedContactId == contact.id ? 'block' : 'none', cursor: 'pointer' }} onClick={(e) => handleDeleteContact(contact)}>
                                    <Icon icon='trash' />
                                </span>
                            </div>
                            <span><svg viewBox="0 0 24 24" width='14px' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#808080" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#808080" stroke-width="2" stroke-linecap="round"></rect> </g></svg>{contact.email}</span>
                        </div>

                        <div className='stacked'>
                            <span>{contact.job_title}</span>
                            <span><svg viewBox="0 0 24 24" width='14px' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#808080"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15" stroke="#808080" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg>{contact.company}</span>
                        </div>
                        <div>{contact.location}</div>
                        <div className='bibliography'>{contact.biography || 'Not available'}</div>
                        <div>{contact.education}</div>
                        <div className='links-wrapper'>
                            {contact.links.split(',').map(l => <span className='link-of-contact' key={l}>{l}</span>)}
                        </div>
                        <div>{contact.interests || '-'}</div>
                    </div>
                ))}
            </div>

            {loadingContacts && pageSize && new Array(pageSize).fill(0).map((_item, index) => <div key={index} className='mt-4 border-radius-2 overflow-hidden'><SkeletonLoading /></div>)}

            <Pagination
                items={contactsList?.length || 0}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    )
}

export default Contacts