import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

import './singleComic.scss';

const SingleComic = (props) => {
	const [comics, setComics] = useState(null)

	const { error, loading, getComics, clearError } = useMarvelService();

	useEffect(() => {
		updateComics()
	}, [props.comicsId])

	const updateComics = () => {
		const { comicsId } = props;
		if (!comicsId) return;
		clearError();
		getComics(comicsId)
			.then(onComicsLoaded)
	}

	const onComicsLoaded = (comics) => {
		console.log(comics)
		setComics(comics)
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comics) ? <View comics={comics} /> : null

	return (
		<div className="single-comic">
			<h2>hello</h2>
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ comics }) => {
	const { id, title, description, pageCount, language, price, thumbnail } = comics;

	return (
		<>
			<img src={thumbnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">{`Language: ${language}`}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<a href="#" className="single-comic__back">Back to all</a>
		</>
	)
}

export default SingleComic;