import EKeyboard from "./EKeyboard"
import Input from "./Input"

import React, { useEffect, useState } from 'react';

import string_default_text from '../data/database'

let defaultArray:string[] = string_default_text[0][0].split("");
console.log(defaultArray)

const App = () => {
    let [content, SetContent] = useState<string>(defaultArray.join(''));
    useEffect(() => {
        const handleKeyDown = ((e: KeyboardEvent)=>{
            if(e.key.length > 1) return;

            console.log(e.key)

                SetContent((PrevContent) => {
                    if (e.key === PrevContent[0]) {
                        const newArray = PrevContent.slice(1)
                        return newArray;
                    }
                    return PrevContent;
                });
        })

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);


    const eKeys:string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a' , 's' , 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', 'Space'];
    return (
        <>
        <pre>{content}</pre>
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