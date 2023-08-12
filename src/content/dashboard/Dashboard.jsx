import React, { useEffect, useState } from 'react'
import Navbar from '/src/components/Navbar'
import Sidebar from '/src/components/Sidebar'
import { useRouter } from 'next/router';
import DashboardContent from '/src/content/dashboard_content/DashboardContent'
import UsersService from '@services/users.service'

function Dashboard() {
	const router = useRouter();
	const { view } = router.query;

	useEffect(() => {
		UsersService.getUsers()
	}, [])

	const [customersData, setCustomersData] = useState([
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
	]);

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<Navbar />
			<div className='inner-content'>
				<Sidebar customersData={customersData} setCustomersData={setCustomersData} />
				<DashboardContent customersData={customersData} setCustomersData={setCustomersData}/>
			</div>
		</div>
	)
}

export default Dashboard