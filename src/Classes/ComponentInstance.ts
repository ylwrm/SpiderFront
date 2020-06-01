
abstract class ComponentInstance {
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance|undefined>
    =
    async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting)=>{
        return undefined;
    };
    ///
    public abstract parent: ComponentInstance|undefined = undefined;
    ///
    public abstract name: string|undefined = undefined;
    ///
    abstract destroy: (option?: any) => Promise<void>;
}