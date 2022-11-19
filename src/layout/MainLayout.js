import {Outlet} from 'react-router-dom'

import Header from "../modules/header/Header";
import Sidebar from "../modules/Sidebar/Sidebar";
import NowPlayingBar from '../modules/player-control/NowPlayingBar';
import BannerSignUp from "../modules/BannerSignUp";
function MainLayout() {
    return ( 
        <div className="h-screen w-full relative bg-black">
            <Sidebar />
            <Header />
            <NowPlayingBar />
            <Outlet></Outlet>
            {/* <BannerSignUp /> */}
        </div>
     );
}

export default MainLayout;