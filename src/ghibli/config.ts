import axios from "axios";
import { config } from "../config";


export const ghibli = axios.create({
	method: 'get',
	baseURL: config.API_BASE_URL,
	timeout: config.API_TIMEOUT,
	headers: { "Content-Type": "application/json" }
});
