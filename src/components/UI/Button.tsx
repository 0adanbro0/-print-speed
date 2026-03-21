import './button.css'

interface ButtonProps{
    content:string,
    className?:string,
    click:()=> void
}

const Button = ({content = 'infinitive', className = 'button', click}: ButtonProps) => {
    return (
        <button onClick={click} className={`button ${className}`}>{content}</button>
    )
};

export default Button;