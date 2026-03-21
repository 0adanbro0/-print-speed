import './timer.css'

interface TimerProps{
    content:number
}

const Timer = ({content} : TimerProps) =>{
    return(
        <span className="timer">{
            content === 0 ? 'Start typing' : content
        }</span>
    );
}

export default Timer;