import React from 'react'
import { settingsMenu } from '../../utils/menu'
import MenuItem from './MenuItem'

const MenuBar = () => {
    return (
        <div onClick={e => e.stopPropagation()} className='bg-[#34224F] rounded-lg drop-shadow-lg p-2 '>
            {settingsMenu?.map(item => (
                <MenuItem key={item.id} icon={item.icon} text={item.text} />
            ))}
        </div>
    )
}

export default MenuBar
