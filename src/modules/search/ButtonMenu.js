import { Link } from "react-router-dom";
function ButtonMenu({title, to, className, isActive,}) {
    return ( 
        <Link className={`py-1 px-3 text-sm font-normal ${isActive ? 'bg-white text-black' : 'bg-[#ffffff24] hover:bg-[hsla(0,0%,100%,.1)] text-white'} rounded-3xl ${className}`} to={to}>
            <button>
                {title}
            </button>
        </Link>
     );
}

export default ButtonMenu;