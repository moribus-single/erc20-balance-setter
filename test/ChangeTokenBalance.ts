import {
  loadFixture,
  getStorageAt,
  setStorageAt
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { IERC20 } from "../typechain-types";
import { findBalanceSlot } from "../script/findSlot";


describe("ERC20", function () {
  // Deploy token with _balances map at the zero slot
  async function deploySimpleToken() {
    // Contracts are deployed using the first signer/account by default
    const TokenFactory = await hre.ethers.getContractFactory("SimpleToken");
    const token = await TokenFactory.deploy();

    return token;
  }

  // Deploy token with _balances map at the second slot
  async function deployCustomToken1() {
    // Contracts are deployed using the first signer/account by default
    const TokenFactory = await hre.ethers.getContractFactory("CustomToken1");
    const token = await TokenFactory.deploy();

    return token;
  }

  // Deploy token with _balances map at the thirteenth slot
  async function deployCustomToken2() {
    // Contracts are deployed using the first signer/account by default
    const TokenFactory = await hre.ethers.getContractFactory("CustomToken2");
    const token = await TokenFactory.deploy();

    return token;
  }

  describe("Detecting storage slot for changing token balance", function () {
    it("Simple token (targetSlot=0)", async function () {
      // Prepare contract and user wallet
      const token = <IERC20> await loadFixture(deploySimpleToken);
      const [user1] = await hre.ethers.getSigners();

      // Find slot index for setting token balance
      let targetSlot = await findBalanceSlot(user1.address, token, 15);

      // Target slot for simple token is zero
      expect(targetSlot).eq(0);
    });

    it("Custom token (targetSlot=2)", async function () {
      // Prepare contract and user wallet
      const token = <IERC20> await loadFixture(deployCustomToken1);
      const [user1] = await hre.ethers.getSigners();

      // Find slot index for setting token balance
      let targetSlot = await findBalanceSlot(user1.address, token, 15);

      // Target slot for simple token is zero
      expect(targetSlot).eq(2);
    });

    it("Custom token (targetSlot=13)", async function () {
      // Prepare contract and user wallet
      const token = <IERC20> await loadFixture(deployCustomToken2);
      const [user1] = await hre.ethers.getSigners();

      // Find slot index for setting token balance
      let targetSlot = await findBalanceSlot(user1.address, token, 15);

      // Target slot for simple token is zero
      expect(targetSlot).eq(13);
    });
  });
});

