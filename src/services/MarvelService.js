class MarvelService {
	_apiKey = '30dcaeb69065d18efc428c1043ef3067';
	_baseUrl = 'https://gateway.marvel.com:443/v1/public/';
	_baseOffset = 210;

	getResourece = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`${res.status}`)
		}

		return res.json();
	}

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResourece(`${this._baseUrl}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResourece(`${this._baseUrl}characters/${id}?apikey=${this._apiKey}`)
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		return {
			id: char.id,
			name: this.transformName(char.name),
			description: this.transformDescription(char.description),
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			//Ограничение вывода количества комиксов
			comics: char.comics.items.filter((item, index) => index < 9)
		}
	}

	transformName = (str) => {
		if (str.length > 16) return `${str.slice(0, 15)}`
		return str;
	}

	transformDescription = (str) => {
		if (str.length === 0) {
			return `К сожалению, описание об этом персонаже отсутствует. Приносим извинения, за доставленные неудобства.`
		}
		if (str.length > 210) {
			return `${str.slice(0, 210)}...`
		}
		return str;
	}

	randomIdCharacter = () => {
		return Math.floor(1011000 + Math.random() * (1011400 + 1 - 1011000));
	}

}

export default MarvelService;