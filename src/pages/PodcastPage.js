import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MetaDataNoBgImg from "../modules/over-view-section/MetaDataNoBgImg";
import EpisodeItem from "../component/EpisodeItem";
import HeadingSearch from '../modules/search/HeadingSearch'
import { fetchMetaDataPodcast, fetchListPodcastEpisodes } from "../feature/PodcastSlice";
import Loading from "../component/Loading";
import { changeBgHeader } from "../feature/PlaylistSlice";
function PodcastPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { metaDataPodcast, listPodcastEpisodes, loading, loadingListPodcastEpisodes } = useSelector(state => state.podcastPage)
    useEffect(() => {
        dispatch(fetchMetaDataPodcast(id))
        dispatch(fetchListPodcastEpisodes(id))
    }, [])

    useEffect(() => {
        const handelScroll = () => {
            if (window.scrollY > 450) {
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
    if (loading || loadingListPodcastEpisodes) {
        return (
            <div className="playlist-page w-contentWidth min-h-screen bg-bgHomePage  ml-leftContent flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <div className="w-contentWidth min-h-0 text-white bg-bgHomePage ml-leftContent pb-nowPlayingHeight flex flex-col isolate">
            <MetaDataNoBgImg
                type={'PODCAST'}
                name={metaDataPodcast.name}
                singer={metaDataPodcast.publisherName}
                imgAlbum={metaDataPodcast.cover[1].url}
                isPodcast={true}
                className='bg-[#507040]'
            >
                <div className='px-8 pt-6 pb-12 w-full flex items-center bg-[rgba(16,16,16,0.3)] absolute top-minHeightBgPlaylist'>
                    <button className='text-white text-xs font-bold px-[15px] py-[7px] border border-white rounded mr-4'>
                        FOLLOW
                    </button>
                    <span className='text-[hsla(0,0%,100%,.7)] hover:text-white text-3xl'>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
            </MetaDataNoBgImg >
            <HeadingSearch title={'All Episode'} className='mt-4 px-6' />
            <div className="px-8">
                {listPodcastEpisodes.map((item, index) => (
                    <EpisodeItem src={item.cover[1].url} title={item.name} description={item.description} date={item.date.slice(0,10)} time={item.durationText} key={index} />
                ))}
            </div>
            <div className='w-full h-8 mx-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
        </div >
    );
}

export default PodcastPage;