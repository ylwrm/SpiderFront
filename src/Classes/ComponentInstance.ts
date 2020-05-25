
abstract class ComponentInstance {
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance|undefined>
    =
    async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting)=>{
        return undefined;
    };
    
    ///
    abstract destroy: (option?: any) => Promise<void>;
}