import styled from "styled-components";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { ButtonPlayLarge } from "../card-song/ButtonLarge";
import { addCurrentPlaylist } from "../../feature/CurrentSlice";
import { getArtistId } from "../../feature/ArtistPageSlice";
function CardSongSearch({ children, type, src, description, time, day, imgSmall, name, id}) {
    const dispatch = useDispatch()
    const handleClickCard = () => {
        // switch (type) {
        //     case 'playlist':
        //         dispatch(addCurrentPlaylist(id))
        //         break;
        //     case 'artist':
        //         dispatch(getArtistId(id))
        //         break
        //     case 'album' :
                
        //     default:
        //         break;
        // }
    }
    return (
        <Link to={`/${type}/${id}`}>
            <CardSongSearchStyles>
                <div onClick={handleClickCard} className='card-song p-4 w-full bg-[#181818] rounded-md cursor-pointer relative'>
                    <div className='w-full' >
                        <div className={`${type === 'artist' || type === 'profile' ? ' w-[193px] h-[193px] rounded-full mb-4 overflow-hidden' : 'w-[193px] h-[193px] mb-4 rounded-md overflow-hidden'}`}>
                            <img src={src} className='w-full h-full' />
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='name-playlist text-white text-base font-bold pb-1 mt-2 truncate '>{name}</h4>
                            {type !== 'album' && type !== 'episode' && type!=='genres' && <p className='playlist-desc w-full text-textColor2 font-normal text-sm'>{description}</p>}
                            {type === 'album' &&
                                <p className='playlist-desc text-textColor2 font-normal text-sm'>
                                    <span>{time}  • </span>
                                    <span className="hover:underline">{description}</span>
                                </p>
                            }
                            {type === 'episode' &&
                                <p className='playlist-desc text-textColor2 font-normal text-xs'>
                                    <span>{day} · </span>
                                    <span>{time}</span>
                                </p>
                            }
                        </div>
                    </div>
                    {(type === 'playlist' || type === 'album' || type === 'artist') && <div className='play-btn absolute right-6 bottom-32 rounded-full' ><ButtonPlayLarge /></div>}
                    {type === 'episode' && (
                        <div className="absolute w-10 h-10 rounded-md overflow-hidden bottom-28 left-2.5">
                            <img src={imgSmall} className='w-full h-full' />
                        </div>
                    )}
                </div>
            </CardSongSearchStyles>
        </Link>
    );
}
const CardSongSearchStyles = styled.div`
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

.name-playlist{
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.playlist-desc{
    height: 45px;
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
export default CardSongSearch;