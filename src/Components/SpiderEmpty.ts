
interface SpiderEmptySetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: any;
}
class SpiderEmpty extends ComponentInstance {
    ///
    public constructor(
        public div: HTMLDivElement,
        public setting: SpiderEmptySetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
    }

    ///
    public static createInstance: (div: HTMLDivElement, setting: SpiderEmptySetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderEmptySetting) => {
            await SpiderEmpty.prepare();
            const obj = new SpiderEmpty(div, setting);
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