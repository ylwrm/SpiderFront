
class ComponentInstance {
    ///
    constructor(
        public div: HTMLDivElement,
        public setting: Spider.ComponentInstanceSetting,
        public name?: string,
        public parent?: SpiderCombination) { }
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance>
        =
        async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => {
            const obj = new ComponentInstance(div, setting);
            return obj;
        };

    ///
    update: () => Promise<void> = async () => {

    };

    ///
    destroy: () => Promise<void> = async () => {

    };
}