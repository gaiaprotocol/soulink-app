"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Layout_1 = __importDefault(require("./Layout"));
class BioLinks extends skydapp_common_1.View {
    constructor(params) {
        super();
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    async load(addressOrEns) {
        await Layout_1.default.current.ready(addressOrEns, async () => {
            if (this.closed !== true) {
                Layout_1.default.current.content.append(this.container = (0, skydapp_browser_1.el)(".bio-links-view", this.linkContainer = (0, skydapp_browser_1.el)(".link-container")));
                if (Layout_1.default.current.bio.links.length === 0) {
                    this.container.append((0, skydapp_browser_1.el)("p.empty", "This Soul has no external links."));
                }
                for (const link of Layout_1.default.current.bio.links) {
                    this.linkContainer.append((0, skydapp_browser_1.el)("a.link", (0, skydapp_browser_1.el)(".title", link.title), { href: link.url, target: "_blank" }));
                }
            }
        });
    }
    changeParams(params, uri) {
        if (params.addressOrEns !== undefined) {
            this.load(params.addressOrEns);
        }
    }
    close() {
        this.container?.delete();
        super.close();
    }
}
exports.default = BioLinks;
//# sourceMappingURL=BioLinks.js.map