import Icon from '@components/Icon'
import React from 'react'
import { useRouter } from 'next/router';

function CampaignsSidebar({ activeCampaigns, draftCampaigns }) {
    const router = useRouter();

    const goToCreateCampaign = () => {
        routerService.navigate(router, '/dashboard', { view: 'campaigns', create_campaign: true, step: 'details' }, true)
    }

    return (
        <div className="large-sidebar">
            <div className="btn-filled btn-campaigns text-center max-w-80 mb-4" onClick={goToCreateCampaign}>
                <Icon icon='plus' />
                <span>Create a campaign</span>
            </div>

            <div className="sidebar-title">Your existing campaigns</div>

            <div className="item">
                <div>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" /></svg>
                    </div>
                    <div className="text ml-2">Active campaigns</div>
                </div>
                <div className="right">
                    <span>{activeCampaigns?.length}</span>
                    <Icon icon='chevron-right' />
                </div>
            </div>

            <div className="item">
                <div>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614z" /></svg>
                    </div>
                    <div className="text ml-2">Drafts</div>
                </div>
                <div className="right">
                    <span>{draftCampaigns?.length}</span>
                    <svg
                        className="ml-1 h-16 w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                    >
                        <title>chevron right icon</title>
                        <path
                            d="M6 12L10 8L6 4"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="btn-outline text-center max-w-80">Explore more</div>
        </div>
    )
}

export default CampaignsSidebar