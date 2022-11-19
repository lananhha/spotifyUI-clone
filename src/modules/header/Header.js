import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import HeaderNavItem from './HeaderNavItem';
import ButtonBorder from "../../component/ButtonBorder";
import FormSearch from "../search/FormSearch";
function Header() {
    const location = useLocation() 
    const bgHeaderPrimary = useSelector(state => state.playlistPage.bgHeaderPrimary)
    return (
        <div className={`h-headerHeight w-contentWidth flex justify-between  gap-6 items-center py-4 px-8 ${bgHeaderPrimary && 'bg-[#0a8d39]'} bg-black fixed top-0 left-leftContent z-[100] shadow-boxShadowHeader`}>
            <div className="flex items-center flex-1 gap-4">
                <div className="text-white w-8 h-8 rounded-full bg-[rgba(0,0,0,.7)] flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className="text-white w-8 h-8 rounded-full bg-[rgba(0,0,0,.7)] flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                {/* {true &&
                    <div className="ml-8">
                        {isPlaying ? (
                            <>
                                <div className={`w-12 h-12 rounded-full flex justify-center items-center bg-black border border-white `}>
                                    <span className="text-center text-white w-fit h-fit flex justify-center items-center"><PlayIcon /></span>
                                </div>
                                <h2></h2>
                            </>
                        ) : (
                            <div className={`w-12 h-12 rounded-full flex justify-center items-center bg-black border border-white`}>
                                <span className="text-center text-white w-fit h-fit flex justify-center items-center"><PauseIcon /></span>
                            </div>
                        )}
                    </div>} */}
                {location.pathname.includes('/search') && <FormSearch />}
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <HeaderNavItem>Premium</HeaderNavItem>
                    <HeaderNavItem>Support</HeaderNavItem>
                    <HeaderNavItem>Download</HeaderNavItem>
                </div>
                <div className="px-4">
                    <div className="w-[1px] h-6 bg-white"></div>
                </div>
                <div className="flex items-center">
                    <HeaderNavItem className='py-2 pl-2 pr-8'>Sign Up</HeaderNavItem>
                    <ButtonBorder>Log In</ButtonBorder>
                </div>
            </div>
        </div>
    );
}

export default Header;