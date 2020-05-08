declare namespace Spider{
    interface ComponentSetting{
        components: string[];
        libs: string[];
        scripts: string[];
        csses: string[];
    }
    interface ComponentInstanceSetting{
        name: string;
        type: string;
        config: any;
    }
}