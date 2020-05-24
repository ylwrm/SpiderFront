declare namespace Spider {
    interface ComponentSetting {
        scripts: string[];
        csses: string[];
    }
    interface ComponentInstanceSetting {
        name: string;
        type: string;
        config: any;
    }
}
