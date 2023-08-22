import React from 'react'
import dynamic from 'next/dynamic';
import { withProtected } from "../hook/route";
import Dashboard from 'src/content/dashboard/Dashboard';

function dashboard() {
  return (
    <div style={{height: '100%'}}>
      <Dashboard/>
    </div>
  )
}

export default withProtected(dashboard)