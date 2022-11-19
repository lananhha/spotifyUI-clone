import styled from "styled-components";
import { Link } from "react-router-dom";
function MetaDataNoBgImg({ children, type, imgAlbum, name, imgSinger, singer, year, songAmount, time, isPodcast = false, className }) {
    return (
        <MetaDataNoBgImgStyles>
            <div className={`background relative bg-[#313131] bg-opacity-80 ${className}`} >
                <div className='max-h-[60vh] min-h-minHeightBgPlaylist px-8 pb-12 flex items-end absolute top-0 left-0 right-0 bottom-0'>
                    <div className="h-[232px] w-232px mr-6">
                        <img className="w-full h-full object-cover" src={imgAlbum} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white uppercase">{type}</span>
                        <h2 className="title font-black text-white text-[3rem]">{name}</h2>
                        <div className="flex">
                            {!isPodcast &&
                                <div className="w-6 h-6">
                                    <img className="w-full h-full rounded-full" src={imgSinger} />
                                </div>
                            }
                            <Link className="font-bold text-sm text-white ml-2 cursor-pointer hover:underline">{singer}</Link>
                            {!isPodcast &&
                                <>
                                    <span className="text-sm font-normal text-white ml-1">• {year}</span>
                                    <span className="text-sm font-normal text-white ml-1">• {songAmount} songs</span>
                                    <span className="text-sm font-normal text-textColor ml-1">{time}</span>
                                </>
                            }
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </MetaDataNoBgImgStyles>
    );
}
const MetaDataNoBgImgStyles = styled.div`
.background{
    width: 100%;
    height: 73vh
}
    .title{
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export default MetaDataNoBgImg;