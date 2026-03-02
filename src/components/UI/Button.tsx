interface ButtonProps{
    content:string,
    className?:string,
    click:()=> void
}

const Button = ({content = 'infinitive', className = 'button', click}: ButtonProps) => {
    return (
        <button onClick={click} className={className}>{content}</button>
    )
};

export default Button;