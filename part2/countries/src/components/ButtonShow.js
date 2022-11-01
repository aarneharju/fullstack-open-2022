const ButtonShow = (props) => {

    return (
        <button onClick={(country) => props.handleClick(props.country)}>{props.text}</button>
    )
}

export default ButtonShow;