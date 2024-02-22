import React from 'react'
import LeftSidebar from '../components/LeftSideBar'
import MainContent from '../components/MainContent'
import RightSidebar from '../components/RightSidebar'

function Home() {
    return (
        <div className='container'>
            <LeftSidebar />
            <MainContent />
            <RightSidebar />

        </div>
    )
}

export default Home