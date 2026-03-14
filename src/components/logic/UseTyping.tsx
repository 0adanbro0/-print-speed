import { useEffect, useState } from 'react';

import SetTimer from "../../utils/SetTimer/setTimer";
import string_default_text from '../../data/database'

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
    const [currentIndex, SetCurrentIndex] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [timePassedView, setTimePassedView] = useState<number>(0);   
    const [mode, setTimeMode] = useState<string>('infinitive'); 
    //СДЕЛАТЬ ОКОНЧАНИЕ ВРЕМЕНИ И ПОДСЧЕТ СКОРОСТИ СЛОВ В МИНУТУ. Убираем один value при backspace, перерисовываем массив с добавлением outcomming если его value больше чем current
    function ToggleMode() {
        const newMode:string =  mode == 'infinitive' ? 'countdown' : 'infinitive';
        setTimeMode(newMode);
        ResetAll()
        if(currentIndex) CheckMode()
    }

    function CheckMode(){
        if(!currentIndex) {
            const timeStarted:number = Date.now()/1000
            setStartTime(timeStarted)
        }

        let timePassed:number = 0
        mode == 'infinitive' ? timePassed = SetTimer(0, startTime)! : timePassed = SetTimer(60, startTime)!;
        console.log(timePassed)
        setTimePassedView(timePassed); 
    }

    function ResetAll() {
        const defaultSettings:number = 0
        SetCurrentIndex(defaultSettings)
        setStartTime(defaultSettings)
        setTimePassedView(defaultSettings)
        const newText:{char:string, status:string}[] = string_default_text[0][0].split("").map(symbol=>({char: symbol, status: 'outcoming'}))
        SetArrayCharNodes(newText)
        const newEKeys:{content:string, status:string}[] = eKeys.map(symbol=>({content: symbol,status: 'inactive'}))
        SetEKeysStatusContent(newEKeys)
    }
    
    useEffect(() => {
        const timer = setInterval(()=>{
            if(currentIndex) CheckMode()
        }, 1000)

        return () => clearInterval(timer);
    }, [startTime, mode])

    useEffect(() => {

        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1) return;
            if (currentIndex >= arrayCharNodes.length) return;

            if(!currentIndex) {
                const timeStarted:number = Date.now()/1000
                setStartTime(timeStarted); 
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
                if(currentIndex != index)return element
                return{
                    ...element,
                    status: e.key === element.char ? 'correct' : 'incorrect' 
                }
            });

            SetArrayCharNodes(newArrayClassNameChar)
            console.log(newArrayClassNameChar);

            if(arrayCharNodes[currentIndex].char == e.key){
                SetCurrentIndex(prev => prev + 1);
                console.log(currentIndex)
            }
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentIndex, arrayCharNodes, eKeysStatusContent]);

    return {
        ToggleMode,
        mode,
        timePassedView,
        arrayCharNodes,
        eKeysStatusContent
    };
}

export default UseTyping