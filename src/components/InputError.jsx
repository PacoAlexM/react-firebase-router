const InputError = ({ error }) => {
    return (
        <>
            { error && <p>{ error.message }</p> }
        </>
    )
}

export default InputError
