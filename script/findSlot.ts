import hre from "hardhat";
import { getStorageAt, setStorageAt } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { IERC20 } from "../typechain-types";

/**
 * Searches for a specific balance slot in an ERC20 contract.
 *
 * @param signer - The address of the account whose balance is being searched.
 * @param token - The ERC20 contract instance.
 * @param value - The expected balance value.
 * @returns The balance slot index, or undefined if the balance was not found.
 */
export async function findBalanceSlot<T extends IERC20>(signer: string, token: T, value: bigint): Promise<number | undefined> {
    const tokenAddress = await token.getAddress();
    const hexValue = hre.ethers.toBeHex(value, 32);

    for (let slot = 0; slot < 30; slot++) {
        // Getting target slot for changing user balance directly
        //
        // _balances[address] = keccak256(abi.encodePacked(address, slot))
        // where slot ∊ [0..30]
        const targetSlot = hre.ethers.solidityPackedKeccak256(["uint256", "uint256"], [signer, slot])

        // Firstly, we get value already stores at the target slot
        // to prevent overwriting errors. Afterwards, we set new value
        let actualValue = await getStorageAt(tokenAddress, targetSlot);
        await setStorageAt(tokenAddress, targetSlot, hexValue);

        // If balance of the user equals to the value we set to the
        // target slot, then return it, else set old value
        const balance = await token.balanceOf(signer);
        if (balance == value) {
            await setStorageAt(tokenAddress, targetSlot, actualValue);
            return slot;
        }

        // for preventing errors in contract logic data
        await setStorageAt(tokenAddress, targetSlot, actualValue);
    }
}