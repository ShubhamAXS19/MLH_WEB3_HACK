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

class Escrow {
    constructor(nftAddress, seller, inspector, lender) {
        this.contract = new nearAPI.Contract(contractAccount, contractId, {
            viewMethods: ['isListed', 'purchasePrice', 'escrowAmount', 'buyer', 'inspectionPassed', 'approval', 'getBalance'],
            changeMethods: ['list', 'depositEarnest', 'updateInspectionStatus', 'approveSale', 'finalizeSale', 'cancelSale'],
        });
        this.nftAddress = nftAddress;
        this.seller = seller;
        this.inspector = inspector;
        this.lender = lender;
    }

    async list(nftID, buyer, purchasePrice, escrowAmount) {
        return await this.contract.list({
            nftID,
            buyer,
            purchasePrice,
            escrowAmount,
        });
    }

    async depositEarnest(nftID) {
        return await this.contract.depositEarnest({ nftID });
    }

    async updateInspectionStatus(nftID, passed) {
        return await this.contract.updateInspectionStatus({ nftID, passed });
    }

    async approveSale(nftID) {
        return await this.contract.approveSale({ nftID });
    }

    async finalizeSale(nftID) {
        return await this.contract.finalizeSale({ nftID });
    }

    async cancelSale(nftID) {
        return await this.contract.cancelSale({ nftID });
    }

    async getBalance() {
        return await this.contract.getBalance();
    }
}

const escrow = new Escrow('nft-address', 'seller-address', 'inspector-address', 'lender-address');

async function createListing(nftID, buyer, purchasePrice, escrowAmount) {
    await escrow.list(nftID, buyer, purchasePrice, escrowAmount);
    console.log(`Listing created for NFT ID: ${nftID}`);
}

async function depositEarnest(nftID, amount) {
    await escrow.depositEarnest(nftID, { amount });
    console.log(`Earnest deposit made for NFT ID: ${nftID}`);
}

async function updateInspectionStatus(nftID, passed) {
    await escrow.updateInspectionStatus(nftID, passed);
    console.log(`Inspection status updated for NFT ID: ${nftID}`);
}

async function approveSale(nftID) {
    await escrow.approveSale(nftID);
    console.log(`Sale approved for NFT ID: ${nftID}`);
}

async function finalizeSale(nftID) {
    await escrow.finalizeSale(nftID);
    console.log(`Sale finalized for NFT ID: ${nftID}`);
}

async function cancelSale(nftID) {
    await escrow.cancelSale(nftID);
    console.log(`Sale canceled for NFT ID: ${nftID}`);
}

async function getContractBalance() {
    const balance = await escrow.getBalance();
    console.log(`Contract balance: ${balance}`);
}

createListing(1, 'buyer-address', '1000000000000000000000', '500000000000000000000');
depositEarnest(1, '500000000000000000000');
updateInspectionStatus(1, true);
approveSale(1);
finalizeSale(1);
cancelSale(1);
getContractBalance();
