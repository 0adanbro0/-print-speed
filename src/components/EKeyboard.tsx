interface KeyBoardProps {
    Content?: string;   // может быть строкой или undefined
    ClassName?: string; // может быть строкой или undefined
}

const EKeyboard = ({ClassName = '', Content = ''}: KeyBoardProps) => {
    return (
        <p className={ClassName}>{Content}</p>
    )
};

export default EKeyboard;