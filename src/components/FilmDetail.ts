import * as ko from 'knockout';
import { Observable } from 'knockout';
import Ghibli from '../ghibli/film';


class Film {
	id = ko.observable<string>();
	title = ko.observable<string>();
	original_title = ko.observable<string>();
	original_title_romanised = ko.observable<string>();
	description = ko.observable<string>();
	director = ko.observable<string>();
	producer = ko.observable<string>();
	release_date = ko.observable<string>();
	running_time = ko.observable<string>();
	rt_score = ko.observable<string>();
	people = ko.observableArray<string>();
	species = ko.observableArray<string>();
	locations = ko.observableArray<string>();
	vehicles = ko.observableArray<string>();
	url = ko.observable<string>();

	constructor(film: Ghibli.Film) {
		this.update(film);
	}

	update(film: Ghibli.Film) {
		this.id(film?.id || "");
		this.title(film?.title || "");
		this.original_title(film?.original_title || "");
		this.original_title_romanised(film?.original_title_romanised || "");
		this.description(film?.description || "");
		this.director(film?.director || "");
		this.producer(film?.producer || "");
		this.release_date(film?.release_date || "");
		this.running_time(film?.running_time || "");
		this.rt_score(film?.rt_score || "");
		this.people((film.people && film.people.length > 0) ? film.people : []);
		this.species((film.species && film.species.length > 0) ? film.species : []);
		this.locations((film.locations && film.locations.length > 0) ? film.locations : []);
		this.vehicles((film.vehicles && film.vehicles.length > 0) ? film.vehicles : []);
		this.url(film?.url || "");
	}
}

export default class FilmDetail {
	film: Observable<Film>;

	constructor(film: Ghibli.Film = {}) {
		this.film = ko.observable(new Film(film));
	}

	fetchFilmDetail(id: string | null): void {
		if (id){
			Ghibli.getFilm(id,
				[
					Ghibli.FilmField.id,
					Ghibli.FilmField.title,
					Ghibli.FilmField.original_title,
					Ghibli.FilmField.original_title_romanised,
					Ghibli.FilmField.description,
					Ghibli.FilmField.director,
					Ghibli.FilmField.producer,
					Ghibli.FilmField.release_date,
					Ghibli.FilmField.running_time,
					Ghibli.FilmField.rt_score,
					Ghibli.FilmField.people,
					Ghibli.FilmField.species,
					Ghibli.FilmField.locations,
					Ghibli.FilmField.vehicles,
					Ghibli.FilmField.url
				]
			).then(response => {
				this.film().update(response.data);
				this.film.valueHasMutated();
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
