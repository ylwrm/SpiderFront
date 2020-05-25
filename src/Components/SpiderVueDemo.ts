class SpiderVueDemo extends ComponentInstance {
    private div: HTMLDivElement;
    private setting: Spider.ComponentInstanceSetting;
    private bigString = new Array(5000000);

    constructor(div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;
        this.div.innerHTML = `
            <el-button @click="visible = true">Button</el-button>
            <el-dialog :visible.sync="visible" title="Hello world">
                <p>Try Element</p>
            </el-dialog>
        `;
        new Vue({
            el: this.div,
            data: function () {
                return { visible: false }
            }
        });
    };

    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderVueDemo.prepare();
            const obj = new SpiderVueDemo(div, setting);
            return obj;
        };

    ///
    static prepare: () => Promise<void>
        =
        async () => {
            const scripts: string[] = [
                "Libs/vue/dist/vue.min.js",
                "Libs/element-ui/lib/index.js"
            ];
            const csses: string[] = [
                "Libs/element-ui/lib/theme-chalk/index.css"
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