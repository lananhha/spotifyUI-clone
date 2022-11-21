import styled from "styled-components";
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { ButtonPauseLarge, ButtonPlayLarge } from "../card-song/ButtonLarge";
import { clickPlayButton,clickPauseButton, addCurrentPageId, updateCurrentTrackId, updateCurrentPlaylistPlaying, updateCurrentIndexSong, } from "../../feature/CurrentSlice";
import getTrackListPlaylist from "../../api/getListTrackPlaylist";
import getListTrackAlbum from "../../api/getListTrackAlbum";
import getOverviewArtist from "../../api/getOverviewArtist";
function CardSongSearch({ children, type, src, description, time, day, imgSmall, name, id }) {
    const dispatch = useDispatch()
    const isPlaying = useSelector(state => state.currentState.isPlaying)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const currentPageId = useSelector(state => state.currentState.currentPageId)

    const clickButtonPlayLarge = async () => {
        if (currentPageId === id) {
            dispatch(clickPlayButton())
        } else {
            dispatch(addCurrentPageId(id))
            if (type === 'playlist') {
                const trackListData = await getTrackListPlaylist(id)
                dispatch(clickPlayButton())
                const trackList = trackListData.contents.items
                const firstTrack = trackList[0].id
                dispatch(updateCurrentTrackId(firstTrack))
                dispatch(updateCurrentPlaylistPlaying(trackList))
                dispatch(updateCurrentIndexSong(0))
            }
            if (type === 'album') {
                const trackListData = await getListTrackAlbum(id)
                dispatch(clickPlayButton())
                const trackList = trackListData.tracks.items
                const firstTrack = trackList[0].id
                dispatch(updateCurrentTrackId(firstTrack))
                dispatch(updateCurrentPlaylistPlaying(trackList))
                dispatch(updateCurrentIndexSong(0))
            }
            if (type === 'artist') {
                const overViewArtist = await getOverviewArtist(id)
                dispatch(clickPlayButton())
                const trackList = overViewArtist.discography.topTracks
                const firstTrack = trackList[0].id
                dispatch(updateCurrentTrackId(firstTrack))
                dispatch(updateCurrentPlaylistPlaying(trackList))
                dispatch(updateCurrentIndexSong(0))
            }
        }
    }

    const clickButtonPauseLarge = () => {
        dispatch(clickPauseButton())
    }
    return (
        <CardSongSearchStyles>
            <div className='card-song p-4 w-full bg-[#181818] rounded-md cursor-pointer relative'>
                <Link to={`/${type}/${id}`}>
                    <div className='w-full' >
                        <div className={`${type === 'artist' || type === 'profile' ? ' w-[193px] h-[193px] rounded-full mb-4 overflow-hidden' : 'w-[193px] h-[193px] mb-4 rounded-md overflow-hidden'}`}>
                            <img src={src} className='w-full h-full' />
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='name-playlist text-white text-base font-bold pb-1 mt-2 truncate '>{name}</h4>
                            {type !== 'album' && type !== 'episode' && type !== 'genres' && <p className='playlist-desc w-full text-textColor2 font-normal text-sm'>{description}</p>}
                            {type === 'album' &&
                                <p className='playlist-desc text-textColor2 font-normal text-sm'>
                                    <span>{time}  • </span>
                                    <span >{description}</span>
                                </p>
                            }
                            {type === 'episode' &&
                                <p className='playlist-desc text-textColor2 font-normal text-xs'>
                                    <span>{day} · </span>
                                    <span>{time}</span>
                                </p>
                            }
                        </div>
                        {type === 'episode' && (
                            <div className="absolute w-10 h-10 rounded-md overflow-hidden bottom-28 left-2.5">
                                <img src={imgSmall} className='w-full h-full' />
                            </div>
                        )}
                    </div>
                </Link>
                {(type === 'playlist' || type === 'album' || type === 'artist') &&
                    <>
                        {(id !== currentPageId) &&
                            <div onClick={clickButtonPlayLarge} className='play-btn absolute right-6 bottom-32 rounded-full' >
                                <ButtonPlayLarge />
                            </div>
                        }
                    </>}
                {(type === 'playlist' || type === 'album' || type === 'artist') &&
                    <>
                        {(!isPlaying && id === currentPageId) &&
                            <div onClick={clickButtonPlayLarge} className='play-btn absolute right-6 bottom-32 rounded-full' >
                                <ButtonPlayLarge />
                            </div>
                        }
                    </>}
                {(isPlaying && id === currentPageId) && (
                    <div onClick={clickButtonPauseLarge} className='absolute right-6 bottom-32 rounded-full' >
                        <ButtonPauseLarge />
                    </div>
                )}
            </div>
        </CardSongSearchStyles>
    );
}
const CardSongSearchStyles = styled.div`
.card-song{
    transition: background-color .3s ease
}
.card-song:hover{
    background-color: #282828;
}

.card-song:hover .play-btn{
    transform: translate3d(0px, 0px, 0px) ;
    transform: scale(1);
    background-color: #1ed760;
}

.name-playlist{
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.playlist-desc{
    height: 45px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.play-btn{
    transform: translate3d(0px, 60px, 0px) ;
    transform: scale(0);
    transition-property: background-color, transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
}
`
export default CardSongSearch;