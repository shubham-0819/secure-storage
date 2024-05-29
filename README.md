# SecureStorage

SecureStorage is a TypeScript library that provides a secure storage wrapper around browser storage objects (e.g., `localStorage` or `sessionStorage`). It offers optional hashing, encryption, and decryption capabilities to protect sensitive data stored in the browser.

## Features

- Securely store data in browser storage.
- Optional hashing to obscure storage keys.
- Optional encryption to protect stored values.
- Optional decryption to retrieve stored values securely.

## Installation

You can install SecureStorage via npm:

```bash
# Not yet published 
npm install secure-storage
```

## Usage

### Importing the Module

You can import the `SecureStorage` class from the package:

```typescript
import SecureStorage from 'secure-storage';
```

### Creating a Secure Storage Instance

To create a secure storage instance, simply instantiate the `SecureStorage` class with the desired storage object (e.g., `localStorage` or `sessionStorage`):

```typescript
const secureStorage = new SecureStorage(localStorage);
```

### Storing Data

You can store data securely using the `setItem` method:

```typescript
secureStorage.setItem('key', 'value');
```

### Retrieving Data

You can retrieve stored data securely using the `getItem` method:

```typescript
const value = secureStorage.getItem('key');
```

### Removing Data

You can remove data from the secure storage using the `removeItem` method:

```typescript
secureStorage.removeItem('key');
```

### Clearing Storage

You can clear the entire secure storage using the `clear` method:

```typescript
secureStorage.clear();
```

## Examples

Here's a simple example demonstrating how to use SecureStorage:

```typescript
import SecureStorage from '@your-username/secure-storage';

// Create a secure storage instance
const secureStorage = new SecureStorage(localStorage);

// Store data securely
secureStorage.setItem('username', 'john_doe');

// Retrieve stored data securely
const username = secureStorage.getItem('username');
console.log('Username:', username); // Output: "john_doe"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## Acknowledgments

- This library was inspired by the need for secure client-side storage in web applications.
- Credit - [secure-web-storage](https://www.npmjs.com/package/secure-web-storage)

