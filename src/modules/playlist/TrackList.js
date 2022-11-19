import { useEffect,} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';


import TrackItem from "./TrackItem";
import { fetchTrackListData } from '../../feature/PlaylistSlice';
function TrackList() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {trackList} = useSelector(state => state.playlistPage);

    useEffect(() => {
        const actionTrackList = fetchTrackListData(id)
        dispatch(actionTrackList)
    }, [])

    return (
        <div className='px-8'>
            {trackList.map((track, index) => (
                <TrackItem dataTrack={track} key={index} serial={index + 1} />
            ))}
        </div>
    );
}

export default TrackList;