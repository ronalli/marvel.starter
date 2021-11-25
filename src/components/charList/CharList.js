import { Component } from 'react';

import MarvelService from '../../services/MarvrlService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

	state = {
		characters: [],
		loading: true,
		error: false
	}

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(res => this.onLoaded(res))
			.catch(this.onError)
	}


	marvelService = new MarvelService();

	onLoaded = (characters) => {
		this.setState({
			characters,
			loading: false
		})
	}

	onError = () => {
		console.log('error');
		this.setState({
			loading: false,
			error: true
		})
	}

	renderCharacters = (characters) => {
		const items = characters.map(item => {
			let imgStyle = { 'objectFit': 'cover' };
			if (item.thumbnail.indexOf('image_not_available') > 0) imgStyle = { 'objectFit': 'unset' };
			return (
				<li key={item.id} className="char__item" >
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
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
		const { characters, loading, error } = this.state;
		const content = !(loading || error) ? this.renderCharacters(characters) : null;
		const spinner = loading ? <Spinner className="spinner-list" /> : null;
		const errorMessage = error ? <ErrorMessage /> : null
		return (
			<div className="char__list" >
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}

}


export default CharList;