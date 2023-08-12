import React from 'react'
import dynamic from 'next/dynamic';
const Dashboard = dynamic(() => import('/src/content/dashboard/Dashboard'));
import { withProtected } from "../hook/route";

function dashboard() {
  return (
    <div style={{height: '100%'}}>
      <Dashboard/>
    </div>
  )
}

export default withProtected(dashboard)