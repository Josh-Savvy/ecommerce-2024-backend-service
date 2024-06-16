"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = __importDefault(require("memory-cache"));
/**
 * CacheManager class to manage caching operations using memory-cache.
 */
class CacheManager {
    /**
     * Creates an instance of CacheManager.
     */
    constructor() {
        // Todo: use redis as the cache manager
        this.cache = new memory_cache_1.default.Cache();
    }
    /**
     * Sets a key-value pair in the cache with an optional expiration time.
     * @param {string} key - The key under which to store the value.
     * @param {any} value - The value to store in the cache.
     * @param {number} [duration=300000] - Optional. Duration in milliseconds for which the value should be cached. Default is 300000ms (5 minutes).
     */
    set(key, value, duration = 300000) {
        this.cache.put(key, value, duration);
    }
    /**
     * Retrieves a cached value by key.
     * @param {string} key - The key of the cached value to retrieve.
     * @returns {any} The cached value associated with the key, or undefined if not found or expired.
     */
    get(key) {
        return this.cache.get(key);
    }
    /**
     * Checks if a key exists in the cache.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists in the cache, false otherwise.
     */
    has(key) {
        return this.cache.keys().includes(key);
    }
    /**
     * Deletes a key from the cache.
     * @param {string} key - The key to delete from the cache.
     */
    del(key) {
        this.cache.del(key);
    }
    /**
     * Clears the entire cache, removing all key-value pairs.
     */
    clear() {
        this.cache.clear();
    }
}
const cacheManager = new CacheManager();
exports.default = cacheManager;
//# sourceMappingURL=cache-manager.js.map