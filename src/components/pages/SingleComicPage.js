import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {

	const { comicId } = useParams();
	const [comic, setComic] = useState(null)

	const { error, loading, getComic, clearError } = useMarvelService();

	useEffect(() => {
		updateComics()
	}, [comicId])

	const updateComics = () => {
		if (!comicId) return;
		clearError();
		getComic(comicId)
			.then(onComicLoaded)
	}

	const onComicLoaded = (comic) => {
		console.log(comic)
		setComic(comic)
	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null

	return (
		<div className="single-comic">
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ comic }) => {
	const { title, description, pageCount, language, price, thumbnail } = comic;

	return (
		<>
			<img src={thumbnail} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">{`Language: ${language}`}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">Back to all</Link>
		</>
	)
}

export default SingleComicPage;