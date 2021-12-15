import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {

	const { loading, request, error, clearError } = useHttp();

	const _apiKey = '30dcaeb69065d18efc428c1043ef3067';
	const _baseUrl = 'https://gateway.marvel.com:443/v1/public/';
	const _baseOffset = 210;



	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_baseUrl}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_baseUrl}characters/${id}?apikey=${_apiKey}`)
		return _transformCharacter(res.data.results[0]);
	}

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_baseUrl}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
		return res.data.results.map(_transformComics);
	}

	const getComics = async (id) => {
		const res = await request(`${_baseUrl}comics/${id}?apikey=${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'There is no description',
			pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
			language: comics.textObjects.language || 'en-us',
			price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`
		}
	}


	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: transformName(char.name),
			description: transformDescription(char.description),
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			//Ограничение вывода количества комиксов
			comics: char.comics.items.filter((item, index) => index < 9)
		}
	}

	const transformName = (str) => {
		if (str.length > 16) return `${str.slice(0, 15)}`
		return str;
	}

	const transformDescription = (str) => {
		if (str.length === 0) {
			return `К сожалению, описание об этом персонаже отсутствует. Приносим извинения, за доставленные неудобства.`
		}
		if (str.length > 210) {
			return `${str.slice(0, 210)}...`
		}
		return str;
	}

	const randomIdCharacter = () => {
		return Math.floor(1011000 + Math.random() * (1011400 + 1 - 1011000));
	}

	return { error, loading, clearError, getAllCharacters, getCharacter, randomIdCharacter, getAllComics, getComics }

}

export default useMarvelService;