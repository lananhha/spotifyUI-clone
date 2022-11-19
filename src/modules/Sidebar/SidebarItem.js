import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';

function SidebarItem({icon,iconActive, to, title, className}) {
    const dispatch = useDispatch()
    return ( 
        <SidebarItemStyles className='w-full h-full'>
            <NavLink 
                to={to} 
                className={({isActive}) => {
                    const textActive = isActive ? 'opacity-100' : 'opacity-70'
                    return `${textActive} sidebar-item flex px-4 gap-4 items-center w-full h-full text-white hover:opacity-100 ${className}`
                }}
                end
            >
                {({isActive}) => {
                    return (<>
                        {isActive && <span>{iconActive}</span>}
                        {!isActive && <span>{icon}</span>}
                        <span className='text-sm font-bold'>{title}</span>
                    </>)

                }}
            </NavLink>
        </SidebarItemStyles>
     );
}

const SidebarItemStyles = styled.div`
    .sidebar-item{
        transition: opacity .2s linear;
    }
`

export default SidebarItem;