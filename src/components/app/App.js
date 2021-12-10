import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = (props) => {

	const [selectedChar, setSelectedChar] = useState(null);

	return (
		<div className="app" >
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList onCharSelected={setSelectedChar} selectedChar={selectedChar} />
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>

				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	)
}

export default App;