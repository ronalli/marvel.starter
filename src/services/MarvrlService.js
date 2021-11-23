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

	getAllCharacters = async () => {
		const res = await this.getResourece(`${this._baseUrl}characters?limit=9&offset=210&apikey=${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResourece(`${this._baseUrl}characters/${id}?apikey=${this._apiKey}`)
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		return {
			name: char.name,
			description: char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}

	randomIdCharacter = () => {
		return Math.floor(1011000 + Math.random() * (1011400 + 1 - 1011000));
	}

}

export default MarvelService;