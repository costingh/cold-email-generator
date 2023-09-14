import React, { useState } from "react";

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import ContactsService from "@services/contacts.service";
import segmentsService from "@services/segments.service";
import { selectContactsState, setContactsState, addNewContact } from "@store/contactsSlice";
import { selectSegmentsState, setSegmentsState, addNewSegment } from "@store/segmentsSlice";

import CustomersSidebar from '../layout/customers/CustomersSidebar';
import CampaignsSidebar from '../layout/campaigns/CampaignsSidebar';
import ConversationsSidebar from '../layout/conversations/ConversationsSidebar';

import ImportContact from "./modals/ImportContact";
import CreateSegment from "./modals/CreateSegment";

import Icon from "./Icon";

import useAuth from "/src/hook/auth";
import routerService from "@services/router.service";
import SidebarSlim from "./SidebarSlim";

function Sidebar({
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
	const dispatch = useDispatch();


	const [addingContact, setAddingContact] = useState(false)
	const [creatingSegment, setCreatingSegment] = useState(false)

	const [message, setMessage] = useState({
		success: '',
		error: ''
	})

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
		links: '',
		interests: '',
		social_media: '',
		// segments: [],
		user_email: user?.email
	})

	const [segmentData, setSegmentData] = useState({
		name: '',
		description: '',
		industry: '',
		location: '',
		jobTitle: '',
		interests: '',
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
				setSegmentData({ ...segmentData, interests: e.target.value })
				break;


			default:
				break;
		}

	}

	const createSegment = () => {
		setCreatingSegment(true)
		segmentsService.createSegment(segmentData, (error, res) => {
			if (error || res?.error) {
				setCreatingSegment(false)
				setMessage({
					error: 'Could not create segment',
					success: ''
				})
			}
			if (res?.response) {
				dispatch(addNewSegment(res?.response));
				resetFormData()
				setCreatingSegment(false)
				setMessage({
					error: '',
					success: 'Segment created successfully'
				})
				setIsCreateSegmentModalOpened(false)
				routerService.updateUrlParam(router, 'segment', segmentData.name)
			}
		})
	}

	const addContact = () => {
		setAddingContact(true)

		// let newContactData2 = {
		// 	email: 'mircea',
		// 	name: 'Mircea',
		// 	phoneNumber: '07242891024',
		// 	company: 'ceva',
		// 	job_title: 'CEO',
		// 	biography: '-',
		// 	education: '-',
		// 	location: 'Europe',
		// 	interests: ['AI', 'SaaS'],
		// 	user_email: 'gheorghecostin221@gmail.com'
		// }

		ContactsService.createContact(newContactData, (error, res) => {
			if (error || res?.error) {
				setAddingContact(false)
				setMessage({
					error: 'Could not add this conctact',
					success: ''
				})
			}
			if (res?.response) {
				dispatch(addNewContact(newContactData));
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
			user_email: user?.email
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

			<SidebarSlim/>

			{router?.query?.view == 'contacts' &&
				<CustomersSidebar
					handleOpenCreateContactModal={handleOpenCreateContactModal}
					handleOpenCreateSegmentModal={handleOpenCreateSegmentModal}
				/>
			}

			{router?.query?.view == 'campaigns' &&
				<CampaignsSidebar
					activeCampaigns={activeCampaigns}
					draftCampaigns={draftCampaigns}
				/>
			}

			{router?.query?.view == 'conversations' &&
				<ConversationsSidebar />
			}
		</div>
	);
}

export default Sidebar;
