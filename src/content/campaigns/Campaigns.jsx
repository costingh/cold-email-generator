import Icon from '@components/Icon'
import React from 'react'
import NewCampaign from './NewCampaign'
import { useRouter } from 'next/router';

function Campaigns() {
	const router = useRouter();

	const goToCreateCampaign = () => {
		router.push(
			{
				pathname: '/dashboard',
				query: { view: 'campaigns', create_campaign: true, step: 'details' },
			},
			undefined,
			{ shallow: true }
		);
	}

	return (
		<div className='campaigns-page-wrapper'>
			{router?.query?.create_campaign ? <NewCampaign/> :
				<div className='inner'>
					<h1>This is campaigns view</h1>
					<p>Here you can manage your existing campaigns or create a new one.</p>
					<img width='100' src='./illustration.png' className='mb-4' />

					<div className="btn-filled btn-campaigns text-center max-w-80 mt-4" onClick={goToCreateCampaign}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>plus icon</title>
							<path
								d="M8 3.33337V12.6667"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M3.3335 8H12.6668"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
						<span>Create a campaign</span>
					</div>
				</div>
			}
		</div>
	)
}

export default Campaigns