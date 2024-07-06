import { sha1 } from 'js-sha1';
import crypto from 'node:crypto';
const uuids = new Map();
const EMPTY_UINT8_ARRAY = new Uint8Array(0);
const HEX_DIGITS = '0123456789abcdef'.split('');
/**
 * This class represents a universal unique identifier that is compatibility with RFC-4122 standards.
*/
export class UUID {
    /**
     * @param { String } str
    */
    constructor(str = null) {
        Object.freeze(this);
        let Id = '';
        if (str !== null && str !== undefined) {
            if (typeof str === 'string' && !isEmptyString(str)) {
                if (validateUuid(str)) {
                    Id = str;
                } else {
                    Id = createUuid(str);
                }
            } else {
                throw new Error(`The str argument is not a ${String.name} or is an empty string.`);
            }
        } else {
            Id = crypto.randomUUID();
        }
        if (uuids.has(Id)) {
            return uuids.get(Id);
        }
        uuids.set(Id, this);
        uuids.set(this, Id);
    }
    /**
     * @returns { String } String representation of the a UUID.
    */
    toString() {
        return uuids.get(this);
    }
}
export class CompositeUUID extends UUID {
    /**
     * @param { Array<UUID> | UUID } uuids
    */
    constructor(uuids) {
        const _uuids = Array.isArray(uuids) ? uuids : [uuids];
        for (const uuid of _uuids) {
            if (!(uuid instanceof UUID)) {
                throw new Error(`one or more uuid's is not an instance of ${UUID}'`);
            }
        }
        const compositeKeyStr = _uuids.map(x => x.toString()).join('-');
        super(compositeKeyStr);
    }
}
/**
 * Concatenates two uint8 buffers
 * @param {Uint8Array} buf1 The first buffer to concatenate
 * @param {Uint8Array} buf2 The second buffer to concatenate
 * @returns {Uint8Array} Concatenation result
 */
function concatBuffers(buf1, buf2) {
    const out = new Uint8Array(buf1.length + buf2.length);
    out.set(new Uint8Array(buf1), 0);
    out.set(new Uint8Array(buf2), buf1.byteLength);
    return out;
}
/**
 * Converts unsigned byte to hex representation
 * @param { Number} ubyte The unsigned byte to convert
 * @returns { String } The hex representation
*/
function uint8ToHex(ubyte) {
    const first = ubyte >> 4;
    const second = ubyte - (first << 4);
    return HEX_DIGITS[first] + HEX_DIGITS[second];
}
/**
 * Converts unsigned byte buffer to hex string
 * @param {Uint8Array} buf The unsigned bytes buffer
 * @returns {string} The hex string representation
*/
function uint8ArrayToHex(buf) {
    let out = '';
    for (let i = 0; i < buf.length; i++) {
        out += uint8ToHex(buf[i]);
    }
    return out;
}
/**
 * Creates uuid from hash buffer
 * @param { Uint8Array } hashBuffer Hash buffer
 * @returns { String } The uuid
*/
function hashToUuid(hashBuffer) {
    const version = 5;
    return (
        // The low field of the timestamp
        uint8ArrayToHex(hashBuffer.slice(0, 4)) +
        '-' +
        // The middle field of the timestamp
        uint8ArrayToHex(hashBuffer.slice(4, 6)) +
        '-' +
        // The high field of the timestamp multiplexed with the version number
        uint8ToHex((hashBuffer[6] & 0x0f) | parseInt(version * 10, 16)) +
        uint8ToHex(hashBuffer[7]) +
        '-' +
        // The high field of the clock sequence multiplexed with the variant
        uint8ToHex((hashBuffer[8] & 0x3f) | 0x80) +
        // The low field of the clock sequence
        uint8ToHex(hashBuffer[9]) +
        '-' +
        //  The spatially unique node identifier
        uint8ArrayToHex(hashBuffer.slice(10, 16))
    );
}
/**
 * Generates SHA-1 hash from buffer
 * @param { Uint8Array } charBuffer Buffer of char codes
 * @returns { Uint8Array } SHA-1 hash buffer
*/
function sha1Hash(charBuffer) {
    return new Uint8Array(sha1.arrayBuffer(charBuffer));
}
/**
 * Converts string to buffer of char codes
 * @param {string} str The string to parse
 * @returns {Uint8Array} Buffer of char codes
*/
function stringToCharBuffer(str) {
    const escapedStr = encodeURIComponent(str);
    return Buffer.from(escapedStr);
}
/**
 * Generates the Name-Based UUID hashes v5 according to RFC-4122, v5 uses SHA-1
 * @param { String } target target to be hashed
 * @returns { String } UUID
*/
function createUuid(target) {
    if (typeof target !== 'string') {
        throw TypeError('target argument must be string');
    }
    // Parsing target chars
    const targetCharBuffer = stringToCharBuffer(target);
    const namespaceCharBuffer = EMPTY_UINT8_ARRAY;
    // Concatenation two buffers of strings to one
    const buffer = concatBuffers(namespaceCharBuffer, targetCharBuffer);
    // Getting hash
    const hash = sha1Hash(buffer);
    return hashToUuid(hash);
}
/**
 * Validates UUID
 * @param { String } uuid UUID to validate
 * @return { Boolean } Validation result
*/
function validateUuid(uuid) {
    const UUID_LENGTH = 36;
    const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof uuid === 'string' && uuid.length === UUID_LENGTH && UUID_REGEXP.test(uuid);
}
/**
 * @param { Object } str
 * @return { Boolean }
*/
function isEmptyString(str) {
    const _isAString = typeof str === 'string';
    if (_isAString) {
        const results = str.replace(/\s/g, '');
        return results === '';
    } else {
        return false;
    }
}
