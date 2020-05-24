// (async()=>{
//     const scripts: string[] = [
//         'Classes/ComponentInstance.js',
//         'Libs/handsontable/dist/handsontable.full.min.js'
//     ];
//     const csses: string[] = [
//         "Libs/handsontable/dist/handsontable.full.min.css"
//     ];
//     for (let iS = 0; iS < scripts.length; iS++) {
//         const spt = scripts[iS];
//         await DomLoader.LoadScript(spt);
//     }
//     for (let iS = 0; iS < csses.length; iS++) {
//         const css = csses[iS];
//         await DomLoader.LoadCss(css);
//     }
// })();

class SpiderTable extends ComponentInstance {
    private table: Handsontable | undefined;

    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance | undefined>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            await SpiderTable.prepare();
            const obj = new SpiderTable();
            const data = [
                ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
                ['2019', 10, 11, 12, 13],
                ['2020', 20, 11, 14, 13],
                ['2021', 30, 15, 12, 13]
            ];
            obj.table = new Handsontable(div, {
                data: data,
                rowHeaders: true,
                colHeaders: true
            });
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
        }
    }
}