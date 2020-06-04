const rootApplications = 'Applications';
const appFileName = 'app.json';
const rootComponents = 'Components';

let app: ComponentInstance | undefined;
// let appName = 'DemoApp';
let appName = undefined;
const rootDiv = document.createElement('div');
rootDiv.className = 'root';
document.body.appendChild(rootDiv);


async function CreateComponentInstance(componentInstanceSetting: Spider.ComponentInstanceSetting, rootDiv: HTMLDivElement) {
    const type = componentInstanceSetting.type;
    await DomLoader.LoadScript(rootComponents + '/' + type + '.js');
    const instDiv = document.createElement('div');
    instDiv.style.width = '100%';
    instDiv.style.height = '100%';
    instDiv.style.boxSizing = 'border-box';
    // rootDiv.insertBefore(instDiv, rootDiv.firstChild);
    rootDiv.appendChild(instDiv);
    app = await (window[type] as typeof ComponentInstance).createInstance(instDiv, componentInstanceSetting);
    return app;
}

const initApp = async (rootDiv: HTMLDivElement, appName: string) => {
    const appString = await HttpClient.Get(rootApplications + '/' + appName + '/' + appFileName);
    const componentInstanceSetting: Spider.ComponentInstanceSetting = JSON.parse(appString);
    return await CreateComponentInstance(componentInstanceSetting, rootDiv);
};

(async () => {
    if (appName) {
        app = await initApp(rootDiv, appName);
        app.update();
    } else {
        const appRoots = (await FileSystem.GetFileSystems(rootApplications)).filter(t=>t.isDir);
        const btns: HTMLButtonElement[] = [];
        for (let iR = 0; iR < appRoots.length; iR++) {
            const appRoot = appRoots[iR];
            const btn = document.createElement('button');
            btn.innerText = appRoot.name;
            rootDiv.appendChild(btn);
            const clickHandler = async () => {
                // clear
                rootDiv.innerHTML = '';
                while (true) {
                    const btn = btns.pop()
                    if (btn) {
                        btn.removeEventListener('click', clickHandler);
                    } else {
                        break;
                    }
                }
                // create app
                appName = appRoot.name;
                app = await initApp(rootDiv, appName);
                app.update();
            };
            btn.addEventListener('click', clickHandler);
            btns.push(btn);
        }
    }
})();

