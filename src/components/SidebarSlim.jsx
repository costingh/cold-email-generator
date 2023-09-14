import React from 'react'
import { useRouter } from 'next/router';
import routerService from '@services/router.service';
import Icon from './Icon';

function SidebarSlim() {
	const router = useRouter();

	const navigateTo = route => {
        routerService.navigate(router, '/dashboard', { view: route }, true)
	}
    return (
        <div className="mini-sidebar">
            <div className={`mini-sidebar-item ${router?.query?.view == 'dashboard' && 'active'}`} onClick={() => navigateTo('dashboard')}>
                <Icon icon='home' />
            </div>

            <div className={`mini-sidebar-item ${router?.query?.view == 'contacts' && 'active'}`} onClick={() => navigateTo('contacts')}>
                <Icon icon='contacts' />
            </div>

            <div className={`mini-sidebar-item ${router?.query?.view == 'campaigns' && 'active'}`} onClick={() => navigateTo('campaigns')}>
                <Icon icon='campaigns' />
            </div>

            <div className={`mini-sidebar-item ${router?.query?.view == 'conversations' && 'active'}`} onClick={() => navigateTo('conversations')}>
                <Icon icon='conversations' />
            </div>

            <div className="section-end"></div>
        </div>
    )
}

export default SidebarSlim