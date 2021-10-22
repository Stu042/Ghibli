import { AxiosResponse } from "axios";
import { ghibli } from "./config";

namespace Ghibli {
	export interface People {
		id?: string,
		name?: string,
		gender?: string,
		age?: number,
		eye_color?: string,
		hair_color?: string,
		films?: string,
		species?: string,
		url?: string;
	}

	export enum PeopleField {
		id = "id",
		name = "name",
		gender = "gender",
		age = "age",
		eye_color = "eye_color",
		hair_color = "hair_color",
		films = "films",
		species = "species",
		url = "url"
	}


	export function getAllPeople(fields: PeopleField[] = [], limit: number = 250): Promise<AxiosResponse<People[]>> {
		const field = fields.join(",");
		return ghibli.get<People[]>("/people", { params: { fields: field, limit: limit } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}

	export function getPerson(id: string, fields: PeopleField[] = []): Promise<AxiosResponse<People>> {
		const field = fields.join(",");
		return ghibli.get<People>("/people/" + id, { params: { fields: field } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
}
export default Ghibli;
