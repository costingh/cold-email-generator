import React, { useState } from "react";
import { useRouter } from 'next/router';
import CustomersSidebar from '../layout/customers/CustomersSidebar'
import CampaignsSidebar from '../layout/campaigns/CampaignsSidebar'
import ConversationsSidebar from '../layout/conversations/ConversationsSidebar'
import useAuth from "/src/hook/auth";
import ContactsService from "@services/contacts.service";
import ImportContact from "./modals/ImportContact";
import CreateSegment from "./modals/CreateSegment";
import segmentsService from "@services/segments.service";

function Sidebar({
	contactsData,
	setContactsData,
	addNewContact,
	addNewSegment,
	segments,
	isCreateCustomerModalOpened,
	isCreateSegmentModalOpened,
	setIsCreateCustomerModalOpened,
	setIsCreateSegmentModalOpened,
	handleSaveContacts,
	importingContacts,
	contactsImported,
	activeCampaigns,
	draftCampaigns
}) {
	const router = useRouter();
	const { user } = useAuth();

	const [addingContact, setAddingContact] = useState(false)
	const [creatingSegment, setCreatingSegment] = useState(false)

	const [message, setMessage] = useState({
		success: '',
		error: ''
	})

	const navigateTo = route => {
		router.push(
			{
				pathname: '/dashboard',
				query: { view: route },
			},
			undefined,
			{ shallow: true }
		);
	}

	const handleOpenCreateContactModal = () => {
		setIsCreateCustomerModalOpened(true)
		let bodyEl = document.querySelector('body');
		if (bodyEl) bodyEl.style.overflow = 'hidden'
	}

	const handleOpenCreateSegmentModal = () => {
		setIsCreateSegmentModalOpened(true)
		let bodyEl = document.querySelector('body');
		if (bodyEl) bodyEl.style.overflow = 'hidden'
	}


	const [newContactData, setNewContactData] = useState({
		email: '',
		name: '',
		phoneNumber: '',
		company: '',
		job_title: '',
		location: '',
		education: '',
		biography: '',
		links: [],
		interests: [],
		social_media: [],
		// segments: [],
		user_email: user?.email
	})

	const [segmentData, setSegmentData] = useState({
		name: '',
		description: '',
		industry: '',
		location: '',
		jobTitle: '',
		interests: [],
		user_email: user?.email
	});

	const handleChange = (e, type) => {
		switch (type) {


			//////////////////////////////
			// 		CREATE CONTACT		//
			//////////////////////////////
			case 'email':
				setNewContactData({ ...newContactData, email: e.target.value })
				break;
			case 'name':
				setNewContactData({ ...newContactData, name: e.target.value })
				break;
			case 'phoneNumber':
				setNewContactData({ ...newContactData, phoneNumber: e.target.value })
				break;
			case 'company':
				setNewContactData({ ...newContactData, company: e.target.value })
				break;
			case 'job_title':
				setNewContactData({ ...newContactData, job_title: e.target.value })
				break;
			case 'location':
				setNewContactData({ ...newContactData, location: e.target.value })
				break;
			case 'education':
				setNewContactData({ ...newContactData, education: e.target.value })
				break;
			case 'biography':
				setNewContactData({ ...newContactData, biography: e.target.value })
				break;

			//////////////////////////////
			// 		CREATE SEGMENT		//
			//////////////////////////////
			case 'segment_name':
				setSegmentData({ ...segmentData, name: e.target.value })
				break;
			case 'segment_description':
				setSegmentData({ ...segmentData, description: e.target.value })
				break;
			case 'segment_criteria_industry':
				setSegmentData({ ...segmentData, industry: e.target.value })
				break;
			case 'segment_criteria_location':
				setSegmentData({ ...segmentData, location: e.target.value })
				break;
			case 'segment_criteria_jobtitle':
				setSegmentData({ ...segmentData, jobTitle: e.target.value })
				break;
			case 'segment_criteria_interests':
				setSegmentData({ ...segmentData, interests: [e.target.value] })
				break;


			default:
				break;
		}

	}

	const createSegment = () => {
		setCreatingSegment(true)
		segmentsService.createSegment(segmentData, (error, res) => {
			console.log(res)
			console.log(error)

			if (error || res?.error) {
				setCreatingSegment(false)
				setMessage({
					error: 'Could not add this conctact',
					success: ''
				})
			}
			if (res?.response) {
				addNewSegment(res?.response)
				resetFormData()
				setCreatingSegment(false)
				setMessage({
					error: '',
					success: 'Contact added successfully'
				})
			}
		})
	}

	const addContact = () => {
		console.log('aici')
		setAddingContact(true)
		console.log(newContactData)
		ContactsService.createContact(newContactData, (error, res) => {
			console.log(err || res)
			if (error || res?.error) {
				setAddingContact(false)
				setMessage({
					error: 'Could not add this conctact',
					success: ''
				})
			}
			if (res?.response) {
				addNewContact(res?.response)
				resetFormData()
				setAddingContact(false)
				setMessage({
					error: '',
					success: 'Contact added successfully'
				})
			}
		})
	}

	const closeModal = () => {
		setIsCreateCustomerModalOpened(false)
		setIsCreateSegmentModalOpened(false)

		resetFormData()
		let bodyEl = document.querySelector('body');
		if (bodyEl) bodyEl.style.overflow = 'auto'
	}

	const resetFormData = () => {
		setNewContactData({
			email: '',
			name: '',
			phoneNumber: '',
			company: '',
			job_title: '',
			location: '',
			education: '',
			biography: '',
			segments: [],
			links: [],
			interests: [],
			social_media: [],
		})
	}
	return (
		<div className="sidebar">

			{isCreateSegmentModalOpened && <CreateSegment closeModal={closeModal} handleChange={handleChange} creatingSegment={creatingSegment} createSegment={createSegment} />}
			{isCreateCustomerModalOpened &&
				<ImportContact
					closeModal={closeModal}
					handleChange={handleChange}
					addingContact={addingContact}
					addContact={addContact}
					handleSaveContacts={handleSaveContacts}
					importingContacts={importingContacts}
					contactsImported={contactsImported}
				/>
			}
			<div className="mini-sidebar">
				<div className={`mini-sidebar-item ${router?.query?.view == 'contacts' && 'active'}`} onClick={() => navigateTo('contacts')}>
					<svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								d="M17.5 18H18.7687C19.2035 18 19.4209 18 19.5817 17.9473C20.1489 17.7612 20.5308 17.1231 20.498 16.4163C20.4887 16.216 20.42 15.9676 20.2825 15.4708C20.168 15.0574 20.1108 14.8507 20.0324 14.6767C19.761 14.0746 19.2766 13.6542 18.7165 13.5346C18.5546 13.5 18.3737 13.5 18.0118 13.5L15.5 13.5346M14.6899 11.6996C15.0858 11.892 15.5303 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6C15.7295 6 15.4674 6.0358 15.2181 6.10291M13.5 8C13.5 10.2091 11.7091 12 9.5 12C7.29086 12 5.5 10.2091 5.5 8C5.5 5.79086 7.29086 4 9.5 4C11.7091 4 13.5 5.79086 13.5 8ZM6.81765 14H12.1824C12.6649 14 12.9061 14 13.1219 14.0461C13.8688 14.2056 14.5147 14.7661 14.8765 15.569C14.9811 15.8009 15.0574 16.0765 15.21 16.6278C15.3933 17.2901 15.485 17.6213 15.4974 17.8884C15.5411 18.8308 15.0318 19.6817 14.2756 19.9297C14.0613 20 13.7714 20 13.1916 20H5.80844C5.22864 20 4.93875 20 4.72441 19.9297C3.96818 19.6817 3.45888 18.8308 3.50261 17.8884C3.51501 17.6213 3.60668 17.2901 3.79003 16.6278C3.94262 16.0765 4.01891 15.8009 4.12346 15.569C4.4853 14.7661 5.13116 14.2056 5.87806 14.0461C6.09387 14 6.33513 14 6.81765 14Z"
								stroke="#111"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>{" "}
						</g>
					</svg>
				</div>

				<div className={`mini-sidebar-item ${router?.query?.view == 'campaigns' && 'active'}`} onClick={() => navigateTo('campaigns')}>
					<svg
						version="1.1"
						id="Icons"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 32 32"
						xmlSpace="preserve"
						fill="#111"
						width="18"
						height="18"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								className="st0"
								d="M8.8,8.5L8.8,8.5C5.6,8.5,3,11,3,14v0c0,3,2.6,5.5,5.8,5.5h0c5.1,0,10,1.1,14.6,3.3L28,25V12.5V3l-4.7,2.2 C18.8,7.4,13.8,8.5,8.8,8.5z"
							></path>{" "}
							<polyline
								className="st0"
								points="5.3,18.6 10.5,29 16,29 16,8.6 "
							></polyline>{" "}
						</g>
					</svg>
				</div>

				<div className={`mini-sidebar-item ${router?.query?.view == 'conversations' && 'active'}`} onClick={() => navigateTo('conversations')}>
					<svg
						viewBox="0 0 24 24"
						width="19"
						height="19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path
								d="M8 9H16"
								stroke="#111"
								strokeWidth="1.5"
								strokeLinecap="round"
							></path>{" "}
							<path
								d="M8 12.5H13.5"
								stroke="#111"
								strokeWidth="1.5"
								strokeLinecap="round"
							></path>{" "}
							<path
								d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
								fill="#111"
							></path>{" "}
						</g>
					</svg>
				</div>

				<div className="section-end"></div>
			</div>

			{router?.query?.view == 'contacts' && <CustomersSidebar setContactsData={setContactsData} contactsData={contactsData} handleOpenCreateContactModal={handleOpenCreateContactModal} segments={segments} handleOpenCreateSegmentModal={handleOpenCreateSegmentModal} />}
			{router?.query?.view == 'campaigns' && <CampaignsSidebar setContactsData={setContactsData} contactsData={contactsData} activeCampaigns={activeCampaigns} draftCampaigns={draftCampaigns} />}
			{router?.query?.view == 'conversations' && <ConversationsSidebar setContactsData={setContactsData} contactsData={contactsData} />}


		</div>
	);
}

export default Sidebar;
