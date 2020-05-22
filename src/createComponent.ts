const createComponent = async (
    hostDiv: HTMLDivElement,
    componentInstanceSetting: Spider.ComponentInstanceSetting
) => {
    const rootComponents = 'Components';
    const rootLibSettings = 'LibSettings';

    const type = componentInstanceSetting.type;
    const settingStr = await HttpClient.get(rootComponents + '/' + type + '.json');
    const setting: Spider.ComponentSetting = JSON.parse(settingStr);
    // load libs
    for (let iL = 0; iL < setting.libs.length; iL++) {
        const lib = setting.libs[iL];
        const libsettingStr = await HttpClient.get(rootLibSettings + '/' + lib + '.json');
        const libsetting: Spider.ComponentSetting = JSON.parse(libsettingStr);
        for (let iS = 0; iS < libsetting.scripts.length; iS++) {
            const spt = libsetting.scripts[iS];
            await DomLoader.LoadScript(spt);
        }
        for (let iS = 0; iS < libsetting.csses.length; iS++) {
            const css = libsetting.csses[iS];
            await DomLoader.LoadCss(css);
        }
    }
    // load self
    for (let iS = 0; iS < setting.scripts.length; iS++) {
        const spt = setting.scripts[iS];
        await DomLoader.LoadScript(spt);
    }
    for (let iS = 0; iS < setting.csses.length; iS++) {
        const css = setting.csses[iS];
        await DomLoader.LoadCss(css);
    }

    const component = new window[type]() as Spider.Component;
    component.init(hostDiv);
    return component;
};
