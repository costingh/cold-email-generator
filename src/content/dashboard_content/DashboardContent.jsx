import React from 'react'
import { useRouter } from 'next/router';
import Contacts from '../contacts/Contacts';
import Campaigns from '../campaigns/Campaigns';

function DashboardContent({
    contactsData,
    loadingContacts,
    items,
    currentPage,
    pageSize,
    onPageChange,
    segments,
}) {
    const router = useRouter();
    const { view } = router.query;

    return (
        <div className='dashboard-content'>
            {view == 'contacts' &&
                <Contacts
                    items={items}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    contactsData={contactsData}
                    loadingContacts={loadingContacts}
                    segments={segments}
                />}

            {view == 'campaigns' &&
                <Campaigns/>
            }
        </div>
    )
}

export default DashboardContent