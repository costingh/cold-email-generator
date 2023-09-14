import React, { useEffect, useState } from 'react';

import async from "async";
import Navbar from '@components/Navbar';
import { useRouter } from 'next/router';
import { paginate } from '@lib/paginate';
import Sidebar from '@components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import ContactsService from '@services/contacts.service';
import segmentsService from '@services/segments.service';
import campaignService from '@services/campaign.service';
import { selectContactsState, setContactsState, addNewContact } from "@store/contactsSlice";
import { selectSegmentsState, selectCurrentSegment, setSegmentsState, setCurrentSegment, removeSegment } from "@store/segmentsSlice";

import useAuth from "/src/hook/auth";
import DashboardContent from '/src/content/dashboard_content/DashboardContent';
import contactsService from '@services/contacts.service';

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

	const [contactsData, setContactsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 6;
	const [isCreateCustomerModalOpened, setIsCreateCustomerModalOpened] = useState(false)
	const [isCreateSegmentModalOpened, setIsCreateSegmentModalOpened] = useState(false)
	const [importingContacts, setImportingContacts] = useState(false)
	const [contactsImported, setContactsImported] = useState(false)
	const [activeCampaigns, setActiveCampaigns] = useState([])
	const [draftCampaigns, setDraftCampaigns] = useState([])

	const contactsList = useSelector(selectContactsState);
	const segmentsList = useSelector(selectSegmentsState);
	const currentSegment = useSelector(selectCurrentSegment);

	const dispatch = useDispatch();

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		init(view, () => setLoading(false))
	}, [router.query, currentSegment])

	const init = (appview, callback) => {
		if (appview == 'contacts' && !router?.query?.segment) {
			async.parallel(
				{
					contacts: (cb) => fetchContacts(cb),
					segments: cb => fetchSegments(cb),
				},
				() => {
					callback()
				}
			);
		} else if (appview == 'campaigns') {
			campaignService.getCampaigns((error, campaigns) => {
				callback()
			})
		} else if (appview == 'contacts' && router?.query?.segment) {
			async.parallel(
				{
					contacts: (cb) => fetchContacts(cb),
					segments: cb => fetchSegments(cb),
				},
				() => {
					callback()
				}
			);
		} else callback()
	}

	const fetchContacts = (callback) => {
		segmentsService.getContactsFromSegment(currentSegment, user?.email, (err, contacts) => {
			dispatch(setContactsState(contacts))
			callback(err, contacts)
		})
	}

	const fetchSegments = (callback) => {
		segmentsService.getSegments(user?.email, (error, segments) => {
			dispatch(setSegmentsState(segments || []))
			callback(error, segments)
		})
	}

	const handleSaveContacts = (contacts) => {
		setImportingContacts(true)

		// save contacts to db
		async.eachLimit(contacts, 10,
			(contact, cb) => {
				ContactsService.createContact(contact, (error, res) => {
					if(res?.response) {
						dispatch(addNewContact(contact))
						contactsService.publishContact(contact, (err, resp) => {
							console.log(err)
							console.log(resp)

						})
					}
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
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	)
}