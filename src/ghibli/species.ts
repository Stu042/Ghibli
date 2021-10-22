import { AxiosResponse } from "axios";
import { ghibli } from "./config";

namespace Ghibli {
	export interface Species {
		id: string,
		name: string,
		classification: string,
		eye_colors: string,
		hair_colors: string,
		url: string,
		people: string[],
		films: string[];
	}

	export enum SpeciesField {
		id = "id",
		name = "name",
		classification = "classification",
		eye_colors = "eye_colors",
		hair_colors = "hair_colors",
		url = "url",
		people = "people",
		films = "films"
	}

	
	export function getAllSpecies(fields: SpeciesField[] = [], limit: number = 250): Promise<AxiosResponse<Species[]>> {
		const field = fields.join(",");
		return ghibli.get<Species[]>("/species", { params: { fields: field, limit: limit } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}

	export function getSpecies(id: string, fields: SpeciesField[] = []): Promise<AxiosResponse<Species>> {
		const field = fields.join(",");
		return ghibli.get<Species>("/species/" + id, { params: { fields: field } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
}
export default Ghibli;
