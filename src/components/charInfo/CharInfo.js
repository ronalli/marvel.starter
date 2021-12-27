import { useState, useEffect } from 'react';

import ServicesFunctions from '../../services/servicesFunctions';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);

	useEffect(() => {
		updateChar();
	}, [props.charId])


	const { process, setProcess, getCharacter, clearError } = useMarvelService();

	const updateChar = () => {
		const { charId } = props;
		if (!charId) return;
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'))
	}

	const onCharLoaded = (char) => {
		setChar(char);

	}

	return (
		<div className="char__info" >
			{setContent(process, View, char)}
		</div>
	)
}

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;

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