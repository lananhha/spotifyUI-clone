import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useParams, } from 'react-router-dom';


import Loading from '../component/Loading';
import { fetchPlaylistMetaData } from '../feature/PlaylistSlice'
import TrackList from '../modules/playlist/TrackList';
import { changeBgHeader } from '../feature/PlaylistSlice';
import MetaDataBgImg from '../modules/over-view-section/MetaDataBgImg';
import { HeartIcon } from '../component/Icon';
import { ButtonPauseLarge, ButtonPlayLarge } from '../modules/card-song/ButtonLarge';
import { clickPlayButton, clickPauseButton, updateCurrentTrackId, updateCurrentPlaylistPlaying, updateCurrentIndexSong } from '../feature/CurrentSlice';
function Playlist() {
    const dispatch = useDispatch()
    const isPlaying = useSelector(state => state.currentState.isPlaying)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const trackList = useSelector(state => state.playlistPage.trackList)
    const { metadataPlaylistPage, loading } = useSelector(state => state.playlistPage);
    const listTrackId = trackList.map((item) => item.id)
    const { id } = useParams()
    useEffect(() => {
        const actionMetaData = fetchPlaylistMetaData(id)
        dispatch(actionMetaData)
    }, [])

    useEffect(() => {
        const handelScroll = () => {
            if (window.scrollY >= 306) {
                dispatch(changeBgHeader(true))
            } else {
                dispatch(changeBgHeader(false))
            }
        }
        document.addEventListener('scroll', handelScroll)

        return () => {
            dispatch(changeBgHeader(false))
            document.removeEventListener('scroll', handelScroll)
        }
    }, [])

    const handleClickPlayBtn = () => {
        if (currentTrackId && listTrackId.find(item => item === currentTrackId)) {
            dispatch(clickPlayButton())
            return
        }
        dispatch(clickPlayButton())
        const firstTrack = trackList[0].id
        dispatch(updateCurrentTrackId(firstTrack))
        dispatch(updateCurrentPlaylistPlaying(trackList))
        dispatch(updateCurrentIndexSong(0))
    }

    const handleClickPauseBtn = () => {
        dispatch(clickPauseButton())
    }

    if (loading) {
        return (
            <div className="playlist-page w-contentWidth min-h-full bg-bgHomePage  ml-leftContent flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <PlaylistPageStyles>
            <div className={`playlist-page w-contentWidth min-h-0 text-white bg-bgHomePage ml-leftContent pb-nowPlayingHeight isolate`}>
                <MetaDataBgImg
                    img={metadataPlaylistPage.images ? metadataPlaylistPage.images[0][0].url : null}
                    type={metadataPlaylistPage.type}
                    name={metadataPlaylistPage.name}
                    description={metadataPlaylistPage.description}
                    followerCount={metadataPlaylistPage.followerCount}
                    trackCount={metadataPlaylistPage.trackCount}
                />
                <div className='px-8 pt-6 pb-12 w-full flex items-center bg-[rgba(16,16,16,0.3)] absolute top-minHeightBgPlaylist'>
                    {(isPlaying && listTrackId.find(item => item === currentTrackId)) ? (
                        <ButtonPauseLarge onClick={handleClickPauseBtn} className='mr-8 w-14 h-14 hover:scale-105' />

                    ) : (
                        <ButtonPlayLarge onClick={handleClickPlayBtn} className='mr-8 w-14 h-14 hover:scale-105' />
                    )}

                    <span className='text-[hsla(0,0%,100%,.7)] mr-6 hover:text-white'>
                        <HeartIcon />
                    </span>

                    <span className='text-[hsla(0,0%,100%,.7)] hover:text-white text-3xl'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
                <div className='heading-list mb-4 h-9 px-8 bg-black z-[999]'>
                    <div className='row px-4 text-textColor text-xs items-center h-full'>
                        <div className='col'>#</div>
                        <div className='col'>TITLE</div>
                        <div className='col'>ALBUM</div>
                        <div className='col text-center'>DATE ADDED</div>
                        <div className='col flex justify-center text-base'>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </div>
                </div>
                <TrackList />
                <div className='w-full h-8 mx-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
            </div>
        </PlaylistPageStyles>
    );
}

const PlaylistPageStyles = styled.div`
    .row{
        width: 100%;
        display: grid;
        grid-template-columns: 5% 40% 20% 20% 15% ;
    }
    .col{
        padding: 0 8px;
    }
    .heading-list{
        border-bottom: 1px solid hsla(0,0%,100%,.2);
        position: -webkit-sticky;
        position: sticky;
        top: var(--header-height);
    }
`

export default Playlist;