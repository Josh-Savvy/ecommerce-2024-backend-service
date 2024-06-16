import { v4 as uuidv4 } from "uuid";

/**
 * Generates a random alphanumeric reference.
 * @returns {string} The generated reference.
 */
const generateRandomString = (): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let reference = "";
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		reference += characters.charAt(randomIndex);
	}
	return reference;
};

const generateUniqueOrderId = (): string => {
	return uuidv4().replace(/-/g, "").substring(0, 10); // Use first 10 characters of UUID
};

const StringHelper = { generateRandomString, generateUniqueOrderId };
export default StringHelper;
