import SongItem from "./SongItem";
import HeadingSearch from "../HeadingSearch";
function SongSection({data}) {
    return ( 
        <div>
            <HeadingSearch title='Songs' />
            <div>
                {data.map((track, index) => (
                    <SongItem data={track} key={index} />
                ))}
            </div>
        </div>
     );
}

export default SongSection;