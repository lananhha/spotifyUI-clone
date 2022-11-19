import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';

import LogoSpotify from '../../component/Logo';
import SidebarItem from './SidebarItem';
import { HomeIcon, SearchIcon, LibraryIcon, HomeIconActive, SearchIconActive, LibraryIconActive } from '../../component/Icon'
import { useSelector } from 'react-redux';
function Sidebar() {
    const keySearch= useSelector(state => state.searchPage.keySearch)

    const location = useLocation()
    return (
        <SidebarStyles >
            <div className='bg-black w-sidebarWidth h-screen pt-6 flex flex-col fixed'>
                <Link to='/' className='text-white mb-[18px] px-6 select-none '>
                    <LogoSpotify className='h-10 max-w-[131px]' />
                </Link>
                <ul>
                    <li className='h-10 flex items-center w-full px-2'>
                        <SidebarItem to='/' title='Home' icon={<HomeIcon />} iconActive={<HomeIconActive />} />
                    </li>
                    <li
                        className='h-10 flex items-center w-full px-2'
                    >
                        <Link
                            to={'/search'}
                            className={`${location.pathname.indexOf("/search") >= 0 ? 'opacity-100' : 'opacity-70'} sidebar-item flex px-4 gap-4 items-center w-full h-full text-white hover:opacity-100`}
                        >
                            {location.pathname.indexOf("/search") >= 0 && <span>
                                <SearchIconActive />
                            </span>}
                            {location.pathname.indexOf("/search") < 0 && <span>
                                <SearchIcon />
                            </span>}
                            <span className='text-sm font-bold'>Search</span>

                        </Link>
                    </li>
                    <li className='h-10 flex items-center w-full px-2'>
                        <SidebarItem to='/collections' title='Your Library' icon={<LibraryIcon />} iconActive={<LibraryIconActive />} />
                    </li>
                </ul>
                <ul className='flex flex-col mt-6 '>
                    <li className='h-10 flex items-center w-full px-2 text-white text-[14px]'>
                        <NavLink
                            className='create-playlist flex px-4 gap-4 items-center w-full h-full opacity-70 hover:opacity-100 '
                            to='/playlists'
                        >
                            <span className='w-6 h-6 text-[12px] text-black rounded-sm  flex items-center justify-center bg-white '>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            <span className='text-sm text-white font-bold'>Create Playlist</span>
                        </NavLink>
                    </li>
                    <li className='h-10 flex items-center w-full px-2 text-white text-[14px]'>
                        <NavLink
                            className={({ isActive }) => {
                                const active = isActive ? 'opacity-100' : 'opacity-70'
                                return `love-tracks flex px-4 gap-4 items-center w-full h-full ${active} hover:opacity-100`
                            }}
                            to='/love-song'
                        >
                            <span className='w-6 h-6 text-[12px] rounded-sm bg-[linear-gradient(135deg,#450af5,#c4efd9)] flex items-center justify-center text-white'><FontAwesomeIcon icon={faHeart} /></span>
                            <span className='text-sm  text-white font-bold'>Liked Songs</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </SidebarStyles>
    );
}

const SidebarStyles = styled.div`
    .create-playlist, .love-tracks{
        transition: opacity .2s linear;
    }
`

export default Sidebar;