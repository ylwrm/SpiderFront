declare namespace Spider {
    interface ComponentSetting {
        scripts: string[];
        csses: string[];
    }
    interface ComponentInstanceSetting {
        name: string;
        type: string;
        arg?: any;
        config: any;
    }
}
