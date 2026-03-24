import SetTimer from "../../utils/SetTimer/setTimer";
import string_default_text from '../../data/database'

const everageLanguageWord = 5


interface reducerSession{
    currentIndex: number,
    startTime: number,
    timePassedView:number,
    mode: string,
    text: string,
    arrayCharNodes: {char:string, status:string}[],
    wpm: number,
    isGameOver: boolean
}

export let initialState = ()=>{ return { currentIndex: 0, startTime: 0, timePassedView: -1, mode: 'infinitive', text: '', arrayCharNodes : string_default_text[0][0].split("").map(symbol=>({char: symbol,status: 'outcoming'})), wpm: 0, isGameOver: false}}

export function reducer(state:reducerSession, action:any){
    switch (action.type) {
        case "defaultSetting":
            return({
                ...initialState(),
                mode: state.mode
            })

            
        case 'ToggleMode':
            const newMode:string =  state.mode == 'infinitive' ? 'countdown' : 'infinitive';
            console.log(newMode)
            return({
                ...state,
                mode: newMode
            })


        case 'decrementCurrentIndex':
            const decrementIndex:number = state.currentIndex - 1
            const newArrayClassNameCharDecrement:{status:string, char:string}[] = state.arrayCharNodes.map((element, index) => {
                if(index == decrementIndex){
                    return({                           
                        ...element,
                        status: 'current'
                    })
                }
                else if(index >= decrementIndex)
                    return({                           
                        ...element,
                        status: 'outcoming'
                    })
                else{
                    return element
                }
            });
            return({
                ...state,
                currentIndex: decrementIndex,
                arrayCharNodes: newArrayClassNameCharDecrement
            })     
            
            
        case 'checkMode':
            let timePassed:number = 0
            state.mode == 'infinitive' ? timePassed = SetTimer(0, state.startTime)! : timePassed = SetTimer(60, state.startTime)!;
            return({
                ...state,
                timePassedView: timePassed
            }) 


        case 'startTick':
            const timeStarted:number = Date.now()/1000
            return({
                    ...state,
                startTime: timeStarted
            })


        case 'incorrectChar':
            const newArrayClassNameCharIncorrect:{status:string, char:string}[] = state.arrayCharNodes.map((element, index) => {
                if(index == state.currentIndex)
                    return({                           
                        ...element,
                        status: 'incorrect current'
                    })
                else{
                    return element
                }
            });
            return({
                ...state,
                arrayCharNodes: newArrayClassNameCharIncorrect
            })


        case 'End':
            if(state.timePassedView == 0 || state.currentIndex >= state.arrayCharNodes.length){
                return({
                    ...state,
                    isGameOver: true,
                    wpm: (state.currentIndex / everageLanguageWord) / ((state.mode == 'infinitive' ? state.timePassedView : 60 - state.timePassedView) / 60),
                    startTime: 0,
                    timePassedView: -1,
                })
            }
            else{
                return({
                    ...state,
                    isGameOver: false
                })
            }


        case 'nextChar':
            console.log(state.currentIndex)
            const newArrayClassNameCharIncrement:{status:string, char:string}[] = state.arrayCharNodes.map((element, index) => {
                if(index == state.currentIndex + 1){
                    return({                           
                        ...element,
                        status: 'current'
                    })
                }
                else if(index > state.currentIndex){
                    return({                           
                        ...element,
                        status: 'outcoming'
                    })
                }
                else if(index < state.currentIndex){
                    return element
                }
                else{
                    return({
                        ...element,
                        status: action.key === element.char ? 'correct' : 'incorrect' 
                    })
                }
            });
            return { 
                ...state, 
                currentIndex: state.currentIndex + 1, 
                arrayCharNodes: newArrayClassNameCharIncrement
            };


        case 'SET_TEXT':
            return { ...state, text: action.payload };

            
        default:
            throw console.error('no action type found!');
    }
}