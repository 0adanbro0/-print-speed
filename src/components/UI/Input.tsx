interface InputProps {
    Content?: string;   // может быть строкой или undefined
    ClassName?: string; // может быть строкой или undefined
}

const Input = ( {Content = '', ClassName = '' }: InputProps) => {
    return (
        <input value={Content} className={`input ${ClassName}`}></input>
    )
};

export default Input;