import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom';
import { useState } from 'react'

import cardImg from '../../assets/images/card_img.jpg'
import { ButtonPlayLarge, ButtonPauseLarge } from './ButtonLarge';
import { addCurrentPlaylist } from '../../feature/CurrentSlice'
function CardSong({ playlistInfo }) {
    let dataImg = playlistInfo.images
    let srcImg = null
    if (dataImg) {
        srcImg = dataImg[0][0].url
    }

    const dispatch = useDispatch()
    const handleClick = () => {
        const action = addCurrentPlaylist(playlistInfo.id)
        dispatch(action)
    }

    return (
        <Link to={`/playlist/${playlistInfo.id}`}>
            <CardSongStyles>
                <div className='card-song w-full p-4 bg-[#181818] rounded-md cursor-pointer relative'>
                    <div className='w-full' onClick={handleClick}>
                        <div className='w-full mb-4 rounded-md'>
                            <img src={srcImg || cardImg} />
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='text-white text-base font-bold pb-1 truncate '>{playlistInfo.name}</h4>
                            <p className='playlist-desc text-textColor2 font-normal text-sm'>{playlistInfo.description}</p>
                        </div>
                    </div>
                    <div className='play-btn absolute right-6 bottom-32 rounded-full' ><ButtonPlayLarge /></div>
                </div>
            </CardSongStyles>
        </Link>
    );
}

const CardSongStyles = styled.div`
    .card-song{
        transition: background-color .3s ease
    }
    .card-song:hover{
        background-color: #282828;
    }
    .card-song:hover .play-btn{
        transform: translate3d(0px, 0px, 0px) ;
        transform: scale(1);
        background-color: #1ed760;
    }
    .playlist-desc{
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }
    .play-btn{
        transform: translate3d(0px, 60px, 0px) ;
        transform: scale(0);
        transition-property: background-color, transform;
        transition-duration: 300ms;
        transition-timing-function: ease;
    }
`

export default CardSong;