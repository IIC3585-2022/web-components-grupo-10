import { SellItem } from "./sell-item.js";

export class SellItemModule {
    static defineElements() {
        window.customElements.define("sell-item", SellItem);
    }
}


SellItemModule.defineElements();
