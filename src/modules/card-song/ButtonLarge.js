import { PlayIcon, PauseIcon } from "../../component/Icon";
export const ButtonPlayLarge = ({className, onClick}) => {
    return ( 
        <div onClick={onClick} className={`w-12 h-12 rounded-full flex justify-center items-center bg-primary ${className}`}>
            <span className="text-center text-black w-fit h-fit flex justify-center items-center"><PlayIcon /></span>
        </div>
     );
 }

export const ButtonPauseLarge = ({className, onClick}) => {
    return ( 
        <div onClick={onClick} className={`w-12 h-12 rounded-full flex justify-center items-center bg-primary ${className}`}>
            <span className="text-center text-black w-fit h-fit flex justify-center items-center"><PauseIcon /></span>
        </div>
     );
 }
 