import { Skeleton } from 'antd';

import Heading from '../../component/Heading'
import img from '../../assets/images/genres_img.jpg'
import CardSongSearch from '../search/CardSongSearch';

function SectionHomePage({ sectionData }) {
    return (
        <div className='pt-6 px-8 text-white'>
            <Heading title={sectionData.name} seeMore={sectionData.contents.items.length >= 5} />
            <div className="grid grid-cols-4 gap-5">
                {sectionData.contents.items.slice(0,4).map((item, index) => (
                    <CardSongSearch id={item.id} src={item.images ? item.images[0][0].url : img} type={item.type} name={item.name} description={item.description} key={index} />
                ))}
            </div>
        </div>
    );
}

export default SectionHomePage;