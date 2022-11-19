import styled from 'styled-components';

import { ButtonPlayLarge } from '../card-song/ButtonLarge';
import img from '../../assets/images/card_img.jpg'
import ButtonMenu from './ButtonMenu'
import HeadingSearch from './HeadingSearch';
function TopResult({data}) {
    return ( 
      <TopResultStyles>
            <div>
                <HeadingSearch title='Top Result' />
                <div className='top-result bg-[#181818] hover:bg-[#282828] p-5 flex flex-col gap-5 rounded-xl cursor-pointer'>
                    <div className='w-[92px] h-[92px] rounded-full overflow-hidden'>
                        <img src={data.visuals.avatar[1].url} className='w-full h-full' />
                    </div>
                    <div className='relative'>
                        <div>
                            <h2 className='text-white text-[30px] font-bold mb-4'>{data.name}</h2>
                            <ButtonMenu to='/' className='bg-[#000] hover:bg-black' title='ARTIST' />
                        </div>
                        <ButtonPlayLarge className='play-btn absolute bottom-0 right-0' />
                    </div>
                </div>
            </div>
      </TopResultStyles>
     );
}
const TopResultStyles = styled.div`
.top-result{
    transition: background-color .3s ease
}
.play-btn{
    transform: scale(0);
    transition-duration: 300ms;
    transition-timing-function: ease;
}

.top-result:hover .play-btn{
    transform: scale(1);
}


`
export default TopResult;