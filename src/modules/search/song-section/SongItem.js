import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsis, faPause } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import img from '../../../assets/images/card_img.jpg'
import NameSong from '../../../component/NameSong';
import NameArtist from '../../../component/NameArtist';
import * as reselectSearch from '../../../reselect/reselectSearchPage'
import { updateCurrentTrackId, clickPlayButton, clickPauseButton, updateCurrentPlaylistPlaying } from '../../../feature/CurrentSlice';
function SongItem({ data }) {
    const { currentTrackId, isPlaying } = useSelector(state => state.currentState)
    const { resultSong } = useSelector(createStructuredSelector({
        resultSong: reselectSearch.resultSong
    }))
    const dispatch = useDispatch()
    const clickPlayBtn = () => {
        if (data.id !== currentTrackId) {
            dispatch(updateCurrentTrackId(data.id))
        }

        //update isPlaying
        const actionClick = clickPlayButton()
        dispatch(actionClick)

        dispatch(updateCurrentPlaylistPlaying(resultSong.items))

    }
    const clickPauseBtn = () => {
        dispatch(clickPauseButton())
    }
    return (
        <SongItemStyles>
            <div className='song-item flex gap-4 bg-transparent px-3 py-2 rounded'>
                <div className='w-10 h-10 flex justify-center items-center relative'>
                    <img src={data.album.cover[1].url} className='w-full h-full absolute top-0 left-0 right-0 bottom-0 -z-10' />
                    {(!isPlaying || data.id !== currentTrackId) &&
                        <span onClick={clickPlayBtn} className='text-white play-btn hidden'>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    }
                    {(isPlaying && data.id === currentTrackId) &&
                        <span onClick={clickPauseBtn} className='text-white'>
                            <FontAwesomeIcon icon={faPause} />
                        </span>
                    }
                </div>
                <div className='w-[55%]'>
                    <NameSong className={ (data.id === currentTrackId) && 'text-primary' } name={data.name} />
                    <NameArtist to={`/artist/${data.artists[0].id}`} className='leading-4' name={data.artists[0].name} />
                </div>
                <div className='flex flex-1 justify-between items-center'>
                    <span className="heart-icon text-textColor hover:text-white text-base hidden">
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <span className="flex-1 text-center text-textColor2 text-sm">{data.durationText}</span>
                    <span className="ellipsis-icon text-textColor text-base hidden">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
            </div>
        </SongItemStyles>
    );
}
const SongItemStyles = styled.div`
.song-item:hover{
    background-color: hsla(0,0%,100%,.1);
}

.song-item:hover .heart-icon{
    display: flex
}

.song-item:hover .ellipsis-icon{
    display: flex
}

.song-item:hover .play-btn{
    display: flex
}
`
export default SongItem;