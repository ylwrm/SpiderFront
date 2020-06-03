
interface SpiderVueComponentInstanceSetting {
    name: string;
    type: string;
    config: {
        type: string
    };
}

class SpiderVueComponent extends ComponentInstance {
    public Update = async ()=>{
        console.log('SpiderVueComponent Update')
        console.log(this.vueInst)
        if(this.vueInst.$props){
            this.vueInst.$props.ComponentInstance = this;
        }
        if((this.vueInst as any).Update){
            (this.vueInst as any).Update();
        }
        // (this.vueInst as any).Update?.();
    }
    public name: string | undefined;
    public parent: SpiderCombination | undefined;
    private div: HTMLDivElement;
    private setting: SpiderVueComponentInstanceSetting;
    private vueInst: Vue;

    constructor(div: HTMLDivElement, setting: SpiderVueComponentInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;

        const vueType = Vue.extend(window[setting.config.type]);
        this.vueInst = new vueType().$mount();
        
        this.div.appendChild(this.vueInst.$el);
        // console.log(this.vueInst);
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
                'VueComponents/' + setting.config.type + '/' + setting.config.type +'.umd.min.js'
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
        if(this.vueInst){
            this.vueInst.$destroy();
        }
        if (this.div) {
            this.div.parentElement?.removeChild(this.div);
        }
    };
}