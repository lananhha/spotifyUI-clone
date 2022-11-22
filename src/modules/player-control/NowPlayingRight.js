import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, memo } from 'react';
import { NavLink } from 'react-router-dom';

import { QueueIcon, ConnectToDeviceIcon, VolumeIcon, MicrophoneIcon } from '../../component/Icon'
import { updateVolume, clickMuteButton, getPrevVolume } from '../../feature/CurrentSlice';
function NowPlayingRight() {
    const dispatch = useDispatch()
    const currentVolume = useSelector(state => state.currentState.currentVolume)
    const prevVolume = useSelector(state => state.currentState.prevVolume)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    const currentVolumeRef = useRef()
    const isMute = useSelector(state => state.currentState.isMute)

    useEffect(() => {
        currentVolumeRef.current.style.width = currentVolume * 100  + '%'
    }, [currentVolume])

    useEffect(() => {
        dispatch(getPrevVolume(currentVolume))
        if(isMute){
            dispatch(updateVolume(0))
        }else{
            if(prevVolume === null) return
            dispatch(updateVolume(prevVolume))
        }
    }, [isMute])
    return (
        <NowPlayingRightStyles >
            <div className="w-full flex  justify-end items-center">
                <NavLink to={`/lyric`} className={({isActive}) => `w-8 h-8 flex justify-start items-center ${isActive ? 'text-primary' : 'text-[#ffffffb3]'}`}>
                    <MicrophoneIcon />
                </NavLink>
                <button className="icon-now-playing">
                    <QueueIcon />
                </button>
                <button className="icon-now-playing">
                    <ConnectToDeviceIcon />
                </button>
                <div className="volume-wrap flex items-center relative">
                    <button className="volume-icon text-textColor w-[20%]" onClick={() => {dispatch(clickMuteButton()) }}>
                        <VolumeIcon />
                    </button>
                    <input
                        className="progress flex-1 bg-red-500"
                        type='range'
                        step="0.05"
                        min="0"
                        max="1"
                        value={currentVolume}
                        onChange={(e) => {
                            dispatch(updateVolume(Number(e.target.value)))
                        }}
                    />
                    <div className='control-volume absolute bottom-[6px] left-[29px] rounded-sm w-[80%] h-1 -z-10'>
                        <div ref={currentVolumeRef} className={`current-volume absolute top-0 left-0 rounded-sm h-1 bg-white -z-10`}></div>
                    </div>
                </div>
            </div>
        </NowPlayingRightStyles>
    );
}

const NowPlayingRightStyles = styled.div`
.progress::-webkit-slider-thumb {
    -webkit-appearance : none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
    background-color: #fff;
    cursor: pointer;
    display: none
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

.progress:hover::-webkit-slider-thumb{
    display: block
}

.volume-icon:hover ~ .progress::-webkit-slider-thumb{
    display: block
}

.volume-icon:hover ~ .control-volume .current-volume{
    background-color: #1ed760;
}

.icon-now-playing{
    color:#ffffffb3;
    width: 32px;
    height: 32px
}
.icon-now-playing:hover{
    color:#ffffff;
}
`
export default memo(NowPlayingRight);