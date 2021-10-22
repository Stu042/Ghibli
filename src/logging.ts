import { config } from "./config";
import { LogLevel, LogLevelText } from "./log-levels";


export const level = config.LOG_LEVEL;


export function logMessage(logLevel: LogLevel, message: any): void {
	if (logLevel >= level) {
		let myobj: any;
		let reason: any;
		if (typeof (message) == "string") {
			myobj = { level: LogLevelText[logLevel], message: message };
		} else {
			myobj = { level: LogLevelText[logLevel], ...message };
			if (myobj.reason) {
				reason = myobj.reason;
				delete myobj.reason;
			}
		}
		console.log(`${new Date().toISOString()} ${LogLevelText[logLevel]}: ` + JSON.stringify(myobj));
		if (reason) {
			showError(reason);
		}
	}
}



export function trace(message: any) {
	logMessage(LogLevel.trace, message);
}
export function debug(message: any) {
	logMessage(LogLevel.debug, message);
}
export function info(message: any) {
	logMessage(LogLevel.info, message);
}
export function warn(message: any) {
	logMessage(LogLevel.warn, message);
}
export function error(message: any) {
	logMessage(LogLevel.error, message);
}
export function critical(message: any) {
	logMessage(LogLevel.critical, message);
}


function showError(reason: any) {
	let display = {};
	if (reason.response) {
		/*
		 * The request was made and the server responded with a
		 * status code that falls out of the range of 2xx
		 */
		display = {
			data: reason.response.data,
			status: reason.response.status,
			headers: reason.response.headers
		};
	} else if (reason.request) {
		/*
		 * The request was made but no response was received, `error.request`
		 * is an instance of XMLHttpRequest in the browser and an instance
		 * of http.ClientRequest in Node.js
		 */
		display = {
			request: reason.request
		};
	}
	console.log(JSON.stringify(display));
}
