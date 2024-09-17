//Time Conversion Function

function time_converter(time){
    let minutes=Math.floor(time / 60);
    let seconds=time-(minutes*60);
    seconds=parseInt(seconds);
    if(seconds<10){
        seconds=`0${seconds}`;
    }
    return(`${minutes}:${seconds}`)
}

export default time_converter;