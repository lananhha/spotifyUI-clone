import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components';

import img from '../../../assets/images/card_img.jpg'
import NameSong from '../../../component/NameSong';
import NameArtist from '../../../component/NameArtist';
function SongItem({data}) {
    return (
        <SongItemStyles>
            <div className='song-item flex gap-4 bg-transparent px-3 py-2 rounded'>
                <div className='w-10 h-10 flex justify-center items-center relative'>
                    <img src={data.album.cover[1].url} className='w-full h-full absolute top-0 left-0 right-0 bottom-0 -z-10' />
                    <span className='text-white play-btn hidden'>
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                </div>
                <div className='w-[55%]'>
                    <NameSong name={data.name} />
                    <NameArtist className='leading-4' name={data.artists[0].name} />
                </div>
                <div className='flex flex-1 justify-between items-center'>
                    <span className="heart-icon text-textColor hover:text-white text-base hidden">
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <span className="flex-1 text-center text-textColor2 text-sm">{data.durationText}</span>
                    <span className="ellipsis-icon text-textColor text-base hidden">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </span>
                </div>
            </div>
        </SongItemStyles>
    );
}
const SongItemStyles = styled.div`
.song-item:hover{
    background-color: hsla(0,0%,100%,.1);
}

.song-item:hover .heart-icon{
    display: flex
}

.song-item:hover .ellipsis-icon{
    display: flex
}

.song-item:hover .play-btn{
    display: flex
}
`
export default SongItem;