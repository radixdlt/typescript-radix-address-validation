import { bech32m } from 'bech32';

/**
 * Validates a Radix address returning `true` if the address is valid, otherwise
 * `false` is returned.
 *
 * Currently, this function is only capable of validating account and resource
 * addresses. If other addresses are passed to this function then it will treat
 * them as invalid addresses.
 * @param address The address to validate.
 * @returns A boolean indicating if the address is valid or not.
 */
export const validateAddress = (address: string): boolean => {
    // This try catch is more of a safety net - if any exception is thrown when
    // we're performing the validation catch it, do not propagate it upwards,
    // and return `false` to indicate that the validation failed.
    try {
        // Note: This can throw an exception if the decoding fails which can
        // happen if the passed address is not valid Bech32m (e.g., invalid
        // prefix).
        const { prefix, words } = bech32m.decode(address);

        // Convert the words to a byte array.
        const addressBytes = new Uint8Array(bech32m.fromWords(words));

        // Validate that the address has the expected number of bytes.
        if (addressBytes.length !== 30) {
            return false;
        }

        // Get the first byte (the entity type byte) and ensure that the HRP
        // starts with the expected prefix.
        const expectedHrpPrefix = entityTypeByteToHrpPrefix[addressBytes[0]];
        if (!prefix.startsWith(expectedHrpPrefix)) {
            return false;
        }

        // Ensure that the remaining part of the prefix is just the network
        // selector/identifier.
        const remainingPrefix = prefix.replace(expectedHrpPrefix, '');
        if (!/^(rdx|sim|loc|test|tdx_[a-f0-9]{1,2}_)/.test(remainingPrefix)) {
            return false;
        }

        // All checks passed, the address is valid!
        return true;
    } catch {
        return false;
    }
};

/**
 * A constant that maps the entity type bytes to the HRP prefix.
 */
const entityTypeByteToHrpPrefix: Record<number, string> = {
    /* Account */
    81: 'account_',
    193: 'account_',
    209: 'account_',
    /* Resources */
    93: 'resource_',
    154: 'resource_',
};
