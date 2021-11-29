import { Component } from 'react';

import ServicesFunctions from '../../services/ServicesFunctions';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


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
		this.setState({
			loading: false,
			error: true
		})
	}

	renderCharacters = (characters) => {
		const items = characters.map(item => {
			// let imgStyle = { 'objectFit': 'cover' };
			// if (item.thumbnail.indexOf('image_not_available') > 0) imgStyle = { 'objectFit': 'unset' };
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