import ButtonLoading from './ButtonLoading'

const Button = ({ text, type, onClick = null, color = 'blue', isLoading = false, loadingText = 'Loading' }) => {
    if (isLoading) return (<ButtonLoading text={ loadingText } color={ color } />)

    return (<button type={ type } className={ `text-white bg-${ color }-700 hover:bg-${ color }-800 focus:ring-4 focus:ring-${ color }-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none` } onClick={ onClick }>{ text }</button>)
}

export default Button
