import { useEffect} from 'react'
import {useDispatch, useSelector,} from 'react-redux'

import SectionHomePage from '../modules/home-page/SectionHomePage';
import  {fetchHomePage} from '../feature/HomePageSlice';
import Loading from '../component/Loading'
function HomePage() {
    const dispatch = useDispatch()
    const {dataHomePage, loading} = useSelector(state => state.homePage)

    useEffect(() => {
        const action = fetchHomePage()
        dispatch(action)
       
    }, [])
    if(loading) {
        return (
            <div className="w-contentWidth h-screen pb-nowPlayingHeight ml-leftContent bg-bgHomePage pt-mtHeader flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <div className="w-contentWidth min-h-0 h-fit pb-nowPlayingHeight ml-leftContent bg-bgHomePage overflow-y-auto pt-mtHeader">
            <div className='gap-6'>
                {dataHomePage.map((sectionData) =>(
                    <SectionHomePage sectionData={sectionData} key={sectionData.id} loading= {loading} />
                ))}
            </div>
            <div className='w-full px-8'>
                <div className='w-full h-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
            </div>
        </div>
    );
}

export default HomePage;