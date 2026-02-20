import EKeyboard from "./EKeyboard"
import Input from "./Input"

import { useEffect, useState } from 'react';

import SetTimer from "../SetTimer/setTimer";
import string_default_text from '../data/database'

const App = () => {
    const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', ' '];
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
    //const [StartTime, setStartTime] = useState<number>(Date.now()/1000);
    useEffect(() => {
        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1) return;
            if (currentIndex >= arrayCharNodes.length) return;

            //SetTimer(10, StartTime);

            //filter elements and rewrite its status, also remove old status
            const NewArrayEKeys = eKeysStatusContent.map(element => {
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

            const newArrayClassNameChar = arrayCharNodes.map((element, index) => {
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

    return (
        <>
        <div className="interactive_text_place">
            {arrayCharNodes.map((element, index) => (
                <span key={index} className={`char ${element.status}`}>{element.char}</span>
            ))}
        </div>
        <Input Content={' '} />
        <div className="keyboard_place">
            {eKeysStatusContent.map((element, index) => (
                <EKeyboard key={index} ClassName={`key ${element.status}`} Content={element.content} />
            ))}
        </div>
        </>
    );
};

export default App;