import './errorMessage.scss'

const ErrorMessage = () => {
	return <img src={process.env.PUBLIC_URL + '/error.gif'} alt="Error" />
}

export default ErrorMessage;