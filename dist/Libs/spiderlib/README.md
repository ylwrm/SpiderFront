# lib
## XmlUtility
```typescript
declare class XmlUtility {
    static Xml2json(data: string, arrayChecker: (node: Element) => boolean): any;
}
```

## Guid
```typescript
declare class Guid {
    static NewGuid(): string;
}
```

## HttpClient
```typescript
declare class HttpClient {
    static get(url: string): Promise<string>;
}
```

## FileSystem
```typescript
declare class FileSystem {
    static GetFileSystems(url: string): Promise<Spider.FileSystemItem[]>;
}
```
