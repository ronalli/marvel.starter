import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = (props) => {

	const [selectedChar, setSelectedChar] = useState(null);
	const [selectedComics, setSelectedComics] = useState(null);

	return (
		<Router>
			<div className="app" >
				<AppHeader />
				<main>
					<Switch>
						<Route exact path="/">
							<RandomChar />
							<div className="char__content">
								<CharList onCharSelected={setSelectedChar} selectedChar={selectedChar} />
								<ErrorBoundary>
									<CharInfo charId={selectedChar} />
								</ErrorBoundary>
							</div>
							<img className="bg-decoration" src={decoration} alt="vision" />
						</Route>

						<Route exact path="/comics">
							<ComicsList onSelectedComics={setSelectedComics} />
							<SingleComic comicsId={selectedComics} />
						</Route>
					</Switch>
				</main>
			</div>
		</Router >
	)
}

export default App;