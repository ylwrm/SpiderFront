
interface SpiderLayoutSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: {
        htmlUrl: string,
        maps: {
            selector: string,
            name: string
        }[]
    };
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
    private setup = async () => {
        const html = await HttpClient.Get(this.setting.config.htmlUrl);
        this.div.innerHTML = html;
    };
    ///
    public static createInstance: (div: HTMLDivElement, setting: SpiderLayoutSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderLayoutSetting) => {
            await SpiderLayout.prepare();
            const obj = new SpiderLayout(div, setting);
            await obj.setup();
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
            if (this.parent) {
                for (let iM = 0; iM < this.setting.config.maps.length; iM++) {
                    const map = this.setting.config.maps[iM];
                    const container = this.div.querySelector(map.selector);
                    const inst = this.parent.ControlInsts.find(t => t.name === map.name);
                    if (container && inst) {
                        container.appendChild(inst.div);
                    }
                }
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            }
        };

    ///
    public destroy
        =
        async () => {
            this.div.parentElement?.removeChild(this.div);
        };
}