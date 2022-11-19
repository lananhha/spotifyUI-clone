import { createStructuredSelector } from 'reselect'
import { useSelector } from 'react-redux';

import * as reselect from '../../../reselect/reselectSearchPage'
import CardSongSearch from "../CardSongSearch";
import userImg from '../../../assets/images/user_img.jpg'
import Loading from '../../../component/Loading';

function UserResultSearch() {
    const { resultProfile } = useSelector(createStructuredSelector({
        resultProfile: reselect.resultProfile
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
            {resultProfile.items.map((item, index) => (
                <CardSongSearch id={item.id} src={item.avatar ? item.avatar[1].url : userImg} type='profile' description='profile' name={item.name} key={index} />
            ))}
        </div>
    );
}

export default UserResultSearch;