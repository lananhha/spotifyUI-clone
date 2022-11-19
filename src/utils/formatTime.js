const formatTime = (duration) => {
    let hrs
    let min
    let sec
    let time = ''
    if(duration < 3600 ) {
        min= Math.trunc(duration / 60)
        sec = Math.ceil(duration % 60)
        if(sec < 10) {
            sec =`0${sec}`
        }
        time = `${min}:${sec}`
    }else{
        hrs = Math.trunc(duration / 3600)
        min = Math.trunc (duration/60%60 )
        sec = Math.ceil(duration % 60)
        if(min < 10) {
            min = `0${min}`
        }
        if(sec < 10) {
            sec =`0${sec}`
        }
        time = `${hrs}:${min}:${sec}`
    }
    return time
}
export default formatTime