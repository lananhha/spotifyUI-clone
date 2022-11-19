import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import CardSongSearch from "../CardSongSearch";
import genresImg from '../../../assets/images/genres_img.jpg'
import Loading from '../../../component/Loading';

function GenresResultSearch() {
    const { resultGenres } = useSelector(createStructuredSelector({
        resultGenres: reselect.resultGenres
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
            {resultGenres.items.map((item, index) => (
                <CardSongSearch id={item.id} src={item.image ? item.image[0].url : genresImg} type='genres' name={item.name} key={index} />
            ))}
        </div>
    );
}

export default GenresResultSearch;