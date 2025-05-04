const InputError = ({ error }) => (<>{ error && <p className="mt-2 text-sm text-red-600"><span className="font-medium">Sorry!</span> { error.message }</p> }</>)

export default InputError
