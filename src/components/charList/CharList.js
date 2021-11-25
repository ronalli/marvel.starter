import { Component } from 'react';

import MarvelService from '../../services/MarvrlService';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

	state = {
		characters: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.requestCharList();
	}

	marvelService = new MarvelService();

	onLoaded = (item) => {
		this.setState({
			characters: item,
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

	requestCharList = () => {
		this.marvelService
			.getAllCharacters()
			.then(res => this.onLoaded(res))
			.catch(this.onError)
	}




	render() {
		const { characters, loading, error } = this.state;
		const view = !loading ? <RenderCharacters characters={characters} /> : null;
		const spinner = loading ? <Spinner className="spinner-list" /> : null;
		return (
			<div className="char__list" >
				{spinner}
				<ul className="char__grid">
					{view}
				</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}

}


const RenderCharacters = ({ characters }) => {
	console.log(characters)
	return (
		characters.map(item => {
			return <li key={item.name} className="char__item">
				<img src={item.thumbnail} alt={item.name} className='fix-img' />
				<div className="char__name">{item.name}</div>
			</li>
		})
	)
}

export default CharList;