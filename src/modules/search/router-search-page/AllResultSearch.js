import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createStructuredSelector } from 'reselect'
import { useParams } from "react-router-dom";

import TopResult from "../TopResult";
import SongSection from "../song-section/SongSection";
import HeadingSearch from "../HeadingSearch";
import CardSongSearch from "../CardSongSearch";
import img from '../../../assets/images/card_img.jpg'
import genresImg from '../../../assets/images/genres_img.jpg'
import userImg from '../../../assets/images/user_img.jpg'
import * as reselect from '../../../reselect/reselectSearchPage'
import Loading from "../../../component/Loading";

function AllResultSearch() {
    const isSearch = useSelector(state => state.searchPage.isSearch)
    const keySearch = useSelector(state => state.searchPage.keySearch)
    const { key } = useParams()
    const { resultArtist,
        resultAlbum,
        resultPlaylist,
        resultPodcast,
        resultEpisode,
        resultGenres,
        resultProfile,
        resultSong } = useSelector(createStructuredSelector({
            resultArtist: reselect.resultArtist,
            resultAlbum: reselect.resultAlbum,
            resultAlbum: reselect.resultAlbum,
            resultPlaylist: reselect.resultPlaylist,
            resultPodcast: reselect.resultPodcast,
            resultEpisode: reselect.resultEpisode,
            resultGenres: reselect.resultGenres,
            resultProfile: reselect.resultProfile,
            resultSong: reselect.resultSong,
        }))


    if (!keySearch.trim()) {
        return null
    }

    if (isSearch) {
        return (
            <div className="w-full h-[65vh] flex justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-8 mt-mtResultSearch'>
            <section className='grid grid-rows-1 grid-cols-2 gap-6'>
                <TopResult data={resultArtist.items[0]} />
                <SongSection data={resultSong.items.slice(0, 4)} />
            </section>
            <section>
                <HeadingSearch title='Artists' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultArtist.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.visuals.avatar[0].url} name={item.name} type='artist' key={index} description='artist' />
                    ))}
                </div>
            </section>
            <section>
                <HeadingSearch title='Albums' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultAlbum.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.cover[0].url} name={item.name} type='album' description={item.artists[0].name} time={item.date} key={index} />
                    ))}
                </div>
            </section>
            <section>
                <HeadingSearch title='Playlists' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultPlaylist.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.images ? item.images[0][0].url : img} type='playlist' name={item.name} description={item.description} key={index} />
                    ))}
                </div>
            </section>
            <section>
                <HeadingSearch title='Podcasts' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultPodcast.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.cover[1].url} name={item.name} type='podcast' description={item.publisherName} key={index} />
                    ))}
                </div>
            </section>
            <section>
                <HeadingSearch title='Episodes' />
                <div className='grid grid-cols-4 gap-6'>
                    {
                        resultEpisode.items.slice(0, 4).map((item, index) => (
                            <CardSongSearch
                                id={item.id}
                                src={item.cover[2].url}
                                type='episode'
                                name={item.name}
                                day={item.date.slice(0, 10)}
                                time={Math.floor(item.durationMs / (1000 * 60)) + '   ' + 'Min'}
                                imgSmall={item.cover[0].url}
                                key={index}
                            />
                        ))
                    }
                </div>
            </section>
            <section>
                <HeadingSearch title='Profiles' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultProfile.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.avatar ? item.avatar[1].url : userImg} type='profile' description='profile' name={item.name} key={index} />
                    ))}
                </div>
            </section>
            <section>
                <HeadingSearch title='Genres & Moods' />
                <div className='grid grid-cols-4 gap-6'>
                    {resultProfile.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.image ? item.image[0].url : genresImg} type='genres' name={item.name} key={index} />
                    ))}
                </div>
            </section>
            <div className='w-full h-8 bg-black border-solid border-b border-[hsla(0,0%,100%,.2)]'></div>
        </div>
    );
}

export default AllResultSearch;