
abstract class ComponentInstance {
    ///
    constructor(
        public div: HTMLDivElement,
        public setting: Spider.ComponentInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination) {}
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance|undefined>
    =
    async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting)=>{
        return undefined;
    };
    ///
    abstract Update?: (option?: any) => Promise<void>;
    ///
    abstract destroy: (option?: any) => Promise<void>;
}