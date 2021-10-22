import { AxiosResponse } from "axios";
import { ghibli } from "./config";

namespace Ghibli {
	export interface Vehicle {
		id: string,
		name: string,
		description: string,
		vehicle_class: string,
		length: number,
		pilot: string,
		films: string[],
		url: string;
	}

	export enum VehicleField {
		id = "id",
		name = "name",
		description = "description",
		vehicle_class = "vehicle_class",
		length = "length",
		pilot = "pilot",
		films = "films",
		url = "url"
	}


	export function getAllVehicle(fields: VehicleField[] = [], limit: number = 250): Promise<AxiosResponse<Vehicle[]>> {
		const field = fields.join(",");
		return ghibli.get<Vehicle[]>("/vehicles", { params: { fields: field, limit: limit } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}

	export function getVehicle(id: string, fields: VehicleField[] = []): Promise<AxiosResponse<Vehicle>> {
		const field = fields.join(",");
		return ghibli.get<Vehicle>("/vehicles/" + id, { params: { fields: field } }
		).catch(reason => {
			console.log("Failed bigtime, " + reason);
			return reason;
		});
	}
}
export default Ghibli;
