import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from "../../component/Icon";
import { updateKeySearch, searchByName, } from '../../feature/SearchSlice';
function FormSearch() {
    const keySearch = useSelector(state => state.searchPage.keySearch)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChangeKeySearch = (e) => {
        if (e.target.value.trim()) {
            dispatch(updateKeySearch(e.target.value))
        } 
        else {
            navigate('/search')
            dispatch(updateKeySearch(''))
        }
    }
    return (
        <form className="text-textColor flex flex-1 py-2 pr-12 pl-3 bg-white rounded-3xl relative">
            <div className="mr-2 h-full">
                <SearchIcon />
            </div>
            <input
                className="text-sm font-normal text-black w-full outline-none"
                placeholder="What do you want to listen to ?"
                maxLength='800'
                value={keySearch}
                onChange={handleChangeKeySearch}
            />
            <div className='absolute h-full right-4 px-2 top-0 text-black text-[1.5rem]'>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </form>
    );
}

export default FormSearch;