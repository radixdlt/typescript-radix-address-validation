import { validateAddress } from '../src/main';

describe('Address Validation', () => {
    it('A non-fungible resource address is valid', () => {
        // Arrange
        const invalidString =
            'resource_sim1ngvrads4uj3rgq2v9s78fzhvry05dw95wzf3p9r8skhqusf44dlvmr';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(true);
    });

    it('A fungible resource address is valid', () => {
        // Arrange
        const invalidString =
            'resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(true);
    });

    it('A Secp256k1 virtual account is valid', () => {
        // Arrange
        const invalidString =
            'account_rdx16xnr480pezjwmgypcvsu24cvw4xl0lf7gyzv8dnhytvkaq7vcg7d30';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(true);
    });

    it('A Ed25519 virtual account is valid', () => {
        // Arrange
        const invalidString =
            'account_rdx128uxu4mkjgen9wxcl5a7lpyu4kcec6vkhsnj4u0kfrv4v6jvk9u5mw';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(true);
    });

    it('An allocated account is valid', () => {
        // Arrange
        const invalidString =
            'account_sim1cx4qy6q2aa9vgl3x87nny50nephemg6yntq95neulu85hndy5wwzkh';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(true);
    });

    it('An incorrect length address is invalid', () => {
        // Arrange
        const invalidString =
            'account_rdx128uxu4mkjgen9wxcl5a7lpyu4kcec6vkhsnj4u0kfrv4v6sgfdzdr';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(false);
    });

    it('A non-bech32m string is invalid', () => {
        // Arrange
        const invalidString = 'Hello world!';

        // Act
        const result = validateAddress(invalidString);

        // Assert
        expect(result).toBe(false);
    });
});
