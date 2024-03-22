# Detect ERC20 token balances storage slot for overriding balances
**Problem:** Storing ERC20 token holders with some balance (the bigger, the better) <br>
**Solution** Detect index of the balances mapping slot to change the balance for some user and use the tokens


## Overview
[Solidity documentation](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#storage-inplace-encoding) explains how the mappings are stored in a contract storage.

Formula for getting holder's slot hash: 
```
v[key] = keccak256(uint256(key) . uint256(v's slot index))
```

## Algorithm
1. Find the slot containing the mapping with balances (brute force).
2. Calculate the hash of our holder's slot in mapping.
3. Change the balance with using `setStorageAt` method.

Script for searching storage slot containing balances mappnig in `script/findSlot.ts` file.

## Testing
Folder `contracts` contains custom mock ERC20 token implementations for testing. <br>
There are three mock tokens:
- balances mapping in zero slot
- balancs mapping in second slot
- balances mapping in slot thirteen 

Run `npx hardhat test` to run tests on multiple mock contracts
