import ButtonLoading from './ButtonLoading'

const Button = ({ text, type, onClick = null, color = 'blue', isLoading = false, loadingText = 'Loading' }) => {
    if (isLoading) return (<ButtonLoading text={ loadingText } color={ color } />)

    const btnClassBase = 'focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center'
    let btnClassColor

    if (color === 'blue')
        btnClassColor = `${btnClassBase} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 mb-2`
    else if (color === 'green')
        btnClassColor = `${btnClassBase} text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 mb-2`
    else if (color === 'red')
        btnClassColor = `${btnClassBase} text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 mb-2`
    else if (color === 'yellow')
        btnClassColor = `${btnClassBase} text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 mb-2`
    else if (color === 'purple')
        btnClassColor = `${btnClassBase} text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 mb-2`
    else
        btnClassColor = `${btnClassBase} text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100 mb-2`

    return (<button type={ type } onClick={ onClick } className={ btnClassColor }>{ text }</button>)
}

export default Button
