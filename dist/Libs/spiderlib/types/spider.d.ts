declare namespace Spider {
    interface FileSystemItem {
        name: string;
        isDir: boolean;
    }
    interface Application {
        name: string;
        root: string;
    }
}