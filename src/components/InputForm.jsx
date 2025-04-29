import { forwardRef } from 'react'

const InputForm = forwardRef(({ type, placeholder, name, onChange, onBlur, children }, ref) => {
    return (
        <>
            <input
                type={ type }
                name={ name }
                placeholder={ placeholder }
                onChange={ onChange }
                onBlur={ onBlur }
                ref={ ref }
            />
            { children }
        </>
    )
})

export default InputForm
