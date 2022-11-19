import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-regular-svg-icons'
import styled from "styled-components";
import { useSelector } from "react-redux";
import { createStructuredSelector } from 'reselect'
import { useCallback, useRef } from "react";

import TrackItem from "../../playlist/TrackItem";
import * as reselect from '../../../reselect/reselectSearchPage'
import Loading from "../../../component/Loading";
function SongResultSearch() {
    const { resultSong } = useSelector(createStructuredSelector({
        resultSong: reselect.resultSong
    }))

    const isSearch = useSelector(state => state.searchPage.isSearch)

    if (isSearch) {
        return (
            <div className="w-full h-[65vh] flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    return (
        <SongResultSearchStyles>
            <div className="mt-mtResultSearch">
                <div className='heading-list flex mb-4 h-9 bg-bgHomePage'>
                    <div className='row text-textColor text-xs items-center h-full'>
                        <div className='col text-center'>#</div>
                        <div className='col ml-3'>TITLE</div>
                        <div className='col'>ALBUM</div>
                        <div className='col flex justify-center text-base'>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit">
                    {resultSong.items.map((track, index) => {
                        return (<TrackItem showAddDay={false} key={index} dataTrack={track} serial={index + 1} />)
                    })}
                </div>
            </div>
        </SongResultSearchStyles>
    );
}
const SongResultSearchStyles = styled.div`
.row{
    width: 100%;
    display: grid;
    grid-template-columns: 5% auto 25% 15% ;
}
.col{
    padding: 0 8px;
}

.heading-list{
    border-bottom: 1px solid hsla(0,0%,100%,.2);
    position: -webkit-sticky;
    position: sticky;
    top: calc(var(--header-height) + 70px);
}

`
export default SongResultSearch;