class DomLoader {
    public static async LoadScript(scriptUrl: string) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.body.appendChild(script);
        return new Promise((resolve, reject)=>{
            script.onload = resolve;
        });
    }
    public static async LoadCss(cssUrl: string) {
        const link = document.createElement('link');
        link.rel= 'stylesheet'
        link.href = cssUrl;
        document.head.appendChild(link);
        return new Promise((resolve, reject)=>{
            link.onload = resolve;
        });
    }
}
