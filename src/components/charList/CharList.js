import { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ServicesFunctions from '../../services/servicesFunctions';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, data, newItemsLoading) => {
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

const CharList = (props) => {

	const [characters, setCharacters] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { process, setProcess, getAllCharacters } = useMarvelService();

	const { selectedChar, onCharSelected } = props;

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
			.then(() => setProcess('confirmed'))
	}

	const onCharListLoaded = (newCharList) => {
		setCharacters(characters => [...characters, ...newCharList]);
		setOffset(offset => offset + 9);
		setCharEnded(newCharList.length < 9 ? true : false);
		setNewItemsLoading(false);
	}

	return (
		<div className="char__list" >
			{setContent(process, View, { characters, selectedChar, onCharSelected }, newItemsLoading)}
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

const View = ({ data }) => {
	const { characters, selectedChar, onCharSelected } = data;
	const items = characters.map((item, i) => {
		let active = selectedChar === item.id;
		let crazy = active ? 'char__item char__item_selected' : 'char__item';
		return (
			<CSSTransition key={item.id} classNames='char__item' timeout={500}>
				<li
					className={crazy}
					tabIndex={0}
					onFocus={() => {
						onCharSelected(item.id)
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

export default CharList;