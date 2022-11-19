import { Outlet, } from 'react-router-dom';
import { useSelector,useDispatch} from "react-redux";
import { useEffect } from 'react';

import NavSearch from '../modules/search/NavSearch'
import useDebounce from '../hooks/useDebouce';
import { searchByName } from '../feature/SearchSlice';
function SearchPage() {
    const keySearch = useSelector(state => state.searchPage.keySearch)
    const dispatch = useDispatch()
    const debounce = useDebounce(keySearch, 800)
    useEffect(() => {
        if(debounce.trim()) {
            dispatch(searchByName(debounce))
        }
    }, [debounce])
    return (
        <div className="flex flex-col gap-4 text-white w-contentWidth min-h-0 ml-leftContent pt-mtHeader px-8 bg-bgHomePage pb-nowPlayingHeight isolate">
            {keySearch && <NavSearch />}
            <Outlet></Outlet>
        </div>
    );
}

export default SearchPage;