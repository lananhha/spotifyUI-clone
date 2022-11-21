import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MetaDataNoBgImg from "../modules/over-view-section/MetaDataNoBgImg";
import { ButtonPauseLarge, ButtonPlayLarge } from "../modules/card-song/ButtonLarge";
import { HeartIcon } from "../component/Icon";
import TrackItem from '../modules/playlist/TrackItem'
import Loading from '../component/Loading'
import { fetchMetaDataAlbumPage, fetchListTrackAlbum } from "../feature/AlbumPageSlice";
import { changeBgHeader } from "../feature/PlaylistSlice";
import { updateCurrentIndexSong, updateCurrentTrackId, clickPauseButton, clickPlayButton, updateCurrentPlaylistPlaying, addCurrentPageId } from "../feature/CurrentSlice";
function AlbumPage() {
    const isPlaying = useSelector(state => state.currentState.isPlaying)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const currentPageId = useSelector(state => state.currentState.currentPageId)
    const { metaDataAlbumPage, listTrackAlbum, loading, loadingTrack } = useSelector(state => state.albumPage)
    const dispatch = useDispatch()
    const { id } = useParams()

    let listIdTrackAlbum
    if(listIdTrackAlbum) {
        listIdTrackAlbum = listIdTrackAlbum.map(item => item.id)
    }

    useEffect(() => {
        dispatch(fetchMetaDataAlbumPage(id))
        dispatch(fetchListTrackAlbum(id))
    }, [])

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

    const handleClickPlayBtn = () => {
        if (currentTrackId && listIdTrackAlbum.find(item => item === currentTrackId)) {
            dispatch(clickPlayButton())
            return
        }

        if(currentPageId && id !== currentPageId) {
            dispatch(addCurrentPageId(id))
        }else{
            dispatch(addCurrentPageId(id))
        }

        dispatch(clickPlayButton())
        const firstTrack = listTrackAlbum[0].id
        dispatch(updateCurrentTrackId(firstTrack))
        dispatch(updateCurrentPlaylistPlaying(listTrackAlbum))
        dispatch(updateCurrentIndexSong(0))
    }

    const handleClickPauseBtn = () => {
        dispatch(clickPauseButton())
    }

    // const dataTrack = {
    //     name: "Experience",
    //     durationText: "05:15",
    //     id: "1BncfTJAWxrsxyT9culBrj",
    //     addedAt: "2021-03-01T18:23:20Z",
    //     album: {
    //         cover: [
    //             0,
    //             { url: "https://i.scdn.co/image/ab67616d00001e026c8ef0538e04f2e28380dcc5" },
    //         ],
    //         artists: [{ name: "Ludovico Einaudi" }],
    //         name: "In A Time Lapse"
    //     }
    // }

    if (loading || loadingTrack) {
        return (
            <div className="playlist-page w-contentWidth min-h-screen bg-bgHomePage  ml-leftContent flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <AlbumPageStyles>
            <div className="w-contentWidth min-h-0 text-white bg-bgHomePage ml-leftContent pb-nowPlayingHeight flex flex-col isolate">
                <MetaDataNoBgImg
                    name={metaDataAlbumPage.name}
                    imgAlbum={metaDataAlbumPage.cover[0].url}
                    imgSinger={metaDataAlbumPage.cover[1].url}
                    singer={metaDataAlbumPage.artists[0].name}
                    year={metaDataAlbumPage.date.slice(0,4)}
                    songAmount={listTrackAlbum.length}
                    type={listTrackAlbum.length > 1 ? 'album' : 'single'}
                    >
                    <div className='px-8 pt-6 pb-6 w-full flex items-center bg-[rgba(16,16,16,0.3)] absolute bottom-0'>
                        {isPlaying ? (
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
                </MetaDataNoBgImg>
                <div className='heading-list mb-4 h-9 px-8 bg-black z-[999]'>
                    <div className='row px-4 text-textColor text-xs items-center h-full'>
                        <div className='col'>#</div>
                        <div className='col'>TITLE</div>
                        <div className='col flex justify-center text-base'>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </div>
                </div>
                <div className="px-8">
                    {listTrackAlbum.map((item, index) => (
                        <TrackItem dataTrack={item} showImg={false} showAddDay={false} showAlbum={false} serial={index + 1} key={index} />
                    ))}
                </div>
                <div className="mt-8 px-8">
                    {metaDataAlbumPage.copyright.map((item, index) => (
                        <p className="text-[0.6875rem] font-normal text-textColor" key={index}>{item.text}</p>
                    ))}
                </div>
                <div className='w-full h-8 mx-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
            </div>
        </AlbumPageStyles>
    );
}
const AlbumPageStyles = styled.div`
.row{
    width: 100%;
    display: grid;
    grid-template-columns: 5% auto 15% ;
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
export default AlbumPage;