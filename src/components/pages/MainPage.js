import { useState } from "react";
import { Helmet } from "react-helmet"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import SearchForm from "../searchForm/SearchForm";
import decoration from '../../resources/img/vision.png';


const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Marvel information portal"
				/>
				<title>Marvel information portal</title>
			</Helmet>

			<RandomChar />
			<div className="char__content">
				<div>
					<SearchForm />
					<CharList onCharSelected={setSelectedChar} selectedChar={selectedChar} />
				</div>

				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;