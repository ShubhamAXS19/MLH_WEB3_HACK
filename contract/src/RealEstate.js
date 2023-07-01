
const nearAPI = require('near-api-js');

const nearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
};
const near = await nearAPI.connect(nearConfig);
const walletConnection = new nearAPI.WalletConnection(near, 'your-app-name');

const contractAccount = new nearAPI.Account(walletConnection.account());
const contractId = 'contract-account-id'; // Replace with your contract account ID

class RealEstate {
    constructor() {
        this.contract = new nearAPI.Contract(contractAccount, contractId, {
            viewMethods: ['totalSupply'],
            changeMethods: ['mint'],
        });
    }

    async mint(tokenURI) {
        return await this.contract.mint({ tokenURI });
    }

    async totalSupply() {
        return await this.contract.totalSupply();
    }
}

// Usage example
const realEstate = new RealEstate();

async function createToken(tokenURI) {
    const tokenId = await realEstate.mint(tokenURI);
    console.log(`Token created with ID: ${tokenId}`);
}

async function getTotalSupply() {
    const supply = await realEstate.totalSupply();
    console.log(`Total supply of tokens: ${supply}`);
}

createToken('https://example.com/token-uri');
getTotalSupply();
