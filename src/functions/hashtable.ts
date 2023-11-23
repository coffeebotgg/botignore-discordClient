export default class HashTable {
	private map: Map<any, any>;

	constructor() {
		this.map = new Map();
	}

	// Add a key-value pair to the hashtable
	public add(key: string, value: object): void {
		this.map.set(key, value);
	}

	// Get the value associated with a key
	public get(key: string): object {
		return this.map.get(key);
	}

	// Remove a key-value pair from the hashtable
	public remove(key: string): void {
		this.map.delete(key);
	}

	// Check if a key exists in the hashtable
	public contains(key: string): boolean {
		return this.map.has(key);
	}

	// Get all the keys in the hashtable
	public keys(): string[] {
		return Array.from(this.map.keys());
	}

	// Get all the values in the hashtable
	public values(): any[] {
		return Array.from(this.map.values());
	}

	// Get the size of the hashtable
	public size(): number {
		return this.map.size;
	}

	// Clear the hashtable
	public clear(): void {
		this.map.clear();
	}
}
