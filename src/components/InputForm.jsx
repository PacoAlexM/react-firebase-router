import { forwardRef } from 'react'

const InputForm = forwardRef(({ type, placeholder, name, label, idElement, onChange, onBlur, children }, ref) => {
    return (
        <div className="mb-5">
            <label htmlFor={ idElement } className="block mb-2 text-sm font-medium text-gray-900">{ label }</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id={ idElement }
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
