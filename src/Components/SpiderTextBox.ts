
interface SpiderTextBoxInstanceSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: any;
}
class SpiderTextBox extends ComponentInstance {
    public Update = async ()=>{
    }
    public name: string | undefined;
    public parent: SpiderCombination | undefined;
    
    private div: HTMLDivElement;
    private setting: SpiderTextBoxInstanceSetting;

    private input: HTMLInputElement;
    

    public get Value() : string {
        return this.input.value;
    }
    public set Value(v : string) {
        this.input.value = v;
    }
    

    constructor(div: HTMLDivElement, setting: SpiderTextBoxInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.spellcheck = false;
        this.input.style.width = '100%';
        this.div.appendChild(this.input);
    }
    ///
    private setup = async () => {
    };
    ///
    static createInstance: (div: HTMLDivElement, setting: SpiderTextBoxInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: SpiderTextBoxInstanceSetting) => {
            await SpiderTextBox.prepare();
            const obj = new SpiderTextBox(div, setting);
            await obj.setup();
            return obj;
        };
    ///
    static prepare: () => Promise<void>
        =
        async () => {
        };

    ///
    destroy = async () => {
        this.div.parentElement?.removeChild(this.div);
    }
}