
interface SpiderButtonInstanceSetting extends Spider.ComponentInstanceSetting {
    name: string;
    type: string;
    config: any;
}
class SpiderButton extends ComponentInstance {
    //
    private button: HTMLButtonElement;
    //
    public addEventListener = (type: 'Click' | 'RightClick', listener: (this: HTMLElement, ev: CustomEvent<string>) => any) => {
        this.div.addEventListener(type as any, listener as any);
    };


    ///
    constructor(
        public div: HTMLDivElement,
        public setting: SpiderButtonInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination) {
        super(div, setting, name, parent);

        this.button = document.createElement('button');
        this.button.textContent = 'buttonX';
        this.button.style.width = '100%';
        this.div.appendChild(this.button);
        this.button.addEventListener('click', (ev) => {
            this.div.dispatchEvent(new CustomEvent('Click', {
                // bubbles: true,
                detail: this.button.textContent
            }));
        });
    }

    ///
    public update = async () => {};

    ///
    public static createInstance: (div: HTMLDivElement, setting: SpiderButtonInstanceSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: SpiderButtonInstanceSetting) => {
            await SpiderButton.prepare();
            const obj = new SpiderButton(div, setting);
            return obj;
        };
    ///
    public static prepare: () => Promise<void>
        =
        async () => {
        };

    ///
    destroy = async () => {
        this.div.parentElement?.removeChild(this.div);
    }
}