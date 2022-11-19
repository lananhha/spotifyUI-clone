import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import CardSongSearch from "../CardSongSearch";
import Loading from '../../../component/Loading';

function ArtistResultSearch() {
    const { resultArtist } = useSelector(createStructuredSelector({
        resultArtist: reselect.resultArtist
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
    if(!keySearch.trim()){
        return null
    }
    return (
        <div className="w-full grid grid-cols-4 gap-6 mt-mtResultSearch">
            {resultArtist.items.map((item, index) => (
                <CardSongSearch id={item.id} src={item.visuals.avatar[0].url} name={item.name} type='artist' key={index} description='artist' />
            ))}
        </div>
    );
}

export default ArtistResultSearch;