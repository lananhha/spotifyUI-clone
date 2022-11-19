import styled from "styled-components";

function NameSong({name, className}) {
    return ( 
        <NameSongStyles><h4 className={`song-name text-base text-white cursor-pointer ${className}`}>{name}</h4></NameSongStyles>
     );
}

const NameSongStyles = styled.div`
    .song-name{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export default NameSong;