import React from 'react'
import SideNavBar from './_components/SideNavBar'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='hidden md:block md:w-64 bg-slate-50 h-screen fixed'> {/* only shows when screen size is medium+ */}
            <SideNavBar />
        </div>
        <div className='md:ml-64'> 
            {children}
        </div>
    </div> //whichever route comes under the dashboard will be rendered inside this dashboard layout
  )
}

export default DashboardLayout