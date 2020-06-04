class SpiderRouter extends ComponentInstance {
    ///
    constructor(
        public div: HTMLDivElement,
        public setting: Spider.ComponentInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
    }

    ///
    public update: () => Promise<void> = async () => {};
    
    ///
    public static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderRouter.prepare();
            const obj = new SpiderRouter(div, setting);
            return obj;
        };

    ///
    public static prepare: () => Promise<void>
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
    destroy = async () => {
        
    };
}