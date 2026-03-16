import EKeyboard from "./UI/EKeyboard"
import Input from "./UI/Input"
import Timer from "./logic/Timer"
import Button from "./UI/Button";
import UseTyping from "./logic/UseTyping";

const App = () => {

    const { ToggleMode, state, eKeysStatusContent} = UseTyping();
    

    return (
        <>
        <Button click={ToggleMode} content={state.mode}></Button>
        <Timer content={state.timePassedView || 0}></Timer>
        <div className="interactive_text_place">
            {state.arrayCharNodes.map((element:any, index:number) => (
                <span key={index} className={`char ${element.status}`}>{element.char}</span>
            ))}
        </div>
        <Input Content={state.text} />
        <div className="keyboard_place">
            {eKeysStatusContent.map((element:any, index:number) => (
                <EKeyboard key={index} className={`key ${element.status}`} content={element.content} />
            ))}
        </div>
        </>
    );
};

export default App;