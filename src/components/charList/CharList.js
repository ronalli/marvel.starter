import { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ServicesFunctions from '../../services/servicesFunctions';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

	const [characters, setCharacters] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', showModalByScroll);
		return () => window.removeEventListener('scroll', showModalByScroll);
	})

	const showModalByScroll = () => {
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			onRequest(offset, false)
		}
	}

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
		// .finally(() => setNewItemsLoading(false))
	}

	const onCharListLoaded = (newCharList) => {
		setCharacters(characters => [...characters, ...newCharList]);
		setOffset(offset => offset + 9);
		setCharEnded(newCharList.length < 9 ? true : false);
		setNewItemsLoading(false);
	}

	function renderCharacters(characters, selectedChar) {
		const items = characters.map((item, i) => {
			let active = selectedChar === item.id;
			let crazy = active ? 'char__item char__item_selected' : 'char__item';
			return (
				<CSSTransition key={item.id} classNames='char__item' timeout={500}>
					<li
						className={crazy}
						tabIndex={0}
						onFocus={() => {
							props.onCharSelected(item.id)
						}}
					>
						<img src={item.thumbnail} alt={item.name} style={ServicesFunctions.transformImage(item.thumbnail)} />
						<div className="char__name">{item.name}</div>
					</li>
				</CSSTransition>
			)

		})

		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>
					{items}
				</TransitionGroup>

			</ul>
		)
	}

	const { selectedChar } = props;
	const content = renderCharacters(characters, selectedChar);
	const spinner = loading && !newItemsLoading ? <Spinner className="spinner-list" /> : null;
	const errorMessage = error ? <ErrorMessage /> : null
	return (
		<div className="char__list" >
			{errorMessage}
			{spinner}
			{content}
			<button className="button button__main button__long"
				disabled={newItemsLoading}
				style={{ 'display': charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset, false)}
			>
				<div className="inner">
					load more</div>
			</button>
		</div>
	)

}

export default CharList;