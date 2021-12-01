import { Component } from 'react';

import ServicesFunctions from '../../services/servicesFunctions';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


class CharList extends Component {

	state = {
		characters: [],
		loading: true,
		error: false,
		newItemsLoading: false,
		offset: 210,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest();
		window.addEventListener('scroll', this.showModalByScroll);
	}


	showModalByScroll = () => {

		// console.log('wind', window.scrollY)
		// console.log('client', document.documentElement.clientHeight)
		// console.log(document.documentElement.scrollHeight)
		if (Math.ceil(window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
			this.setState({
				offset: this.state.offset + 9,
			})
			this.onRequest(this.state.offset);
		}
		// console.log('g')
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.showModalByScroll);
	}


	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	onCharListLoading = () => {
		this.setState({
			newItemsLoading: true
		})
	}


	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}
		this.setState(({ offset, characters }) => ({
			characters: [...characters, ...newCharList],
			offset: offset + 9,
			loading: false,
			charEnded: ended,
			newItemsLoading: false
		}))
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	renderCharacters = (characters) => {
		const items = characters.map(item => {
			return (
				<li
					key={item.id}
					className="char__item"
					onClick={() => this.props.onCharSelected(item.id)}
				>
					<img src={item.thumbnail} alt={item.name} style={ServicesFunctions.transformImage(item.thumbnail)} />
					<div className="char__name">{item.name}</div>
				</li>
			)
		})

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}


	render() {
		const { characters, loading, error, offset, newItemsLoading, charEnded } = this.state;
		const content = !(loading || error) ? this.renderCharacters(characters) : null;
		const spinner = loading ? <Spinner className="spinner-list" /> : null;
		const errorMessage = error ? <ErrorMessage /> : null
		return (
			<div className="char__list" >
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long"
					disabled={newItemsLoading}
					style={{ 'display': charEnded ? 'none' : 'block' }}
					onClick={() => this.onRequest(offset)}
				>
					<div className="inner">
						load more</div>
				</button>
			</div>
		)
	}

}


export default CharList;