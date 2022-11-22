import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faBackwardStep, faForwardStep, faPause, faPlay, } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, memo } from "react";

import { RepeatIcon,} from '../../component/Icon'
import { clickPlayButton, clickPauseButton, clickRandomButton, clickRepeatButton, updateCurrentTrackId, updateCurrentIndexSong, } from "../../feature/CurrentSlice";
import NowPlayingLeft from "./NowPlayingLeft";
import NowPlayingRight from "./NowPlayingRight";
import AudioComponent from "./AudioCopmonent";
import formatTime from "../../utils/formatTime";
function NowPlayingBar() {
    const isPlaying = useSelector((state) => state.currentState.isPlaying)
    const currentTrackId = useSelector((state) => state.currentState.currentTrackId)
    const isRandom = useSelector(state => state.currentState.isRandom)
    const isRepeat = useSelector(state => state.currentState.isRepeat)
    const currentIndexSong = useSelector(state => state.currentState.currentIndexSong)
    const currentPlaylistPlaying = useSelector(state => state.currentState.currentPlaylistPlaying)
    const currentTime = useSelector(state => state.currentState.currentTime)
    const currentTrackSoundInfo = useSelector(state => state.currentState.currentTrackSoundInfo)
    const dispatch = useDispatch()

    const durationText = useMemo(() => {
        if (currentTrackSoundInfo.hasOwnProperty('soundcloudTrack')) {
            return currentTrackSoundInfo.soundcloudTrack.audio[0].durationText
        }
    }, [currentTrackSoundInfo])

    const handleClickPlay = () => {
        const actionClick = clickPlayButton()
        dispatch(actionClick)
    }

    const handleClickPause = () => {
        const actionClick = clickPauseButton()
        dispatch(actionClick)
    }

    const handleClickRandomBtn = () => {
        if (currentTrackId) {
            dispatch(clickRandomButton())
        }
    }

    const handleClickRepeatBtn = () => {
        if (currentTrackId) {
            dispatch(clickRepeatButton())
        }
    }

    const handleClickPrevBtn = () => {
        const currentListTrackId = currentPlaylistPlaying.map((item) => item.id)
        dispatch(updateCurrentTrackId(currentListTrackId[currentIndexSong - 1]))
        dispatch(updateCurrentIndexSong(currentIndexSong - 1))
    }

    const handleClickNextBtn = () => {
        const lengthPlaylist = currentPlaylistPlaying.length
        const currentListTrackId = currentPlaylistPlaying.map((item) => item.id)
        if (currentIndexSong === lengthPlaylist - 1) {
            dispatch(updateCurrentTrackId(currentListTrackId[0]))
            dispatch(updateCurrentIndexSong(0))
            return
        }
        const nextSongIndex = currentIndexSong + 1
        dispatch(updateCurrentTrackId(currentListTrackId[nextSongIndex]))
        dispatch(updateCurrentIndexSong(nextSongIndex))
    }

    return (
        <NowPlayingBarStyles>
            {currentTrackId ? (
                <div className="w-full h-nowPlayingHeight bg-black flex gap-4 items-center px-4 fixed bottom-0 z-50">
                    <div className="w-[30%] flex items-center">
                        {currentTrackId && <NowPlayingLeft />}
                    </div>
                    <div className="w-[40%] flex flex-col justify-center items-center">
                        <div className="grid grid-cols-5 gap-4 items-center text-white mb-2 text-[1.125rem]">
                            <button
                                onClick={handleClickRandomBtn}
                                className={isRandom ? ' text-primary' : 'icon-now-playing'}
                                disabled={isRepeat}
                            >
                                <FontAwesomeIcon icon={faShuffle} />
                            </button>
                            <button className={currentIndexSong === 0 ? 'cursor-not-allowed' : 'icon-now-playing'} disabled={currentIndexSong === 0} onClick={handleClickPrevBtn}>
                                <FontAwesomeIcon icon={faBackwardStep} />

                            </button>
                            {isPlaying ? (
                                <button
                                    className="w-8 h-8 rounded-full bg-white text-black flex justify-center items-center text-xl scale-100 hover:scale-110"
                                    onClick={handleClickPause}
                                >
                                    <FontAwesomeIcon icon={faPause} />
                                </button>
                            ) : (
                                <button
                                    className="w-8 h-8 rounded-full bg-white text-black flex justify-center items-center text-xl scale-100 hover:scale-110"
                                    onClick={handleClickPlay}
                                >
                                    <FontAwesomeIcon icon={faPlay} className='text-base' />
                                </button>
                            )}
                            <button className="icon-now-playing" onClick={handleClickNextBtn}>
                                <FontAwesomeIcon icon={faForwardStep} />
                            </button>
                            <button
                                className={isRepeat ? ' text-primary' : 'icon-now-playing'}
                                onClick={handleClickRepeatBtn}
                                disabled={isRandom}
                            >
                                <RepeatIcon />
                            </button>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-textColor text-xs font-normal mr-3">
                                {formatTime(currentTime)}
                            </span>
                            <div className="progress-wrap flex-1 h-2 flex items-center relative">
                                <input className="progress-none-active w-full" type='range' step="0.5" min="0" max="100" />
                                {currentTrackId && <AudioComponent />}
                            </div>
                            <span className="text-textColor text-xs font-normal ml-3">
                                {durationText}
                            </span>
                        </div>
                    </div>
                    <div className="w-[30%]">
                        <NowPlayingRight />
                    </div>

                </div>

            ) : (
                <div className="w-full h-nowPlayingHeight bg-black flex gap-4 items-center px-4 fixed bottom-0 z-50">
                    <div className="w-[30%] flex items-center">
                    </div>
                    <div className="w-[40%] flex flex-col justify-center items-center">
                        <div className="grid grid-cols-5 gap-4 items-center text-white mb-2 text-[1.125rem]">
                            <button className="text-white cursor-not-allowed">
                                <FontAwesomeIcon icon={faShuffle} />
                            </button>
                            <button className={'text-white cursor-not-allowed'} >
                                <FontAwesomeIcon icon={faBackwardStep} />
                            </button>
                            <button
                                className="w-8 h-8 cursor-not-allowed rounded-full bg-white text-black flex justify-center items-center text-xl"
                            >

                                <span>
                                    <FontAwesomeIcon icon={faPlay} className='text-base' />
                                </span>
                            </button>
                            <button className="text-white cursor-not-allowed">
                                <FontAwesomeIcon icon={faForwardStep} />
                            </button>
                            <button className="text-white cursor-not-allowed">
                                <RepeatIcon />
                            </button>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-textColor text-xs font-normal mr-3">
                            </span>
                            <div className="progress-wrap flex-1 h-2 flex items-center relative">
                                <input className="progress-none-active w-full" type='range' step="0.5" min="0" max="100" />
                            </div>
                            <span className="text-textColor text-xs font-normal ml-3">
                            </span>
                        </div>
                    </div>
                    <div className="w-[30%]">
                        <NowPlayingRight />
                    </div>
                </div>
            )}
        </NowPlayingBarStyles>
    );
}

const NowPlayingBarStyles = styled.div`
    .icon-now-playing{
        color:#ffffffb3;
        width: 32px;
        height: 32px
    }
    .icon-now-playing:hover{
        color:#ffffff;
    }
    .progress-none-active {
        width: 100%;
        -webkit-appearance: none;
        height: 4px;
        background-color: hsla(0,0%,100%,.3);
        outline: none;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
        border-radius: 2px
    }

    .progress{
        width: 100%;
        -webkit-appearance: none;
        height: 4px;
        background-color: hsla(0,0%,100%,.3);
        outline: none;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
        border-radius: 2px
    }

    .progress-none-active::-webkit-slider-thumb {
        display: none
    }

 

`
export default memo(NowPlayingBar);