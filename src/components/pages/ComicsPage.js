import { useState } from "react";

import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";


const ComicsPage = () => {
	const [selectedComics, setSelectedComics] = useState(null);

	return (
		<>
			<ComicsList onSelectedComics={setSelectedComics} />
			<SingleComic comicsId={selectedComics} />
		</>
	)
}

export default ComicsPage;