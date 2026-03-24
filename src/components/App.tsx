import EKeyboard from "./UI/EKeyboard"
import Input from "./UI/Input"
import Timer from "./UI/Timer"
import Button from "./UI/Button";
import UseTyping from "./logic/UseTyping";
import './app.css'

const App = () => {

    const { ToggleMode, state, eKeysStatusContent, CloseModal} = UseTyping();
    

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


        {state.isGameOver && (
        <div className="modal-wrapper">
            <dialog id="result-modal" open>
                <div className="center-modal">
                    <h2>Ваш результат</h2>
                </div>
                <div className="center-modal">
                    <p>Скорость: {state.wpm} WPM</p>
                </div>
                <div className="center-modal">
                    <Button click={CloseModal} content={"закрыть"}></Button>
                </div>
            </dialog>
        </div>)
        }
        </>
    );
};

export default App;