import { useEffect, useState, useReducer } from 'react';

import SetTimer from "../../utils/SetTimer/setTimer";
import string_default_text from '../../data/database'

interface reducerSession{
    currentIndex: number,
    startTime: number,
    timePassedView:number,
    mode: string,
    text: string
}

const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', ' '];

const UseTyping = () => {
    const [eKeysStatusContent, SetEKeysStatusContent] = useState<{content:string, status:string}[]>(eKeys.map(symbol=>(
        {
            content: symbol,
            status: 'inactive'
        }
    )))

    const [arrayCharNodes, SetArrayCharNodes] = useState<{char:string, status:string}[]>(string_default_text[0][0].split("").map(symbol=>({
                                                                                            char: symbol,
                                                                                            status: 'outcoming'
                                                                                        })));

    function reducer(state:reducerSession, action:any){
        switch (action.type) {
        case "defaultSetting":
            return{
                ...state, 
                currentIndex: 0,
                startTime: 0,
                timePassedView: 0,
            }
        case 'ToggleMode':
            const newMode:string =  state.mode == 'infinitive' ? 'countdown' : 'infinitive';
            return({
                ...state,
                mode: newMode
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
        case 'nextChar':
            return { ...state, currentIndex: state.currentIndex + 1 };
        case 'SET_TEXT':
            return { ...state, text: action.payload };
        default:
            throw console.error('no action type found!');
        }
    }

    const [state, dispatch] = useReducer(reducer, { currentIndex: 0, startTime: 0, timePassedView: 0, mode: 'infinitive', text: ''});
    //СДЕЛАТЬ ОКОНЧАНИЕ ВРЕМЕНИ И ПОДСЧЕТ СКОРОСТИ СЛОВ В МИНУТУ. Убираем один value при backspace, перерисовываем массив с добавлением outcomming если его value больше чем current. 
    // Проблема!!!! Не переключается контроль времени после добавления редуктера
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
        const newText:{char:string, status:string}[] = string_default_text[0][0].split("").map(symbol=>({char: symbol, status: 'outcoming'}))
        SetArrayCharNodes(newText)
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
            if(e.key.length > 1) return;
            if (state.currentIndex >= arrayCharNodes.length) return;

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

            SetEKeysStatusContent(
                NewArrayEKeys
            )

            console.log(e.key);

            const newArrayClassNameChar:{status:string, char:string}[] = arrayCharNodes.map((element, index) => {
                if(state.currentIndex != index)return element
                return{
                    ...element,
                    status: e.key === element.char ? 'correct' : 'incorrect' 
                }
            });

            SetArrayCharNodes(newArrayClassNameChar)
            console.log(newArrayClassNameChar);

            if(arrayCharNodes[state.currentIndex].char == e.key){
                dispatch({type: "nextChar"});
                console.log(state.currentIndex)
            }
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [state.currentIndex, arrayCharNodes, eKeysStatusContent]);

    return {
        ToggleMode,
        state,
        arrayCharNodes,
        eKeysStatusContent
    };
}

export default UseTyping