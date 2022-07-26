"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const NFTDisplay_1 = __importDefault(require("../components/NFTDisplay"));
const NFTLoader_1 = __importDefault(require("../NFTLoader"));
const AdminLayout_1 = __importDefault(require("../view/admin/AdminLayout"));
class SelectNFTPopup extends skydapp_browser_1.Popup {
    constructor(currentContract, currentTokenId, select) {
        super(".popup-background");
        this.currentContract = currentContract;
        this.currentTokenId = currentTokenId;
        this.nftDisplays = {};
        this.append(this.content = (0, skydapp_browser_1.el)(".select-nft-popup", (0, skydapp_browser_1.el)("h1", "Select NFT"), this.main = (0, skydapp_browser_1.el)("main", this.nftContainer = (0, skydapp_browser_1.el)(".nft-container"), this.loadMoreButton = (0, skydapp_browser_1.el)("a.load-more", "Load More", {
            click: async () => {
                const loading = (0, skydapp_browser_1.el)(".loading").appendTo(this.main, 1);
                const nfts = await NFTLoader_1.default.loadMore(AdminLayout_1.default.current.address);
                for (const nft of nfts) {
                    this.nftDisplays[`${nft.asset_contract.address}-${nft.token_id}`] = (0, skydapp_browser_1.el)("a.nft", new NFTDisplay_1.default(nft.image_thumbnail_url), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { click: () => this.selectNFT(nft.asset_contract.address, nft.token_id) }).appendTo(this.nftContainer);
                }
                if (nfts.length < 50) {
                    this.loadMoreButton.delete();
                }
                if (this.deleted !== true) {
                    loading.delete();
                }
                this.selectNFT(this.currentContract, this.currentTokenId);
            },
        })), (0, skydapp_browser_1.el)(".info-form", this.contractAddressInput = (0, skydapp_browser_1.el)("input", {
            placeholder: "Contract Address",
            keyup: (event) => { if (this.currentTokenId !== undefined) {
                this.selectNFT(event.target.value, this.currentTokenId);
            } },
        }), this.tokenIdInput = (0, skydapp_browser_1.el)("input", {
            placeholder: "Token Id",
            keyup: (event) => { if (this.currentContract !== undefined) {
                this.selectNFT(this.currentContract, event.target.value);
            } },
        })), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a.select", "Close", {
            click: () => this.delete(),
        }), (0, skydapp_browser_1.el)("a.select", "Select", {
            click: () => {
                select(this.currentContract, this.currentTokenId);
                this.delete();
            },
        }))));
        this.loadNFTs();
    }
    async loadNFTs() {
        const loading = (0, skydapp_browser_1.el)(".loading").appendTo(this.main, 1);
        const nfts = await NFTLoader_1.default.load(AdminLayout_1.default.current.address);
        this.nftDisplays["empty"] = (0, skydapp_browser_1.el)("a.nft", (0, skydapp_browser_1.el)(".empty"), (0, skydapp_browser_1.el)(".name", "Empty"), { click: () => this.selectNFT(undefined, undefined) }).appendTo(this.nftContainer);
        for (const nft of nfts) {
            this.nftDisplays[`${nft.asset_contract.address}-${nft.token_id}`] = (0, skydapp_browser_1.el)("a.nft", new NFTDisplay_1.default(nft.image_thumbnail_url), (0, skydapp_browser_1.el)(".name", nft.name === null ? "" : nft.name), { click: () => this.selectNFT(nft.asset_contract.address, nft.token_id) }).appendTo(this.nftContainer);
        }
        if (nfts.length === 0) {
            this.main.append((0, skydapp_browser_1.el)("p.empty", "This Soul does not own any NFTs yet."));
        }
        if (nfts.length < 50) {
            this.loadMoreButton.delete();
        }
        if (this.deleted !== true) {
            loading.delete();
        }
        this.selectNFT(this.currentContract, this.currentTokenId);
    }
    selectNFT(contract, tokenId) {
        this.currentContract = contract;
        this.currentTokenId = tokenId;
        this.contractAddressInput.domElement.value = contract ?? "";
        this.tokenIdInput.domElement.value = tokenId ?? "";
        this.currentNFTDisplay?.deleteClass("selected");
        this.currentNFTDisplay = this.nftDisplays[contract === undefined || tokenId === undefined ? "empty" : `${contract}-${tokenId}`];
        this.currentNFTDisplay?.addClass("selected");
    }
}
exports.default = SelectNFTPopup;
//# sourceMappingURL=SelectNFTPopup.js.map