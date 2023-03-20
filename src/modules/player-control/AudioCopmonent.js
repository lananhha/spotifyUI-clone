import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from 'react-player'
import { useEffect, useRef, memo } from "react";
import styled from "styled-components";


import { setCurrentTime, updateCurrentTrackId, updateListSongPlayed, updateCurrentIndexSong } from "../../feature/CurrentSlice";
function AudioComponent() {
    const isPlaying = useSelector((state) => state.currentState.isPlaying)
    const currentTime = useSelector(state => state.currentState.currentTime)
    const currentTrackSoundInfo = useSelector(state => state.currentState.currentTrackSoundInfo)
    const loadingSound = useSelector(state => state.currentState.loadingSound)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const isRandom = useSelector(state => state.currentState.isRandom)
    const isRepeat = useSelector(state => state.currentState.isRepeat)
    const listSongPlayed = useSelector(state => state.currentState.listSongPlayed)
    const currentPlaylistPlaying = useSelector(state => state.currentState.currentPlaylistPlaying)
    const currentVolume = useSelector(state => state.currentState.currentVolume)
    const isMute = useSelector(state => state.currentState.isMute)
    const dispatch = useDispatch()
    const currentListTrackId = currentPlaylistPlaying.map((item) => item.id )
    const progressRef = useRef()
    const audioRef = useRef()
    useEffect(() => {
        if (currentTrackSoundInfo.hasOwnProperty('soundcloudTrack')) {
            const duration = currentTrackSoundInfo.soundcloudTrack.audio[0].durationMs
            progressRef.current.style.width = (currentTime * 1000 / duration) * 100 + '%'
        }
    }, [currentTime])


    if (loadingSound) {
        return
    }

    const handleProgress = ({ loadedSeconds, playedSeconds }) => {
        const action = setCurrentTime(playedSeconds)
        dispatch(action)
    }

    const handelTrackEnd = () => {
        
        if(isRandom) {
            const randomIndex = Math.trunc(Math.random() * currentListTrackId.length )
            if(currentListTrackId[randomIndex] !== currentTrackId) {
                dispatch(updateCurrentTrackId(currentListTrackId[randomIndex]))
                dispatch(updateCurrentIndexSong(randomIndex))
                return
            }
        }

        const currentTrackIndex = currentListTrackId.indexOf(currentTrackId, 0);
        dispatch(updateCurrentTrackId(currentListTrackId[currentTrackIndex + 1]))
        dispatch(updateCurrentIndexSong(currentTrackIndex + 1))
    }


    const handleClickProgress = (e) => {
        const duration = currentTrackSoundInfo.soundcloudTrack.audio[0].durationMs
        const newCurrentTime = (e.nativeEvent.layerX / e.target.clientWidth) * duration /1000
        audioRef.current.seekTo(newCurrentTime)
        dispatch(setCurrentTime(newCurrentTime))
    }

    
    return (
        <AudioComponentStyles>
            <div>
                <div onClick={handleClickProgress} className=' progress-wrap w-full h-2 bg-transparent absolute top-[2px] left-0 rounded-sm'>
                    <div ref={progressRef} className='progress max-w-full h-1 bg-white absolute top-0 left-0 rounded-sm z-10 '>
                        <div className="slider-thumb"></div>
                    </div>
                </div>
                <ReactPlayer
                    ref={audioRef}
                    width={0}
                    height={0}
                    config={{ file: { forceAudio: true } }}
                    url={currentTrackSoundInfo.soundcloudTrack.audio[0].url}
                    playing={isPlaying}
                    loop = {isRepeat}
                    volume={currentVolume}
                    onProgress={handleProgress}
                    onEnded={handelTrackEnd}
                    // onError={(e) => console.log(e)}
                ></ReactPlayer>
                {/* <audio src={currentTrackSoundInfo.soundcloudTrack.audio[0].url} /> */}
            </div>
        </AudioComponentStyles>
    );
}

const AudioComponentStyles = styled.div`
   
        .slider-thumb{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
            background-color: #fff;
            cursor: pointer;
            position: absolute;
            right: -4px;
            bottom: -4px;
            display: none
        }

        .progress-wrap:hover .slider-thumb{
            display: block
        }

        .progress-wrap:hover .progress{
            background-color: #1db954
        }
`
export default memo(AudioComponent);