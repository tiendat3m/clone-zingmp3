import React from 'react'

const MenuItem = ({ icon, text }) => {
    return (
        <div className='flex items-center rounded-md gap-3 text-gray-300 px-3 py-[10px] hover:bg-overlay-30 text-sm'>
            <span>{icon}</span>
            <span>{text}</span>
        </div>
    )
}

export default MenuItem
