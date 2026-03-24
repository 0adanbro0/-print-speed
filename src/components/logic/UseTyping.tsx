import { useEffect, useState, useReducer } from 'react';

import {reducer, initialState} from './UseTypingReducer';

const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', ' '];
const arraySystemKey:string[] = ['Backspace']

const UseTyping = () => {
    const [eKeysStatusContent, SetEKeysStatusContent] = useState<{content:string, status:string}[]>(eKeys.map(symbol=>(
        {
            content: symbol,
            status: 'inactive'
        }
    )))

    const [state, dispatch] = useReducer(reducer, initialState());
    function ToggleMode() {
        ResetAll()
        dispatch({type: 'ToggleMode'})
    }

    function CloseModal(){
        dispatch({type :"defaultSetting"})
    }

    function CheckMode(){
        dispatch({type: 'End'})
        if(!state.currentIndex) {
            dispatch({type: 'startTick'})
        }
        else{
            dispatch({type: 'checkMode'})
        }
        
    }

    function ResetAll() {
        dispatch({type :"defaultSetting"})
        const newEKeys:{content:string, status:string}[] = eKeys.map(symbol=>({content: symbol,status: 'inactive'}))
        SetEKeysStatusContent(newEKeys)
    }
    
    useEffect(() => {
        const timer = setInterval(()=>{
            if(state.isGameOver){
                clearInterval(timer)
            }
            else if(state.currentIndex) CheckMode()
        }, 1000)

        return () => clearInterval(timer);
    }, [state.startTime, state.mode])

    useEffect(() => {

        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1 && !arraySystemKey.includes(e.key)) return;

            if(!state.currentIndex) {
                dispatch({type: 'startTick'})
            }

            //filter elements and rewrite its status, also remove old status
            const NewArrayEKeys:{content:string, status:string}[] = eKeysStatusContent.map(element => {
                return{
                    ...element,
                    status: element.content === e.key.toLowerCase() ? 'active' : 'inactive'
                }
            })

            SetEKeysStatusContent(NewArrayEKeys)

            if(e.key == 'Backspace'){
                if(state.currentIndex > 1){
                    dispatch({type: 'decrementCurrentIndex'})
                }
            }
            else if(state.arrayCharNodes[state.currentIndex].char == e.key){
                dispatch({type: "nextChar", key:e.key});
            }
            else{
                dispatch({type: "incorrectChar"});
            }

            dispatch({type : 'End'})
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [state.currentIndex, state.arrayCharNodes, eKeysStatusContent]);

    return {
        CloseModal,
        ToggleMode,
        state,
        eKeysStatusContent
    };
}

export default UseTyping