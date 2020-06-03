class SpiderTable extends ComponentInstance {
    Update?: ((option?: any) => Promise<void>) | undefined;
    public name: string | undefined;
    public parent: SpiderCombination | undefined;
    private div: HTMLDivElement;
    private setting: Spider.ComponentInstanceSetting;
    
    // private bigString = new Array(5000000);
    private table: Handsontable | undefined;

    constructor(div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) {
        super();
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

        const rect = this.div.parentElement?.getBoundingClientRect();
        this.table = new Handsontable(this.div, {
            data: data,
            rowHeaders: true,
            colHeaders: true,
            width: rect?.width,
            height: rect?.height,
            manualColumnResize: true,
            manualRowResize: true
        });
        window.addEventListener('resize', this.resizeHandler);
    };

    ///
    private resizeHandler = () => {
        console.log('resizeHandler');
        const rect = this.div.parentElement?.getBoundingClientRect();
        this.table?.updateSettings({
            width: rect?.width,
            height: rect?.height
        }, false);
    };

    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance | undefined>
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