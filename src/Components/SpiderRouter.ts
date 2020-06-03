class SpiderRouter extends ComponentInstance {
    Update?: ((option?: any) => Promise<void>) | undefined;
    public name: string | undefined;
    public parent: SpiderCombination | undefined;
    private div: HTMLDivElement;
    private setting: Spider.ComponentInstanceSetting;

    constructor(div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;

    };

    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderRouter.prepare();
            const obj = new SpiderRouter(div, setting);
            return obj;
        };

    ///
    static prepare: () => Promise<void>
        =
        async () => {
            const scripts: string[] = [
                "Libs/handsontable/dist/handsontable.full.min.js"
            ];
            const csses: string[] = [
                "Libs/handsontable/dist/handsontable.full.min.css"
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
    destroy = async () => {
        
    };
}