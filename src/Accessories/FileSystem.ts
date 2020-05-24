class FileSystem {
    public static async GetFileSystems(url: string) {
        let fses: Accessory.FileSystemItem[] = [];
        const resp = await HttpClient.get(url + '/' + '__fs.json');
        fses = JSON.parse(resp) ;
        return fses;

        // const resp = await HttpClient.get(url);
        // const fses: Accessory.FileSystemItem[] = [];
        // // chrome 75
        // if (resp.includes('addRow') && resp.includes('onHasParentDirectory();')) {
        //     const reRow = /<script>addRow\("(.*)","(.*)",(.*),(.*),"(.*)",(\d*),"(.*)"\);<\/script>/g;
        //     let result;
        //     while ((result = reRow.exec(resp)) !== null) {
        //         const name = result[1];
        //         const isDir = result[3] === "1";
        //         fses.push({
        //             name: name,
        //             isDir: isDir
        //         });
        //     }
        // }
        // // chrome 49
        // if (resp.includes('addRow') && !resp.includes('onHasParentDirectory();')) {
        //     const reRow = /<script>addRow\("([^(..)].*)","(([^(..)]).*)",(\d*),"(.*)"\);<\/script>/g;
        //     let result;
        //     while ((result = reRow.exec(resp)) !== null) {
        //         const name = result[1];
        //         const isDir = result[4] === "1";
        //         fses.push({
        //             name: name,
        //             isDir: isDir
        //         });
        //     }
        // }
        // // iis
        // if (resp.includes('<pre>')) {
        //     const reRow = /([^<]*)(\s+)((&lt;dir&gt;)|(\d*)) <A HREF="([^<]*)">([^>]*)<\/A><br>/g;
        //     let result;
        //     while ((result = reRow.exec(resp)) !== null) {
        //         const name = result[7];
        //         const isDir = result[3] === '&lt;dir&gt;';
        //         fses.push({
        //             name: name,
        //             isDir: isDir
        //         });
        //     }
        // }
        // return fses;
    }
}