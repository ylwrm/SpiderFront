/// <reference path="../types/spider.d.ts" />
declare class Guid {
    static NewGuid(): string;
}
declare class XmlUtility {
    static Xml2json(data: string, arrayChecker: (node: Element) => boolean): any;
    private static tryParse;
    private static xml2jsonRec;
    private static getUniqueName;
}
declare class HttpClient {
    static get(url: string): Promise<string>;
}
declare class FileSystem {
    static GetFileSystems(url: string): Promise<Spider.FileSystemItem[]>;
}
