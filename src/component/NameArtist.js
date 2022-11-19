import styled from "styled-components";
import {Link} from "react-router-dom";
function NameArtist({name, className}) {
    return ( 
        <NameArtistStyles>
            <span className={`artist-name w-full text-sm text-textColor cursor-pointer ${className}`}>
                <Link className="hover:underline">{name}</Link>
            </span>
            </NameArtistStyles>
     );
}

const NameArtistStyles = styled.div`
    .artist-name{
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        white-space: unset;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`
export default NameArtist;