import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams} from "react-router-dom";
import { createStructuredSelector } from 'reselect'

import * as reselect from '../../reselect/reselectArtistPage'
import * as reselectSearch from "../../reselect/reselectSearchPage";
import { clickPlayButton, clickPauseButton, updateCurrentTrackId, updateListSongPlayed, updateCurrentPlaylistPlaying, updateCurrentIndexSong, addCurrentPageId } from "../../feature/CurrentSlice";
function TrackItem({ dataTrack, serial, showAddDay = true, showAlbum = true, showImg = true, showArtistName = true }) {
    const dispatch = useDispatch()
    const location = useLocation()
    const {id} = useParams()
    const { discographyArtistPage } = useSelector(createStructuredSelector({
        discographyArtistPage: reselect.discographyArtistPage
    }))
    const { resultSong } = useSelector(createStructuredSelector({
        resultSong: reselectSearch.resultSong
    }))
    const { trackList } = useSelector(state => state.playlistPage);
    const listTrackAlbum = useSelector(state => state.albumPage.listTrackAlbum)
    const currentTrackId = useSelector((state) => state.currentState.currentTrackId)
    const isPlaying = useSelector(state => state.currentState.isPlaying)
    const currentPageId = useSelector(state => state.currentState.currentPageId)

    const handleClickPlayButton = () => {
        // updateCurrentPlaylistPlaying
        if (location.pathname.includes('playlist')) {
            dispatch(updateCurrentPlaylistPlaying(trackList))
        }
        if (location.pathname.includes('artist')) {
            dispatch(updateCurrentPlaylistPlaying(discographyArtistPage.topTracks))
        }
        if (location.pathname.includes('album')) {
            dispatch(updateCurrentPlaylistPlaying(listTrackAlbum))
        }
        if (location.pathname.includes('search/song')) {
            dispatch(updateCurrentPlaylistPlaying(resultSong.items))
        }

        //addCurrentPageId
        if(currentPageId && id !== currentPageId) {
            dispatch(addCurrentPageId(id))
        }else{
            dispatch(addCurrentPageId(id))
        }

        // updateCurrentIndexSong
        dispatch(updateCurrentIndexSong(serial - 1))

        // updateCurrentTrackId
        if (dataTrack.id !== currentTrackId) {
            dispatch(updateCurrentTrackId(dataTrack.id))
        }
        //update isPlaying
        const actionClick = clickPlayButton()
        dispatch(actionClick)
    }

    const handleClickPauseButton = () => {
        const action = clickPauseButton()
        dispatch(action)
    }
    return (
        <TrackItemStyles>
            <div className={`${showAddDay && 'col-5'} ${!showAddDay && 'col-4'} ${!showAlbum && 'col-3'} track-item px-4 text-textColor text-sm items-center h-14 rounded cursor-pointer`}>
                <div className='col w-[14px] h-[14px]'>
                    {isPlaying && currentTrackId === dataTrack.id ? (
                        <img className="w-[14px] h-full max-w-[14px] serial" src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" />
                    ) : (
                        <span className={currentTrackId === dataTrack.id ? 'serial text-base text-primary' : 'serial text-base'}>{serial}</span>
                    )}
                    <span className='play-icon text-white hidden '>
                        {isPlaying && currentTrackId === dataTrack.id ? (
                            <span onClick={handleClickPauseButton}>
                                <FontAwesomeIcon icon={faPause} />
                            </span>
                        ) : (
                            <span onClick={handleClickPlayButton}>
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        )}
                    </span>
                </div>
                <div className='col flex justify-start items-center'>
                    {showImg &&
                        <div className='h-10 w-10 object-cover mr-4'>
                            <img src={dataTrack.album.cover[1].url} />
                        </div>
                    }
                    <div className='track-info flex flex-col'>
                        <span
                            className={currentTrackId === dataTrack.id ? 'track-name text-base text-primary cursor-pointer' : 'track-name text-base text-white cursor-pointer'}
                        >
                            {dataTrack.name}
                        </span>
                        {showArtistName && <Link to={`/artist/${dataTrack.album?.artists ? dataTrack.album.artists[0].id : dataTrack.artists[0].id}`} className='artist-name title text-sm text-textColor cursor-pointer'>{dataTrack.album?.artists ? dataTrack.album.artists[0].name : dataTrack.artists[0].name}</Link>}
                    </div>
                </div>
                {showAlbum && <Link to={`/album/${dataTrack.album.id}`} className='album-name col title cursor-pointer'>{dataTrack.album.name}</Link>}
                {showAddDay && <div className='col text-center'>{dataTrack.addedAt.slice(0, 10)}</div>}
                <div className='col flex justify-between items-center'>
                    <span className="heart-icon text-textColor hover:text-white hidden text-base">
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <span className="flex-1 text-center">{dataTrack.durationText}</span>
                    <span className="ellipsis-icon text-textColor hidden text-base">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
            </div>
        </TrackItemStyles>
    );
}

const TrackItemStyles = styled.div`
    .col-5{
        width: 100%;
        display: grid;
        grid-template-columns: 5% 40% 20% 20% 15% ;
    }

    .col-4{
        width: 100%;
        display: grid;
        grid-template-columns: 5% auto 25% 15% ;
    }

    .col-3{
        width: 100%;
        display: grid;
        grid-template-columns: 5% auto 15% ;
    }
    .col{
        padding: 0 8px;
    }
    .track-item:hover{
        background-color: hsla(0,0%,100%,.1);
    }
    .track-item:hover .serial{
        display: none
    }
    .track-item:hover .play-icon{
        display: inline-block
    }
    .track-item:hover .title{
        color: rgb(255,255,255);
    }
    .track-item:hover .ellipsis-icon{
        color: rgb(255,255,255);
    }
    .track-item:hover .heart-icon{
        display: inline-flex
    }
    .track-item:hover .ellipsis-icon{
        display: inline-flex
    }
    .title:hover{
        text-decoration: underline
    }
    .track-name{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .artist-name{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .album-name{
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: keep-all ;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .icon-now-playing{
        background-image: url('https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif');
    }
`

export default TrackItem;
