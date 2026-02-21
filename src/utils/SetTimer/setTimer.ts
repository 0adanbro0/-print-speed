function SetTimer (deadline:number, StartTime:number){
    const result:number = Math.floor(Date.now()/1000 - StartTime);

    if(!deadline) return Number(result);
    else if(Date.now()/1000 - StartTime >= deadline) return 0;
}

export default SetTimer;