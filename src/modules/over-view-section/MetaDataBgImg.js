import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from 'reselect'

import { VerifiedIcon } from "../../component/Icon";
function MetaDataBgImg({ type, img, name, description, followerCount, trackCount, listeners, verified }) {
    return (
        <MetaDataBgImgStyles>
            <div className='background-playlist-img relative' >
                <div className='absolute h-full w-full top-0 left-0 right-0 bottom-0'>
                    {false ? (
                        null
                    ) : (
                        <img src={img} className='object-cover w-full h-full' />
                    )}
                </div>
                <div className={`max-h-[60vh] min-h-minHeightBgPlaylist px-4 pb-10 flex flex-col justify-end absolute top-0 left-0 right-0 bottom-0 z-[999]`}>
                    {type === 'playlist' && <h2 className='text-sm uppercase text-white' >{type}</h2>}
                    {verified &&
                        <div className="flex">
                            <span>
                                <VerifiedIcon />
                            </span>
                            <span className="text-base font-normal text-white ml-2">Verified Artist</span>
                        </div>
                    }

                    <span className='playlist-title w-full'>
                        <h1 className=' text-white text-[6rem] font-black'>{name}</h1>
                    </span>
                    <p className='text-[#778899] text-base font-normal w-full mb-2 opacity-90'>{description}</p>
                    <div className='flex items-center'>
                        {type === 'playlist' ? (
                            <>
                                <span className='info-item text-sm text-white font-bold'>
                                    <a href='https://open.spotify.com/' className='hover:text-white text-white'>Spotify</a>
                                </span>
                                <span className='info-item text-sm text-white font-normal'>{followerCount} follows</span>
                                <span className='info-item text-sm text-white font-normal '>{trackCount} songs</span>
                            </>
                        ) : (
                            // <>
                            //     <p className="text-base font-bold text-white">{listeners} monthly listeners</p>
                            // </>
                            null
                        )}
                    </div>
                </div>
            </div>
        </MetaDataBgImgStyles>
    );
}

const MetaDataBgImgStyles = styled.div`
.background-playlist-img{
    width: 100%;
    height: 73vh;
}
    .playlist-title{
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .info-item:not(:first-child)::before{
        content: '•';
        margin: 0px 4px;
    }
    .info-item:first-child:hover{
        text-decoration: underline
    }
`
export default MetaDataBgImg;