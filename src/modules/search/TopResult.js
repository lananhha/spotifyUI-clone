import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonPlayLarge, ButtonPauseLarge } from '../card-song/ButtonLarge';
import img from '../../assets/images/card_img.jpg'
import HeadingSearch from './HeadingSearch';
import getOverviewArtist from '../../api/getOverviewArtist';
import { updateCurrentIndexSong, updateCurrentPlaylistPlaying, updateCurrentTrackId, clickPlayButton, clickPauseButton, addCurrentPageId } from '../../feature/CurrentSlice';
function TopResult({ data }) {

    const dispatch = useDispatch()
    const { isPlaying, currentPageId } = useSelector(state => state.currentState)

    const handelClickPlayBtn = async () => {
        if (currentPageId === data.id) {
            dispatch(clickPlayButton())
        }else{
            const overViewArtist = await getOverviewArtist(data.id)
            const trackList = overViewArtist.discography.topTracks
            const firstTrack = trackList[0].id
            dispatch(updateCurrentTrackId(firstTrack))
            dispatch(clickPlayButton())
            dispatch(addCurrentPageId(data.id))
            dispatch(updateCurrentPlaylistPlaying(trackList))
            dispatch(updateCurrentIndexSong(0))
        }
    }

    const clickButtonPauseLarge = () => {
        dispatch(clickPauseButton())
     }
    return (
        <TopResultStyles>
            <HeadingSearch title='Top Result' />
            <div className='top-result-wrap relative'>
                <Link to={`/artist/${data.id}`}>
                    <div className='top-result bg-[#181818] hover:bg-[#282828] p-5 flex flex-col gap-5 rounded-xl cursor-pointer'>
                        <div className='w-[92px] h-[92px] rounded-full overflow-hidden'>
                            <img src={data.visuals.avatar[1].url} className='w-full h-full' />
                        </div>
                        {/* <div className='relative'> */}
                        <div>
                            <h2 className='text-white text-[30px] font-bold mb-4'>{data.name}</h2>
                            <button className='bg-[#000] hover:bg-black py-1 px-3 text-sm font-normal rounded-3xl'>ARTIST</button>
                        </div>
                        {/* </div> */}
                    </div>
                </Link>
                {(!isPlaying || data.id !== currentPageId ) &&
                    <ButtonPlayLarge onClick={handelClickPlayBtn} className='play-btn absolute bottom-10 right-8' />
                }
                {(isPlaying && data.id === currentPageId) && (
                    <ButtonPauseLarge onClick={clickButtonPauseLarge} className='absolute bottom-10 right-8' />
                )}
            </div>
        </TopResultStyles>
    );
}
const TopResultStyles = styled.div`
.top-result{
    transition: background-color .3s ease
}
.play-btn{
    transform: scale(0);
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.top-result-wrap:hover .play-btn{
    transform: scale(1);
}


`
export default TopResult;