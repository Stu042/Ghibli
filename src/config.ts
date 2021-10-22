import { LogLevel } from "./log-levels";


interface Config {
	API_BASE_URL: string,
	LOG_LEVEL: LogLevel,
	API_TIMEOUT: number;
}


export const config: Config = {
	API_BASE_URL: "https://ghibliapi.herokuapp.com/",
	API_TIMEOUT: 2000,
	LOG_LEVEL: LogLevel.trace
};
