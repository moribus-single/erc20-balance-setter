# Detect ERC20 token balances storage slot for overriding balances

## Overview
[Solidity documentation](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#storage-inplace-encoding) explains how mappings are stored in the contract storage.

Formula for getting slot hash: 
```
v[key] = keccak256(uint256(key) . uint256(v's slot index))
```

Script for searching storage slot in `script/findSlot.ts` file

## Testing
Folder `contracts` contains custom mock ERC20 token implementations for testing. <br>

Run `npx hardhat test` to run tests on multiple mock contracts
