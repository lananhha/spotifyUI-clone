import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import getLyric from '../api/getLyric'
import Loading from "../component/Loading";
function LyricPage() {
    const [lyric, setLyric] = useState([])
    const [loading, setLoading] = useState(true)
    const lyricRef = useRef()
    const currentTime = useSelector(state => state.currentState.currentTime)
    const currentTrackId = useSelector(state => state.currentState.currentTrackId)
    useEffect(() => {
        const fetchLyric = async () => {
            try {
                if(currentTrackId) {
                    const data = await getLyric(currentTrackId)
                    if(data) {
                        setLyric(data)
                        setLoading(false)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchLyric()
    }, [currentTrackId])

    // useEffect(() => {
    //     if(!loading) {
    //         if(lyricRef.current.id === Math.round(currentTime * 100) / 100) {
    //             lyricRef.current.styles.color = 'red'
    //         }
    //     }
    // }, [currentTime])

    if (loading && currentTrackId) {
        return (
            <div className="playlist-page w-contentWidth min-h-screen bg-bgLyricPage px-36 ml-leftContent flex justify-center items-center">
                <Loading />
            </div>
        )
    }
    if(!currentTrackId) {
        return (
            <div className="playlist-page w-contentWidth min-h-screen bg-bgLyricPage font-bold text-2xl px-36 ml-leftContent flex justify-center items-center">
                Not song have been selected
            </div>
        )
    }
    return (
        <div className="w-contentWidth min-h-screen text-lyricColor bg-bgLyricPage ml-leftContent pt-mtHeader pb-nowPlayingHeight px-36 isolate">
            {lyric.split('[').map((item, index) => (
                <p ref={lyricRef} className={`font-bold text-2xl max-w-full`} id={Number(item.slice(3,8))} key={index}>{item.substr(9, item.length)}</p>
            ))}
        </div>
    );
}

export default LyricPage;