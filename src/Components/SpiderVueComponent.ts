
interface SpiderVueComponentInstanceSetting {
    name: string;
    type: string;
    config: {
        type: string
    };
}

class SpiderVueComponent extends ComponentInstance {
    private div: HTMLDivElement;
    private setting: SpiderVueComponentInstanceSetting;
    private bigString = new Array(5000000);

    constructor(div: HTMLDivElement, setting: SpiderVueComponentInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;

        const vueInst = Vue.extend(window[setting.config.type]);
        const d = new vueInst().$mount()
        this.div.appendChild(d.$el);
    };

    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderVueComponent.prepare(div, setting);
            const obj = new SpiderVueComponent(div, setting);
            return obj;
        };

    ///
    static prepare: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<void>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            const scripts: string[] = [
                'Libs/vue/dist/vue.min.js',
                'Libs/element-ui/lib/index.js',
                'Vue/' + setting.config.type + '/' + setting.config.type +'.umd.min.js'
            ];
            const csses: string[] = [
                'Libs/element-ui/lib/theme-chalk/index.css'
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
        if (this.div) {
            this.div.parentElement?.removeChild(this.div);
        }
    };
}