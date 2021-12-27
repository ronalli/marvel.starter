import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner"

const setContentLoading = (process, Component, data, newItemsLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />
		case 'loading':
			return newItemsLoading ? <Component data={data} /> : <Spinner />
		case 'error':
			return <ErrorMessage />
		case 'confirmed':
			return <Component data={data} />
		default:
			throw new Error('Fatal error!')
	}
}

export default setContentLoading;