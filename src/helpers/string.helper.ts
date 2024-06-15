/**
 * Generates a random alphanumeric reference.
 * @returns {string} The generated reference.
 */
const generateUsername = (): string => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let reference = "";
	for (let i = 0; i < 10; i++) reference += characters.charAt(Math.floor(Math.random() * characters.length));
	return reference;
};

const StringHelper = { generateUsername };
export default StringHelper;
