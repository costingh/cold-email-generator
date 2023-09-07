import React, { useEffect, useState } from 'react'
import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import { useRouter } from 'next/router';
import DashboardContent from '/src/content/dashboard_content/DashboardContent'
import ContactsService from '@services/contacts.service';
import { paginate } from '@lib/paginate';
import segmentsService from '@services/segments.service';
import useAuth from "/src/hook/auth";
import async from "async"
import campaignService from '@services/campaign.service';

// redux
import { selectContactsState, setContactsState } from "@store/contactsSlice";
import { useDispatch, useSelector } from "react-redux";

const _MOCK_CONTACTS = [
	{
		name: 'Alan Macin',
		email: 'alan.macin@gmail.com',
		job_title: 'Software Engineer',
		company: 'Automotive INC',
		social_media: [
			{ instagram: 'www.instagram.com/alan.maciin' },
			{ linkedin: 'www.linkedin.com/@alan_macin' }
		],
		location: 'United States (US)',
		interests: ['Unknown'],
		education: '',
		biography: 'Ambitious engineer with high goals',
		links: ['www.alan-macin.uk']
	},
	{
		name: 'Emily Johnson',
		email: 'emily.johnson@example.com',
		job_title: 'Marketing Manager',
		company: 'Tech Solutions Co.',
		social_media: [
			{ twitter: 'www.twitter.com/emily_j' },
			{ linkedin: 'www.linkedin.com/@emilyjohnson' }
		],
		location: 'Canada',
		interests: ['Digital Marketing', 'Photography'],
		education: 'Bachelor of Business Administration',
		biography: 'Passionate about digital marketing and capturing moments through photography.',
		links: ['www.emilyjohnson.com']
	}
]

export default function Dashboard() {
	const router = useRouter();
	const { view, segment } = router.query;
	const { user } = useAuth();

	const [segments, setSegments] = useState([])
	const [contactsData, setContactsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 6;
	const [isCreateCustomerModalOpened, setIsCreateCustomerModalOpened] = useState(false)
	const [isCreateSegmentModalOpened, setIsCreateSegmentModalOpened] = useState(false)
	const [importingContacts, setImportingContacts] = useState(false)
	const [contactsImported, setContactsImported] = useState(false)
	const [activeCampaigns, setActiveCampaigns] = useState([])
	const [draftCampaigns, setDraftCampaigns] = useState([])

	const contactsSlice = useSelector(selectContactsState);
    const dispatch = useDispatch();

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (view == 'contacts' && !router?.query?.segment) {
			setLoading(true)
			ContactsService.getContacts(user?.email, (error, contacts) => {
				// setContactsData(contacts)
				dispatch(setContactsState(contacts))
				setLoading(false)
			})
			segmentsService.getSegments(user?.email, (error, segments) => {
				setSegments(segments)
			})
		}

		if (view == 'campaigns') {
			setLoading(true)
			campaignService.getCampaigns((error, campaigns) => {
				console.log(campaigns)
				setLoading(false)
			})
		}

	}, [router.query])


	useEffect(() => {
		let currentSegment = segments.find(seg => seg.name === segment);
		if (currentSegment) {
			segmentsService.getContactsFromSegment(currentSegment.id, (error, contacts) => {
				setContactsData(contacts)
			})
		}
	}, [router.query, segments])

	const addNewContact = (newContactData) => {
		setContactsData(contactsData => [...contactsData, newContactData])
	}

	const addNewSegment = (newSegmentData) => {
		setSegments(segmentsData => [...segmentsData, newSegmentData])
	}

	const handleSaveContacts = (contacts) => {
		setContactsData(contactsData => [...contactsData, ...contacts])
		setImportingContacts(true)

		// save contacts to db
		async.eachLimit(contacts, 10,
			(contact, cb) => {
				ContactsService.createContact(contact, (error, res) => {
					console.log('=====			', contact)
					console.log(res)
					cb()
				})
			},
			(err) => {
				setImportingContacts(false)
				setContactsImported(true)
			})
	}

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<Navbar />
			<div className='inner-content'>
				<Sidebar
					setContactsData={setContactsData}
					addNewContact={addNewContact}
					segments={segments}
					addNewSegment={addNewSegment}
					handleSaveContacts={handleSaveContacts}
					isCreateCustomerModalOpened={isCreateCustomerModalOpened}
					isCreateSegmentModalOpened={isCreateSegmentModalOpened}
					setIsCreateCustomerModalOpened={setIsCreateCustomerModalOpened}
					setIsCreateSegmentModalOpened={setIsCreateSegmentModalOpened}
					importingContacts={importingContacts}
					contactsImported={contactsImported}
					activeCampaigns={activeCampaigns}
					draftCampaigns={draftCampaigns}
				/>
				<DashboardContent
					loadingContacts={loading}
					setContactsData={setContactsData}
					items={contactsData.length}
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={onPageChange}
					segments={segments}
				/>
			</div>
		</div>
	)
}