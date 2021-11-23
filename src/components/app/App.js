import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import MarvelService from "../../services/MarvrlService";

const marvelService = new MarvelService;
marvelService.getAllCharacters().then(res => res.data.results.forEach(item => { console.log(item.name) }));
marvelService.getCharacter(1011052).then(res => console.log(res.data.results));

const App = () => {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList />
					<CharInfo />
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	)
}

export default App;