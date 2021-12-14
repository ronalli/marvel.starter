import { useState, useEffect } from 'react';

import ServicesFunctions from '../../services/servicesFunctions';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);

	useEffect(() => {
		updateChar();
	}, [props.charId])


	const { error, loading, getCharacter } = useMarvelService();

	const updateChar = () => {
		const { charId } = props;
		if (!charId) return;
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const skeleton = char || error || loading ? null : <Skeleton />
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null

	return (
		<div className="char__info" >
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	const renderComics = (comics) => {
		if (comics.length === 0) return <p>К большому сожалению, для данного героя комиксов нет! Возможно в будущем это исправится.</p>
		return comics.map((item, index) => {
			return <li
				className="char__comics-item"
				key={index}
			>
				{item.name}
			</li>
		})
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={ServicesFunctions.transformImage(thumbnail)} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{renderComics(comics)}
			</ul>
		</>
	)
}

export default CharInfo;