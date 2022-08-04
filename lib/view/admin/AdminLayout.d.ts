import { DomNode } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Bio from "../../datamodel/Bio";
import NFTInfo from "../../datamodel/NFTInfo";
export default class AdminLayout extends View {
    static current: AdminLayout;
    content: DomNode;
    private container;
    private imageContainer;
    private profile;
    address: string;
    private prevBio;
    bio: Bio;
    nfts: NFTInfo[];
    private currentLink;
    private links;
    private saveButton;
    constructor(params: ViewParams, uri: string);
    ready(proc: () => Promise<void>): Promise<void>;
    private loadPFP;
    private save;
    checkChanges(): void;
    private highlight;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=AdminLayout.d.ts.map