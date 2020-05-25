class DomLoader {
    public static LoadScript(scriptUrl: string) {
        const em = document.getElementById(scriptUrl);
        if (!em) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.id = scriptUrl;
            document.body.appendChild(script);
            return new Promise((resolve, reject) => {
                script.onload = resolve;
            });
        }
    }
    public static LoadCss(cssUrl: string) {
        const em = document.getElementById(cssUrl);
        if (!em) {
            const link = document.createElement('link');
            link.rel = 'stylesheet'
            link.href = cssUrl;
            link.id = cssUrl;
            document.head.appendChild(link);
            return new Promise((resolve, reject) => {
                link.onload = resolve;
            });
        }
    }
}
