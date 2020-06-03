
interface SpiderButtonInstanceSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: any;
}
class SpiderButton extends ComponentInstance {
    public Update = async ()=>{
    }
    public name: string | undefined;
    public parent: SpiderCombination | undefined;
    
    private div: HTMLDivElement;
    private setting: SpiderButtonInstanceSetting;

    private button: HTMLButtonElement;
    
    public addEventListener = (type: 'Click'|'RightClick', listener: (this: HTMLElement, ev: CustomEvent<string>) => any)=>{
        this.div.addEventListener(type as any, listener as any);
    }

    constructor(div: HTMLDivElement, setting: SpiderButtonInstanceSetting) {
        super();
        this.div = div;
        this.setting = setting;
        this.button = document.createElement('button');
        this.button.textContent = 'buttonX';
        this.button.style.width = '100%';
        this.div.appendChild(this.button);
        this.button.addEventListener('click',(ev)=>{
            this.div.dispatchEvent(new CustomEvent('Click',{
                bubbles: true,
                detail: this.button.textContent
            }));
        });
    }
    
    ///
    private setup = async () => {
    };
    ///
    static createInstance: (div: HTMLDivElement, setting: SpiderButtonInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: SpiderButtonInstanceSetting) => {
            await SpiderButton.prepare();
            const obj = new SpiderButton(div, setting);
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