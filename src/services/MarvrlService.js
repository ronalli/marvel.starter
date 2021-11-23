class MarvelService {
	_apiKey = '30dcaeb69065d18efc428c1043ef3067';
	_baseUrl = 'https://gateway.marvel.com:443/v1/public/'

	getResourece = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`${res.status}`)
		}

		return res.json();
	}

	getAllCharacters = () => {
		return this.getResourece(`${this._baseUrl}characters?limit=9&offset=210&apikey=${this._apiKey}`);
	}

	getCharacter = (id) => {
		return this.getResourece(`${this._baseUrl}characters/${id}?apikey=${this._apiKey}`)
	}

}

export default MarvelService;