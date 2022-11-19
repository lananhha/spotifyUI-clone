import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import CardSongSearch from "../CardSongSearch";
import img from '../../../assets/images/card_img.jpg'
import Loading from '../../../component/Loading';

function AlbumResultSearch() {
    const { resultAlbum } = useSelector(createStructuredSelector({
        resultAlbum: reselect.resultAlbum
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
            {resultAlbum.items.map((item, index) => (
                <CardSongSearch id={item.id} src={item.cover[0].url} name={item.name} type='album' description={item.artists[0].name} time={item.date} key={index} />
            ))}
        </div>
    );
}

export default AlbumResultSearch;