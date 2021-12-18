import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './comicsList.scss';

const ComicsList = () => {

	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(0)
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	// useEffect(() => {
	// 	window.addEventListener('scroll', showModalByScroll);
	// 	return () => window.removeEventListener('scroll', showModalByScroll);
	// })

	// const showModalByScroll = () => {
	// 	if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
	// 		onRequest(offset, false)
	// 	}
	// }

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllComics(offset)
			.then(onComicsListLoaded)
	}

	const onComicsListLoaded = (newComicsList) => {
		let comicsEnded = false;
		if (newComicsList.length < 8) { comicsEnded = true; }
		setComicsList([...comicsList, ...newComicsList]);
		setNewItemsLoading(false);
		setOffset(offset + 8);
		setComicsEnded(comicsEnded);
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			return (
				<li
					className="comics__item"
					key={i}
					tabIndex={0}
				>
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</Link>
				</li>
			)
		})

		return (
			<ul className="comics__grid">
				{items}
			</ul>
		)
	}

	const content = renderItems(comicsList)
	const spinner = loading && !newItemsLoading ? <Spinner className="spinner-list" /> : null;
	const errorMessage = error ? <ErrorMessage /> : null

	return (
		<div className="comics__list">
			{content}
			{errorMessage}
			{spinner}
			<button
				disabled={newItemsLoading}
				style={{ 'display': comicsEnded ? 'none' : 'block' }}
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default ComicsList;