interface TimerProps{
    content:number
}

const Timer = ({content} : TimerProps) =>{
    if(!content) return(<h1 className="timer">Start typing</h1>);

    else return(<h1 className="timer">{content}</h1>);
}

export default Timer;