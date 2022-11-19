import { Skeleton } from 'antd';

import Heading from '../../component/Heading'
import CardSong from '../card-song/CardSong'

function SectionHomePage({ sectionData}) {
    return (
        <div className='pt-6 px-8 text-white'>
            <Heading title={sectionData.name} seeMore={sectionData.contents.items.length >= 5} />
            <div className="grid grid-cols-5 gap-5">
                {sectionData.contents.items.map((playlist) => (
                    <CardSong playlistInfo={playlist} key={playlist.id} />
                ))}
            </div>
        </div>
    );
}

export default SectionHomePage;