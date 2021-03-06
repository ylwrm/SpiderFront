
interface SpiderCombinationInstanceSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: {
        controls: Spider.ComponentInstanceSetting[]
    };
}
class SpiderCombination extends ComponentInstance {
    public update = async ()=>{
        for (let iC = 0; iC < this.ControlInsts.length; iC++) {
            const inst = this.ControlInsts[iC];
            inst.update?.();
        }
    }

    public ControlInsts: ComponentInstance[] = [];
    
    constructor(
        public div: HTMLDivElement,
        public setting: SpiderCombinationInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
    }
    ///
    private setup = async ()=>{
        for (let iC = 0; iC < this.setting.config.controls.length; iC++) {
            const control = this.setting.config.controls[iC];
            const controlInst = await CreateComponentInstance(control, this.div);
            if (controlInst) {
                controlInst.parent = this;
                controlInst.name = control.name;
                this.ControlInsts.push(controlInst);
            }   
        }
    };
    ///
    static createInstance: (div: HTMLDivElement, setting: SpiderCombinationInstanceSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderCombinationInstanceSetting) => {
            await SpiderCombination.prepare();
            const obj = new SpiderCombination(div, setting);
            await obj.setup();
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
        // for (let iC = 0; iC < this.ControlInsts.length; iC++) {
        //     const ctlInst = this.ControlInsts[iC];
        //     await ctlInst.destroy();
        // }
        while (true) {
            const ctlInst = this.ControlInsts.pop();
            if (ctlInst) {
                await ctlInst.destroy();
            } else {
                break;
            }
        }
        this.div.parentElement?.removeChild(this.div);
    }
}