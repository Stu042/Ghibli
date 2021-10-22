import * as ko from 'knockout';
import { ObservableArray } from 'knockout';
import Ghibli from '../ghibli/film';


export default class FilmSummaries {
	films: ObservableArray<Ghibli.Film>;

	constructor(arrayOfFilms: Ghibli.Film[] = []) {
		this.films = ko.observableArray(arrayOfFilms);
	}

	fetchFilmSummaries(): void {
		Ghibli.getAllFilms(
			[
				Ghibli.FilmField.id,
				Ghibli.FilmField.title,
				Ghibli.FilmField.original_title,
				Ghibli.FilmField.description
			]
		).then(response => {
			response.data.forEach(aFilm => {
				aFilm.url = "/film.html?q=" + aFilm.id;
				aFilm.description = this.getSubDescription(aFilm.description);
				this.films().push(aFilm);
			});
			this.films.valueHasMutated();
		}).catch(error => {
			console.log(error);
		});
	}

	private getSubDescription(description: string | undefined): string {
		let descript = description?.replace(/^(.{150}[^\s]*).*/, "$1") + "...";
		if (!descript) {
			descript = "";
		}
		return descript;
	}
}
