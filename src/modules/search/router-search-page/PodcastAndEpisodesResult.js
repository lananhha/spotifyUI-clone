import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import Loading from '../../../component/Loading';

import EpisodeItem from "../../../component/EpisodeItem";
import Heading from '../../../component/Heading'
import CardSongSearch from "../CardSongSearch";
function PodcastAndEpisodesResult() {
    const { resultPodcast, resultEpisode } = useSelector(createStructuredSelector({
        resultPodcast: reselect.resultPodcast,
        resultEpisode: reselect.resultEpisode
    }))
    const isSearch = useSelector(state => state.searchPage.isSearch)
    const keySearch = useSelector(state => state.searchPage.keySearch)
    if (isSearch && keySearch.trim()) {
        return (
            <div className="w-full h-[65vh] flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    if (!keySearch.trim()) {
        return null
    }
    return (
        <div className='mt-mtResultSearch'>
            <div className="mb-8">
                <Heading title='Podcasts&Shows' />
                <div className='grid grid-cols-4 gap-4'>
                    {resultPodcast.items.slice(0, 4).map((item, index) => (
                        <CardSongSearch id={item.id} src={item.cover[1].url} name={item.name} type='podcast' description={item.publisherName} key={index} />
                    ))}
                </div>
            </div>
            <div>
                <Heading title='Episodes' />
                {resultEpisode.items.map((item, index) => (
                    <EpisodeItem id={item.id} src={item.cover[1].url} title={item.name} description={item.description} date={item.date.slice(0,10)} time={item.durationText} key={index} />
                ))}
            </div>
        </div>
    );
}

export default PodcastAndEpisodesResult;