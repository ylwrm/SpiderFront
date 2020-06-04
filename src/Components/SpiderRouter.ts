
interface SpiderRouterSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: {
        app: string,
        arg: any
    };
}
class SpiderRouter extends ComponentInstance {
    ///
    public constructor(
        public div: HTMLDivElement,
        public setting: SpiderRouterSetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
    }

    ///
    public static createInstance: (div: HTMLDivElement, setting: SpiderRouterSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderRouterSetting) => {
            await SpiderRouter.prepare();
            const obj = new SpiderRouter(div, setting);
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
            initApp(this.div, this.setting.config.app);
        };

    ///
    public destroy
        =
        async () => {
            this.div.parentElement?.removeChild(this.div);
        };
}