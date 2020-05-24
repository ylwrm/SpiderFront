
abstract class ComponentInstance {
    ///
    static createInstance: (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting) => Promise<ComponentInstance|undefined>
    =
    async (div: HTMLDivElement, setting: Spider.ComponentInstanceSetting)=>{
        return undefined;
    };

    ///
    static prepare: ()=>Promise<void>
    = 
    async ()=>{

    };
    
    ///
    abstract destroy: (option?: any) => Promise<void>;
}