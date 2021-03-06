import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
	const [animeList, setAnimeList] = useState([]);
	const [topAnime, setTopAnime] = useState([]);
	const [search, setSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(
			`https://api.jikan.moe/v3/top/anime/1/bypopularity`
		).then((res) => res.json());

		setTopAnime(temp.top.slice(0, 10));
	};

	const HandleSearch = (e) => {
		e.preventDefault();
		fetchAnime(search);
	};

	const fetchAnime = async (query) => {
		const temp = await fetch(
			`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=50`
		).then((res) => res.json());

		setAnimeList(temp.results);
	};

	useEffect(() => {
		GetTopAnime();
	}, []);

	return (
		<div className='App'>
			<Header />
			<div className='content-wrap'>
				<Sidebar topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					setSearch={setSearch}
					animeList={animeList}
				/>
			</div>
		</div>
	);
}

export default App;
