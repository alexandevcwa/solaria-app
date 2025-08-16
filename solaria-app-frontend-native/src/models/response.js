export class Response {
	constructor({ code, title, phrase, message, timestamp, resource }) {
		this.code = code;
		this.title = title;
		this.phrase = phrase;
		this.message = message;
		this.timestamp = timestamp;
		this.resource = resource;
	}

	toJSON() {
		return {
			code: this.code,
			title: this.title,
			phrase: this.phrase,
			message: this.message,
			timestamp: this.timestamp,
			resource: this.resource,
		};
	}
}
