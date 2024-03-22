// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title Simple ERC20 implementation
/// @author Galas Danil
/// @notice _balances map in the zero slot
contract SimpleToken is ERC20 {
    constructor() ERC20("T", "T") {}

    /**
     * Mint the token
     * @param account - address
     * @param value - amount
     */
    function mint(address account, uint256 value) public {
        _mint(account, value);
    }
}

/// @title Custom mock ERC20 implementation
/// @author Galas Danil
/// @notice _balances map in the second slot
contract CustomToken1 {
    // Some variables
    uint256 private a;
    uint128 private b;
    uint128 private c;

    // target mapping balances
    mapping(address account => uint256) private _balances;

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }
}

/// @title Custom mock ERC20 implementation
/// @author Galas Danil
/// @notice _balances map in slot thirteen
contract CustomToken2 {
    // Some variables
    uint256 private a;
    uint256 private b;
    mapping(address => uint256) private c;
    uint256[10] private d;

    // target mapping balances
    mapping(address => uint256) private _balances;

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }
}
