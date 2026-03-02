interface KeyBoardProps {
    content?: string;   // может быть строкой или undefined
    className?: string; // может быть строкой или undefined
}

const EKeyboard = ({className = '', content = ''}: KeyBoardProps) => {
    return (
        <p className={className}>{content}</p>
    )
};

export default EKeyboard;