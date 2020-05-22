
const rootApplications = 'Applications';
const appFileName = 'app.json';

let app: Spider.Component|undefined;
let appName = undefined;
const rootDiv = document.createElement('div');
rootDiv.className = 'root';
document.body.appendChild(rootDiv);


const initApp = async (rootDiv: HTMLDivElement, appName: string) => {
    const appString = await HttpClient.get(rootApplications + '/' + appName + '/' + appFileName);
    const app: Spider.ComponentInstanceSetting = JSON.parse(appString);
    return await createComponent(rootDiv, app);
};

(async () => {
    if (appName) {
        app = await initApp(rootDiv, appName)
    } else {
        const appRoots = await FileSystem.GetFileSystems(rootApplications);
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
                    }else{
                        break;
                    }
                }
                // create app
                appName = appRoot.name;
                app = await initApp(rootDiv, appName);
            };
            btn.addEventListener('click', clickHandler);
            btns.push(btn);
        }
    }
})();

