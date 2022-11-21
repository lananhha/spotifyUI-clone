import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from 'reselect'

import TrackItem from "../modules/playlist/TrackItem";
import MetaDataBgImg from "../modules/over-view-section/MetaDataBgImg";
import { fetchOverviewArtist, } from "../feature/ArtistPageSlice";
import Loading from '../component/Loading';
import HeadingSearch from '../modules/search/HeadingSearch'
import * as reselect from '../reselect/reselectArtistPage'
import { changeBgHeader } from "../feature/PlaylistSlice";
import { ButtonPauseLarge, ButtonPlayLarge } from "../modules/card-song/ButtonLarge";
import { clickPauseButton, clickPlayButton, updateCurrentIndexSong, updateCurrentTrackId, updateCurrentPlaylistPlaying, addCurrentPageId } from "../feature/CurrentSlice";
function ArtistPage() {
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const currentPageId = useSelector(state => state.currentState.currentPageId)
    const { metaDataArtistPage, loading } = useSelector(state => state.artistPage)
    const { discographyArtistPage } = useSelector(createStructuredSelector({
        discographyArtistPage: reselect.discographyArtistPage
    }))
    const isPlaying = useSelector(state => state.currentState.isPlaying)
    const dispatch = useDispatch()
    const { id } = useParams()

    let listPopularTrack, listPopularTrackId
    if(discographyArtistPage) {
        listPopularTrack = discographyArtistPage.topTracks
        listPopularTrackId = listPopularTrack.map(item => item.id)
    }
    
    useEffect(() => {
        dispatch(fetchOverviewArtist(id))
    }, [])

    const handleClickPlayBtn = () => {
        if (currentTrackId && listPopularTrackId.find(item => item === currentTrackId)) {
            dispatch(clickPlayButton())
            return
        } 
        if(currentPageId && id !== currentPageId) {
            dispatch(addCurrentPageId(id))
        }else{
            dispatch(addCurrentPageId(id))
        }
        dispatch(clickPlayButton())
        const firstTrack = listPopularTrack[0].id
        dispatch(updateCurrentTrackId(firstTrack))
        dispatch(updateCurrentPlaylistPlaying(listPopularTrack))
        dispatch(updateCurrentIndexSong(0))
    }

    const handleClickPauseBtn = () => {
        dispatch(clickPauseButton())
    }

    useEffect(() => {
        const handelScroll = () => {
            if (window.scrollY >= 450) {
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

    if (loading) {
        return (
            <div className="playlist-page w-contentWidth min-h-screen bg-bgHomePage ml-leftContent flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <ArtistPageStyles>
            <div className={`playlist-page w-contentWidth min-h-0 text-white bg-bgHomePage ml-leftContent pb-nowPlayingHeight isolate`}>
                <MetaDataBgImg
                    img={metaDataArtistPage.visuals.avatar[0].url}
                    type={metaDataArtistPage.type}
                    name={metaDataArtistPage.name}
                    verified={metaDataArtistPage.verified}
                />
                <div className='px-8 pt-6 pb-12 w-full flex items-center bg-[rgba(16,16,16,0.3)] absolute top-minHeightBgPlaylist'>
                    {(isPlaying && listPopularTrackId.find(item => item === currentTrackId)) ? (
                        <ButtonPauseLarge onClick={handleClickPauseBtn} className='mr-8 w-14 h-14 hover:scale-105' />

                    ) : (
                        <ButtonPlayLarge onClick={handleClickPlayBtn} className='mr-8 w-14 h-14 hover:scale-105' />
                    )}
                    <button className='text-white text-xs font-bold px-[15px] py-[7px] border border-white rounded mr-4'>
                        FOLLOW
                    </button>
                    <span className='text-[hsla(0,0%,100%,.7)] hover:text-white text-3xl'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
                <HeadingSearch title={'Popular'} className='py-4 px-8' />
                <div className="px-8">
                    {discographyArtistPage.topTracks.map((item, index) => (
                        <TrackItem dataTrack={item} showArtistName={false} showAddDay={false} showAlbum={false} serial={index + 1} key={index} />
                    ))}

                </div>
                <div className='w-full h-8 mx-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
            </div>
        </ArtistPageStyles>
    );
}
const ArtistPageStyles = styled.div`

`
export default ArtistPage;