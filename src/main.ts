const rootComponents = 'Components';
const rootLibSettings = 'LibSettings';
const rootApplications = 'Applications';
const appFileName = 'app.json';
const createComponent = async (rootDiv: HTMLDivElement,componentInstanceSetting: Spider.ComponentInstanceSetting)=>{
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

    const table = new window[type]() as Spider.Component;
    document.body.appendChild(rootDiv);
    table.init(rootDiv);
};

(async () => {
    const rootDiv = document.createElement('div');
    rootDiv.className = 'root';
    document.body.appendChild(rootDiv);
    const appRoots = await FileSystem.GetFileSystems('Applications');
    for (let iR = 0; iR < appRoots.length; iR++) {
        const appRoot = appRoots[iR];
        const btn = document.createElement('button');
        btn.innerText = appRoot.name;
        rootDiv.appendChild(btn);
        btn.addEventListener('click', async (ev) => {
            const appString = await HttpClient.get(rootApplications + '/' + btn.innerText + '/' + appFileName);
            const app: Spider.ComponentInstanceSetting = JSON.parse(appString);
            rootDiv.innerHTML = '';
            rootDiv.innerText = app.name;
            createComponent(rootDiv, app);
        });
    }
})();
