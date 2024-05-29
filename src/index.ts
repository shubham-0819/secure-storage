/**
 * @module SecureStorage
 * @description This module provides a secure storage wrapper around a storage object (e.g., localStorage) with optional hashing, encryption, and decryption capabilities.
 */

/**
 * A pass-through function that returns the input data as is.
 * @function
 * @param {*} data - The input data.
 * @returns {*} The input data.
 */
const through = <T>(data: T): T => data;

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
class SecureStorage<T extends Storage> {
  private storage: T;
  private hash: (key: string) => string;
  private encrypt: (value: string) => string;
  private decrypt: (value: string) => string;

  constructor(storage: T, options: { hash?: (key: string) => string; encrypt?: (value: string) => string; decrypt?: (value: string) => string } = {}) {
    this.storage = storage;
    this.hash = options.hash || through;
    this.encrypt = options.encrypt || through;
    this.decrypt = options.decrypt || through;
  }

  /**
   * Retrieves an item from the secure storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any} The value of the item, or null if the item doesn't exist.
   */
  getItem(key: string): any {
    const hashedKey = this.hash(key);
    const value = this.storage.getItem(hashedKey);
    if (value === null) {
      return null;
    }
    const decryptedValue = this.decrypt(value);
    return JSON.parse(decryptedValue);
  }

  /**
   * Stores an item in the secure storage.
   * @param {string} key - The key of the item to store.
   * @param {any} value - The value of the item to store.
   * @returns {void}
   */
  setItem(key: string, value: any): void {
    const hashedKey = this.hash(key);
    const stringifiedValue = JSON.stringify(value);
    const encryptedValue = this.encrypt(stringifiedValue);
    this.storage.setItem(hashedKey, encryptedValue);
  }

  /**
   * Removes an item from the secure storage.
   * @param {string} key - The key of the item to remove.
   * @returns {void}
   */
  removeItem(key: string): void {
    const hashedKey = this.hash(key);
    this.storage.removeItem(hashedKey);
  }

  /**
   * Clears the entire secure storage.
   * @returns {void}
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * Retrieves a storage key at the specified index.
   * @param {number} id - The index of the key to retrieve.
   * @returns {string | null} The storage key at the specified index, or null if the index is out of range.
   */
  key(id: number): string | null {
    return this.storage.key(id);
  }

  /**
   * The number of items in the secure storage.
   * @type {number}
   * @readonly
   */
  get length(): number {
    return this.storage.length;
  }

  /**
   * Retrieves all keys from the secure storage.
   * @returns {string[]} An array of all keys in the secure storage.
   */
  keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.length; i++) {
      const key = this.key(i);
      if (key !== null) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Retrieves all values from the secure storage.
   * @returns {any[]} An array of all values in the secure storage.
   */
  values(): any[] {
    return this.keys().map((key) => this.getItem(key));
  }

  /**
   * Retrieves all key-value pairs from the secure storage.
   * @returns {[string, any][]} An array of key-value pairs in the secure storage.
   */
  entries(): [string, any][] {
    return this.keys().map((key) => [key, this.getItem(key)]);
  }
}

export default SecureStorage;
