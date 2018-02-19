export class Art {
	public name: string;
	public description: string;
	public imageUrl: string;
	public dateCreated: string;
	public tags: string[];

	constructor(name: string, description: string, image: string, date: string, tags: string[]) {
		this.name = name;
		this.description = description;
		this.imageUrl = image;
		this.dateCreated = date;
		this.tags = []
	}
}