import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { PictureInPictureIcon } from "../../component/Icon";
import { fetchTrackSound } from "../../feature/CurrentSlice";
function NowPlayingLeft() {
    const trackId = useSelector((state) => state.currentState.currentTrackId)
    const currentTrackSoundInfo = useSelector (state => state.currentState.currentTrackSoundInfo)
    const loadingSound = useSelector(state => state.currentState.loadingSound)
    const dispatch = useDispatch()

     useEffect(() => {
        const action = fetchTrackSound(trackId)
        dispatch(action)
    }, [trackId])

    if(loadingSound) {
        return
    }
    const metaDataTrackPlaying = currentTrackSoundInfo.spotifyTrack
    return (
        <NowPlayingLeftStyles>
            <div className="w-full flex items-center">
                <div>
                    <img className="object-cover w-14 h-14 " src={metaDataTrackPlaying.album.cover[2].url} />
                </div>
                <div className="mx-4">
                    <h4 className="text-sm font-normal text-white hover:underline cursor-pointer">
                        <Link className="track-name" to='/'>{metaDataTrackPlaying.name}</Link>
                    </h4>
                    <span className="text-xs font-normal text-textColor hover:underline cursor-pointer">
                        <Link>{metaDataTrackPlaying.artists[0].name}</Link>
                    </span>
                </div>
                <button className="icon-now-playing flex justify-center items-center">
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="icon-now-playing flex justify-center items-center">
                    <PictureInPictureIcon />
                </button>
            </div>
        </NowPlayingLeftStyles>
    );
}

const NowPlayingLeftStyles = styled.div`
.icon-now-playing{
    color:#ffffffb3;
    width: 32px;
    height: 32px
}
.icon-now-playing:hover{
    color:#ffffff;
}
.track-name{
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    white-space: unset;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
`
export default memo(NowPlayingLeft);