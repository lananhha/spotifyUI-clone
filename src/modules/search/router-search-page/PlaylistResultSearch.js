import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import CardSongSearch from "../CardSongSearch";
import img from '../../../assets/images/card_img.jpg'
import Loading from '../../../component/Loading';

function PlaylistResultSearch() {
    const { resultPlaylist } = useSelector(createStructuredSelector({
        resultPlaylist: reselect.resultPlaylist
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
        <div className="w-full grid grid-cols-4 gap-6 mt-mtResultSearch">
            {resultPlaylist.items.map((item, index) => (
                <CardSongSearch id={item.id} src={item.images ? item.images[0][0].url : img} type='playlist' name={item.name} description={item.description} key={index} />
            ))}
        </div>
    );
}

export default PlaylistResultSearch;
