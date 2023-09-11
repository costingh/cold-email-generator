import React from 'react'
import { useRouter } from 'next/router';
import Contacts from '../contacts/Contacts';
import Campaigns from '../campaigns/Campaigns';

function DashboardContent({
    loadingContacts,
    currentPage,
    pageSize,
    onPageChange,
}) {
    const router = useRouter();
    const { view } = router.query;

    return (
        <div className='dashboard-content'>
            {view == 'contacts' &&
                <Contacts
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    loadingContacts={loadingContacts}
                />
            }

            {view == 'campaigns' &&
                <Campaigns />
            }
        </div>
    )
}

export default DashboardContent