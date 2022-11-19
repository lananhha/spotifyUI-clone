import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

import { ShareIcon, AddIcon } from './Icon';
function EpisodeItem({src,title, description, date, time, showImg = true}) {
    return (
        <EpisodeItemStyles>
            <div className="max-w-episodeMaxWidth cursor-pointer">
                <div className='episode-item flex p-4 bg-transparent rounded hover:bg-[hsla(0,0%,100%,.1)]'>
                    {showImg && <img src={src} className='mr-6 w-28 h-28 rounded' />}
                    <div>
                        <h4 className='title text-white text-base font-bold'>{title}</h4>
                        <p className='title mt-2 mb-4 text-sm font-normal text-textColor'>{description}</p>
                        <div className='flex justify-between items-center py-5'>
                            <div className='flex'>
                                <span 
                                    onClick={() => alert('Tính năng nghe Podcast đang được cập nhật')}
                                    className='w-8 h-8 rounded-full bg-white text-black flex justify-center items-center hover:scale-110'
                                >
                                    <FontAwesomeIcon icon={faPlay} />
                                </span>
                                <div className='text-sm text-textColor font-normal ml-4 flex items-center'>
                                    <span className='mr-1'>{date} {' '}·</span>
                                    <span>{time}</span>
                                </div>
                            </div>
                            <div className='icon-right flex gap-3 text-transparent'>
                                <span>
                                    <ShareIcon />
                                </span>
                                <span>
                                    <AddIcon />
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4'>
                    <div className='w-full h-[2px] border border-[hsla(0,0%,100%,.1)] border-solid'></div>
                </div>
            </div>
        </EpisodeItemStyles>
    );
}
const EpisodeItemStyles = styled.div`
    .title{
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .episode-item:hover .icon-right{
        color: #a7a7a7;
    }
`
export default EpisodeItem;