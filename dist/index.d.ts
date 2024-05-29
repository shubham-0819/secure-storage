/**
 * @module SecureStorage
 * @description This module provides a secure storage wrapper around a storage object (e.g., localStorage) with optional hashing, encryption, and decryption capabilities.
 */
/**
 * The SecureStorage class.
 * @class
 * @template T - The type of the storage object.
 * @param {T} storage - The storage object to wrap (e.g., localStorage or sessionStorage).
 * @param {Object} [options] - Optional configuration options.
 * @param {Function} [options.hash] - A function to hash the storage keys.
 * @param {Function} [options.encrypt] - A function to encrypt the stored values.
 * @param {Function} [options.decrypt] - A function to decrypt the stored values.
 */
declare class SecureStorage<T extends Storage> {
    private storage;
    private hash;
    private encrypt;
    private decrypt;
    constructor(storage: T, options?: {
        hash?: (key: string) => string;
        encrypt?: (value: string) => string;
        decrypt?: (value: string) => string;
    });
    /**
     * Retrieves an item from the secure storage.
     * @param {string} key - The key of the item to retrieve.
     * @returns {any} The value of the item, or null if the item doesn't exist.
     */
    getItem(key: string): any;
    /**
     * Stores an item in the secure storage.
     * @param {string} key - The key of the item to store.
     * @param {any} value - The value of the item to store.
     * @returns {void}
     */
    setItem(key: string, value: any): void;
    /**
     * Removes an item from the secure storage.
     * @param {string} key - The key of the item to remove.
     * @returns {void}
     */
    removeItem(key: string): void;
    /**
     * Clears the entire secure storage.
     * @returns {void}
     */
    clear(): void;
    /**
     * Retrieves a storage key at the specified index.
     * @param {number} id - The index of the key to retrieve.
     * @returns {string | null} The storage key at the specified index, or null if the index is out of range.
     */
    key(id: number): string | null;
    /**
     * The number of items in the secure storage.
     * @type {number}
     * @readonly
     */
    get length(): number;
    /**
     * Retrieves all keys from the secure storage.
     * @returns {string[]} An array of all keys in the secure storage.
     */
    keys(): string[];
    /**
     * Retrieves all values from the secure storage.
     * @returns {any[]} An array of all values in the secure storage.
     */
    values(): any[];
    /**
     * Retrieves all key-value pairs from the secure storage.
     * @returns {[string, any][]} An array of key-value pairs in the secure storage.
     */
    entries(): [string, any][];
}
export default SecureStorage;
