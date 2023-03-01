const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("unit-tests", function () {

  async function deployContracts() {
    const [owner, otherAccount] = await ethers.getSigners();

    const mockOracleAddress = "0x9774be70A8f50b88A44e4C2C83E14C5a43364A6f"
    const jobId = "c9e3140c1eb44dcb8f7e0ddd6f4a78f5"
    const link = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    const validator = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB"
    const schemaHash = "9c2498080a90d43cada7fec79eeee8de"
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))
    const schema = ethers.BigNumber.from(schemaEnd)
    const slotIndex = 2
    const operator = 4
    const circuitId = "credentialAtomicQuerySig";

    const socioTokenContract = await ethers.getContractFactory("socioToken")
    const socioToken = await socioTokenContract.deploy("ipfs://bafyreihwobwh2xsfasfndxop6ga3h7sllu5ojwb7rl5m23q6a5ashhjubm/{id}/metadata.json", 1, 2, 3)
    const property = socioToken.address

    const socioContract = await ethers.getContractFactory("socioContract");
    const socio = await socioContract.deploy(mockOracleAddress, jobId, link, property, validator, schema, slotIndex, operator, circuitId);

    return { socioToken, socio };
  }

  describe("Deployment", function () {
    it("purchase property", async function () {
      const { socioToken, socio } = await loadFixture(deployContracts);

      await socio.setPrice(0, 0)
      const tx = await socio.purchaseProperty(1)
      expect(await socioToken.TRANSFER_REQUEST_ID()).to.equal(1);

    });

    it("create identity", async function () {
      const { socioToken, socio } = await loadFixture(deployContracts);

      const tx = await socio.createIdentity("473")
    });

  })
});


const hexToBytes = (hex) => {
  for (var bytes = [], c = 0; c < hex.length; c += 2) {
    /**
     * @dev parseInt 16 = parsed as a hexadecimal number
     */
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

const fromLittleEndian = (bytes) => {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
};