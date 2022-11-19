import {Link} from 'react-router-dom'

function Heading({title, seeMore = false, }) {
    return ( 
        <div className="flex text-white w-full items-center pb-3">
            <h2 className='flex-1'>
                <Link to={`/section/${title}`} className='text-2xl font-bold hover:underline hover:decoration-white hover:decoration-2 hover:decoration-solid'>
                    {title}
                </Link>
            </h2>
            {seeMore && (
                <p>
                    <Link to={`/section/${title}`} className='font-bold text-[#b3b3b3] tracking-widest uppercase hover:underline hover:decoration-[#b3b3b3] hover:decoration-1 hover:decoration-solid'>
                        SEE ALL
                    </Link>
                </p>
            ) }
        </div>
     );
}

export default Heading;