import Pagination from '@components/Pagination'
import SkeletonLoading from '@components/SkeletonLoading'
import { paginate } from '@lib/paginate';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import moment from 'moment'

import { selectContactsState, setContactsState } from "@store/contactsSlice";
import { useDispatch, useSelector } from "react-redux";

function Contacts({
    loadingContacts,
    items,
    currentPage,
    pageSize,
    onPageChange,
    segments
}) {
    const router = useRouter();
    const { view, segment } = router.query;

    const [paginatedData, setPaginatedData] = useState([])
    const [currentSegment, setCurrentSegment] = useState(null)

    useEffect(() => {
        setCurrentSegment(segments.find(seg => seg.name === segment) || null)
        console.log(segments.find(seg => seg.name === segment))

        
		dispatch(setContactsState([]))
    }, [segment])

    const contactsSlice = useSelector(selectContactsState);
    const dispatch = useDispatch();

    useEffect(() => {
        const paginatedContacts = paginate(contactsSlice, currentPage, pageSize);
        setPaginatedData(paginatedContacts)
    }, [contactsSlice, currentPage, pageSize])

    // useEffect(() => {
    //     const paginatedContacts = paginate(contactsData, currentPage, pageSize);
    //     setPaginatedData(paginatedContacts)
    // }, [contactsData, currentPage, pageSize])

    // dispatch(setContactsState(contacts))

    return (
        <>
            <div className='d-flex align-items-center space-between mt-3'>
                <div style={{ display: 'block' }}>
                    <h2>{!currentSegment ? 'All contacts' : 'Segment - ' + currentSegment.name}</h2>
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
                        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#111"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        <input type='text' placeholder='john.doe@gmail.com' />
                    </div>
                </div>
                <div className='option'>
                    <span>Search by location</span>
                    <div>
                        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#111"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        <input type='text' placeholder='United States' />
                    </div>
                </div>
                <div className='option'>
                    <span>Search by job</span>
                    <div>
                        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#111"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        <input type='text' placeholder='Marketing Specialist' />
                    </div>
                </div>
                <div className='option'>
                    <span>Search by biography</span>
                    <div>
                        <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns" fill="#111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" type="MSPage"> <g id="Icon-Set" type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#111"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        <input type='text' placeholder='Digital marketing' />
                    </div>
                </div>
            </div>}

            <div className='muted-text mt-4'>{paginatedData?.length} contacts available</div>
            <div className='table mt-4'>
                <div className='table-row table-header'>
                    <div>Name</div>
                    <div>Job</div>
                    {/* <div>Social Media</div> */}
                    <div>Location</div>
                    <div>Biography</div>
                    <div>Education</div>
                    <div>Links</div>
                    {/* <div>Interests</div> */}
                </div>

                {!loadingContacts && paginatedData.length == 0 && <div className='no-contacts'>Cannot found any contacts matching this criteria</div>}
                {!loadingContacts && paginatedData.map((customer, idx) => (
                    <div className='table-row' key={idx}>
                        <div className='stacked'>
                            <span>{customer.name}</span>
                            <span><svg viewBox="0 0 24 24" width='14px' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#808080" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#808080" stroke-width="2" stroke-linecap="round"></rect> </g></svg>{customer.email}</span>
                        </div>

                        <div className='stacked'>
                            <span>{customer.job_title}</span>
                            <span><svg viewBox="0 0 24 24" width='14px' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#808080"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H15M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7M9 7H15" stroke="#808080" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"></path> </g></svg>{customer.company}</span>
                        </div>
                        {/* <div>Social Media</div> */}
                        <div>{customer.location}</div>
                        <div className='bibliography'>{customer.biography}</div>
                        <div>{customer.education}</div>
                        <div>Links</div>
                        {/* <div>Interests</div> */}
                    </div>
                ))}
            </div>

            {loadingContacts && pageSize && new Array(pageSize).fill(0).map((_item, index) => <div key={index} className='mt-4 border-radius-2 overflow-hidden'><SkeletonLoading /></div>)}

            <Pagination
                items={items}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    )
}

export default Contacts