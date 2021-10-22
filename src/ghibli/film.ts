import { AxiosResponse } from "axios";
import { ghibli } from "./config"

namespace Ghibli {

	export interface Film {
		id?: string,
		title?: string,
		original_title?: string,
		original_title_romanised?: string,
		description?: string,
		director?: string,
		producer?: string,
		release_date?: string,
		running_time?: string,
		rt_score?: string,
		people?: string[],
		species?: string[],
		locations?: string[],
		vehicles?: string[],
		url?: string;
	}

	export enum FilmField {
		id = "id",
		title = "title",
		original_title = "original_title",
		original_title_romanised = "original_title_romanised",
		description = "description",
		director = "director",
		producer = "producer",
		release_date = "release_date",
		running_time = "running_time",
		rt_score = "rt_score",
		people = "people",
		species = "species",
		locations = "locations",
		vehicles = "vehicles",
		url = "url"
	}


	export function getFilm(id: string, fields: FilmField[] = []): Promise<AxiosResponse<Film>> {
		const field = fields.join(",");
		return ghibli.get<Film>("/films/" + id, { params: { fields: field } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}

	export function getAllFilms(fields: FilmField[] = []): Promise<AxiosResponse<Film[]>> {
		const field = fields.join(",");
		return ghibli.get<Film[]>("/films", { params: { fields: field, limit: 250 } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
}
export default Ghibli;
