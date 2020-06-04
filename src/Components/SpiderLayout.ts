
interface SpiderLayoutSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: any;
}
class SpiderLayout extends ComponentInstance {
    ///
    public constructor(
        public div: HTMLDivElement,
        public setting: SpiderLayoutSetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
    }

    ///
    public static createInstance: (div: HTMLDivElement, setting: SpiderLayoutSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderLayoutSetting) => {
            await SpiderLayout.prepare();
            const obj = new SpiderLayout(div, setting);
            return obj;
        };

    /// ***
    private static prepare: () => Promise<void>
        =
        async () => {
            const scripts: string[] = [
            ];
            const csses: string[] = [
            ];
            for (let iS = 0; iS < scripts.length; iS++) {
                const spt = scripts[iS];
                await DomLoader.LoadScript(spt);
            }
            for (let iS = 0; iS < csses.length; iS++) {
                const css = csses[iS];
                await DomLoader.LoadCss(css);
            }
        };

    ///
    public update
        =
        async () => {
        };

    ///
    public destroy
        =
        async () => {
            this.div.parentElement?.removeChild(this.div);
        };
}