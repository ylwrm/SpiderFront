class HttpClient {
    public static get(url: string) {
        const promise = new Promise<string>((resolve) => {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = () => {
                if (anHttpRequest.readyState == 4) {
                    resolve(anHttpRequest.responseText);
                }
            }
            anHttpRequest.open("GET", url, true);
            anHttpRequest.send(null);
        });
        return promise;
    }
}
