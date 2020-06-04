class SpiderTable extends ComponentInstance {
    public update = async () => {
    }


    // private bigString = new Array(5000000);
    private table: Handsontable | undefined;

    constructor(
        public div: HTMLDivElement,
        public setting: Spider.ComponentInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination
    ) {
        super(div, setting, name, parent);
        this.div = div;
        this.setting = setting;

        const data = [
            ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
            ['2019', 10, 11, 12, 13],
            ['2020', 20, 11, 14, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13],
            ['2021', 30, 15, 12, 13]
        ];

        const handDiv = document.createElement('div');
        handDiv.style.width = '100%';
        handDiv.style.height = '100%';
        handDiv.style.boxSizing = 'border-box';
        this.div.appendChild(handDiv);
        const rect = this.getNetRect(this.div);
        this.table = new Handsontable(handDiv, {
            data: data,
            rowHeaders: true,
            colHeaders: true,
            width: rect.width,
            height: rect.height,
            manualColumnResize: true,
            manualRowResize: true
        });
        window.addEventListener('resize', this.resizeHandler);
    }

    ///
    private resizeHandler = () => {
        console.log('resizeHandler');
        const rect = this.getNetRect(this.div);
        this.table?.updateSettings({
            width: rect.width,
            height: rect.height
        }, false);
    };
    
    ///
    private getNetRect(element: HTMLElement) {
        const computedStyle = getComputedStyle(element);

        let elementHeight = element.clientHeight;  // height with padding
        let elementWidth = element.clientWidth;   // width with padding

        elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        return {
            height: elementHeight,
            width: elementWidth
        };
    }
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderTable.prepare();
            const obj = new SpiderTable(div, setting);
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
        if (this.table) {
            this.table.destroy();
            this.div.parentElement?.removeChild(this.div);
            window.removeEventListener('resize', this.resizeHandler);
        }
    };
}