(async()=>{
    const com = 'SpiderTable';
    const settingStr = await HttpClient.get('Components/' + com + '.json');
    const setting: Spider.ComponentSetting = JSON.parse(settingStr);
    // get libs
    for (let iL = 0; iL < setting.libs.length; iL++) {
        const lib = setting.libs[iL];
        const libsettingStr = await HttpClient.get('LibSettings/' + lib + '.json');
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
    for (let iS = 0; iS < setting.scripts.length; iS++) {
        const spt = setting.scripts[iS];
        await DomLoader.LoadScript(spt);
    }

    const table = new window[com]() as Spider.Component;
    const rootDiv = document.createElement('div');
    document.body.appendChild(rootDiv);
    table.init(rootDiv);
})();
