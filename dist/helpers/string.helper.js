"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * Generates a random alphanumeric reference.
 * @returns {string} The generated reference.
 */
const generateRandomString = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let reference = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        reference += characters.charAt(randomIndex);
    }
    return reference;
};
const generateUniqueOrderId = () => {
    return (0, uuid_1.v4)().replace(/-/g, "").substring(0, 10); // Use first 10 characters of UUID
};
const StringHelper = { generateRandomString, generateUniqueOrderId };
exports.default = StringHelper;
//# sourceMappingURL=string.helper.js.map