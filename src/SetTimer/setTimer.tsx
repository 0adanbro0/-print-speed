function SetTimer (deadline:number, StartTime:number){
    if(Date.now()/1000 - StartTime >= deadline) console.log('true');
    else return console.log(Date.now()/1000 - StartTime);
}

export default SetTimer;