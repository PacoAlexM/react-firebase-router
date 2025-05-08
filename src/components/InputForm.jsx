import { forwardRef } from 'react'

const InputForm = forwardRef(({ type, placeholder, name, label, id, error, onChange, onBlur, children }, ref) => {
    // Input
    const inputErrorClass = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5'
    const inputDefaultClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    // Label
    const labelErrorClass = 'block mb-2 text-sm font-medium text-red-700'
    const labelDefaultClass = 'block mb-2 text-sm font-medium text-gray-900'

    return (
        <div className="mb-5">
            <label htmlFor={ id } className={ error ? labelErrorClass : labelDefaultClass }>{ label }</label>
            <input
                className={ error ? inputErrorClass : inputDefaultClass }
                id={ id }
                type={ type }
                name={ name }
                placeholder={ placeholder }
                onChange={ onChange }
                onBlur={ onBlur }
                ref={ ref }
            />
            { children }
        </div>
    )
})

export default InputForm
