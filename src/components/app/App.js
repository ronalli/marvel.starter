import { Component } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {

	state = {
		selectedChar: null
	}

	onCharSelected = (selectedChar) => {
		this.setState({
			selectedChar
		})
	}

	render() {
		return (
			<div className="app" >
				<AppHeader />
				<main>
					<RandomChar />
					<div className="char__content">
						<CharList onCharSelected={this.onCharSelected} />
						<ErrorBoundary>
							<CharInfo charId={this.state.selectedChar} />
						</ErrorBoundary>

					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		)
	}
}

export default App;