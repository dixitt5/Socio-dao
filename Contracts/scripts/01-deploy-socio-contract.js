const { ethers } = require("hardhat");

async function main() {

    const mockOracleAddress = "0x9774be70A8f50b88A44e4C2C83E14C5a43364A6f"
    const jobId = "3c0cfac9c08f405195ba3487033b2c13"
    const link = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    const validator = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB"
    const schemaHash = "9c2498080a90d43cada7fec79eeee8de"
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash))
    const schema = ethers.BigNumber.from(schemaEnd)
    const slotIndex = 2
    const operator = 4
    const circuitId = "credentialAtomicQuerySig";

    const socioTokenContract = await ethers.getContractFactory("socioToken")
    const socioToken = await socioTokenContract.deploy("hgei", 1, 2, 3)
    await socioToken.deployed();
    console.log(`Tokens Contract deployed to: ${socioToken.address}`)

    const property = socioToken.address

    const socioContract = await ethers.getContractFactory("socioContract");
    const socio = await socioContract.deploy(mockOracleAddress, jobId, link, property, validator, schema, slotIndex, operator, circuitId);
    await socio.deployed();

    console.log(`Execution Contract deployed to: ${socio.address}`);
}

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

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
