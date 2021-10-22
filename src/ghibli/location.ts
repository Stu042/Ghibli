import { AxiosResponse } from "axios";
import { ghibli } from "./config";

namespace Ghibli {
	export interface Location {
		id?: string,
		name?: string,
		climate?: string,
		terrain?: string,
		surface_water?: number,
		residents?: string[],
		films?: string[],
		url?: string;
	}

	export enum LocationField {
		id = "id",
		name = "name",
		climate = "climate",
		terrain = "terrain",
		surface_water = "surface_water",
		residents = "residents",
		films = "films",
		url = "url"
	}


	export function getAllLocations(fields: LocationField[] = [], limit: number = 250): Promise<AxiosResponse<Location[]>> {
		const field = fields.join(",");
		return ghibli.get<Location[]>("/locations", { params: { fields: field, limit: limit } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
	// getAllLocations([LocationField.id, LocationField.name], 10).then(console.log);


	export function getLocation(id: string, fields: LocationField[] = []): Promise<AxiosResponse<Location>> {
		const field = fields.join(",");
		return ghibli.get<Location>("/locations/" + id, { params: { fields: field } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
	// getLocation("26361a2c-32c6-4bd5-ae9c-8e40e17ae28d", [LocationField.name]).then(console.log);
}
export default Ghibli;
