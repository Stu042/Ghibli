import * as ko from 'knockout';
import FilmSummaries from "./components/FilmSummaries";
import FilmDetail from "./components/FilmDetail";

let pathname = window.location.pathname;
let queryString = window.location.search;
let params = new URLSearchParams(queryString);
switch (pathname) {
	case "":
	case "/":
	case "/index.html":
		let filmSumaries = new FilmSummaries();
		filmSumaries.fetchFilmSummaries();
		ko.applyBindings(filmSumaries);
		break;

	case "/film.html":
		let filmDetail = new FilmDetail();
		filmDetail.fetchFilmDetail(params.get("q"));
		ko.applyBindings(filmDetail);
		break;

	default:
}
