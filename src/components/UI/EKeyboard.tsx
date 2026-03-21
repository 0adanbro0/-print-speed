import './eKeyBoard.css'

interface KeyBoardProps {
    content?: string;   // может быть строкой или undefined
    className?: string;
}

const EKeyboard = ({className = '', content = ''}: KeyBoardProps) => {
    return (
        <span className={className}>{content}</span>
    )
};

export default EKeyboard;