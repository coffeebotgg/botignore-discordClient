export interface IHashTableData {
	uid: string;
	selections: {
		IDE: string[];
		code: string[];
		framework: string[];
		application: string[];
		templates: string[];
	};
	created_at?: string;
	expires_at?: string;
}

export interface IHashTable {
	[key: string]: IHashTableData;
}
