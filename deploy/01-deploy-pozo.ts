import { ethers, network } from 'hardhat';

import { verify } from '../utils/verify';

async function deploy() {
    const CustomTokenFactory = await ethers.getContractFactory('Pozo');

    console.log('Deploying contract...');

    const customToken = await CustomTokenFactory.deploy();
    await customToken.deployed();

    console.log(`Deployed to ${customToken.address}`);

    if (network.config.chainId === 31337 || network.config.chainId === 1337) {
        console.log('You are on a local network, verification is not needed!');
    } else {
        console.log('Verification needed!');

        if (process.env.ETERSCAN_API_KEY) {
            await customToken.deployTransaction.wait(6);
            await verify(customToken.address, []);
        }
    }
}

deploy.tags = ['all'];

export default deploy;
