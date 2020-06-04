interface VueComponentInstance {
    name?: string | undefined;
    parent?: SpiderCombination | undefined;
    div?: HTMLDivElement;
    setting:
    {
        name: string,
        type: string,
        config: {
            type: string
            [key: string]: any
        }
    };
}
interface SpiderVueBase {
    ComponentInstance: VueComponentInstance|undefined;
}