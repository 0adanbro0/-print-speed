import { useEffect, useState, useReducer } from 'react';

import SetTimer from "../../utils/SetTimer/setTimer";
import string_default_text from '../../data/database'

interface reducerSession{
    currentIndex: number,
    startTime: number,
    timePassedView:number,
    mode: string,
    text: string,
    arrayCharNodes: {char:string, status:string}[]
}

const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', ' '];
const arraySystemKey:string[] = ['Backspace']

const UseTyping = () => {
    const [eKeysStatusContent, SetEKeysStatusContent] = useState<{content:string, status:string}[]>(eKeys.map(symbol=>(
        {
            content: symbol,
            status: 'inactive'
        }
    )))

    function reducer(state:reducerSession, action:any){
        switch (action.type) {
        case "defaultSetting":
            const newText:{char:string, status:string}[] = string_default_text[0][0].split("").map(symbol=>({char: symbol, status: 'outcoming'}))
            return{
                ...state, 
                currentIndex: 0,
                startTime: 0,
                timePassedView: 0,
                arrayCharNodes: newText
            }
        case 'ToggleMode':
            const newMode:string =  state.mode == 'infinitive' ? 'countdown' : 'infinitive';
            return({
                ...state,
                mode: newMode
            })
        case 'decrementCurrentIndex':
            const decrementIndex:number = state.currentIndex - 1
            console.log(`decrement: ${decrementIndex}`)
            const newArrayClassNameCharDecrement:{status:string, char:string}[] = state.arrayCharNodes.map((element, index) => {
                if(index == decrementIndex)
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
            console.log(timePassed)
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
                        status: 'incorrect'
                    })
                else{
                    return element
                }
            });
            return({
                ...state,
                arrayCharNodes: newArrayClassNameCharIncorrect
            })
        case 'nextChar':
            const newArrayClassNameCharIncrement:{status:string, char:string}[] = state.arrayCharNodes.map((element, index) => {
                if(index > state.currentIndex)
                    return({                           
                        ...element,
                        status: 'outcoming'
                    })
                else if(index < state.currentIndex){
                    return element
                }
                return({
                    ...element,
                    status: action.key === element.char ? 'correct' : 'incorrect' 
                })
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

    const [state, dispatch] = useReducer(reducer, { currentIndex: 0, startTime: 0, timePassedView: 0, mode: 'infinitive', text: '', arrayCharNodes : string_default_text[0][0].split("").map(symbol=>({char: symbol,status: 'outcoming'}))});
    //СДЕЛАТЬ ОКОНЧАНИЕ ВРЕМЕНИ И ПОДСЧЕТ СКОРОСТИ СЛОВ В МИНУТУ. Сделано backspace, но подвисает по среди текста неправильный символ, если начать удалять сразу после ошибки
    function ToggleMode() {
        ResetAll()
        dispatch({type: 'ToggleMode'})
    }

    function CheckMode(){
        if(!state.currentIndex) {
            dispatch({type: 'startTick'})
        }

        dispatch({type: 'checkMode'})
    }

    function ResetAll() {
        dispatch({type :"defaultSetting"})
        const newEKeys:{content:string, status:string}[] = eKeys.map(symbol=>({content: symbol,status: 'inactive'}))
        SetEKeysStatusContent(newEKeys)
    }
    
    useEffect(() => {
        const timer = setInterval(()=>{
            if(state.currentIndex) CheckMode()
        }, 1000)

        return () => clearInterval(timer);
    }, [state.startTime, state.mode])

    useEffect(() => {

        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1 && !arraySystemKey.includes(e.key)) return;
            if (state.currentIndex >= state.arrayCharNodes.length) return;

            if(!state.currentIndex) {
                dispatch({type: 'startTick'})
            }

            //filter elements and rewrite its status, also remove old status
            const NewArrayEKeys:{content:string, status:string}[] = eKeysStatusContent.map(element => {
                return{
                    ...element,
                    status: element.content === e.key ? 'active' : 'inactive'
                }
            })
            console.log(NewArrayEKeys)

            SetEKeysStatusContent(NewArrayEKeys)

            console.log(e.key);

            if(e.key == 'Backspace'){
                if(state.currentIndex > 1){
                    dispatch({type: 'decrementCurrentIndex'})
                }
            }
            else if(state.arrayCharNodes[state.currentIndex].char == e.key){
                dispatch({type: "nextChar", key:e.key});
                console.log(state.currentIndex)
            }
            else{
                dispatch({type: "incorrectChar"});
            }
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [state.currentIndex, state.arrayCharNodes, eKeysStatusContent]);

    return {
        ToggleMode,
        state,
        eKeysStatusContent
    };
}

export default UseTyping