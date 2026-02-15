import EKeyboard from "./EKeyboard"
import Input from "./Input"

import { useEffect, useState } from 'react';

import string_default_text from '../data/database'

const App = () => {
    const [arrayCharNodes, SetArrayCharNodes] = useState<{char:string, status:string}[]>(string_default_text[0][0].split("").map(symbol=>({
                                                                                            char: symbol,
                                                                                            status: 'outcoming'
                                                                                        })));
    const [currentIndex, SetCurrentIndex] = useState<number>(0);
    useEffect(() => {
        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1) return;
            if (currentIndex >= arrayCharNodes.length) return;
            console.log(e.key);

            const newArrayClassName:{char:string, status:string}[] = [...arrayCharNodes];

            if (e.key === arrayCharNodes[currentIndex].char) {
                newArrayClassName[currentIndex].status = 'correct';
                
                SetCurrentIndex(prev => prev + 1);
                console.log(currentIndex)
            }
            else{
                newArrayClassName[currentIndex].status = 'incorrect';
            }
            SetArrayCharNodes(newArrayClassName)
            console.log(arrayCharNodes);
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentIndex, arrayCharNodes]);


    const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', 'Space'];
    return (
        <>
        <div className="interactive_text_place">
            {arrayCharNodes.map((element, index) => (
                <span key={index} className={`char ${element.status}`}>{element.char}</span>
            ))}
        </div>
        <Input Content={' '} />
        <div className="keyboard_place">
            {eKeys.map((element, index) => (
                <EKeyboard key={index} ClassName="key" Content={element} />
            ))}
        </div>
        </>
    );
};

export default App;