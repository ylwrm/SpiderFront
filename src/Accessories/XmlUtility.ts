class XmlUtility {
    public static Xml2json(data: string, arrayChecker: (node: Element) => boolean) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const root = xmlDoc.children[0];
        const obj = XmlUtility.xml2jsonRec(root, arrayChecker);
        return obj;
    }
    private static tryParse(obj: string) {
        let newObj: number | string = obj;
        if (newObj.toLowerCase() === 'true') {
            return true;
        }
        if (newObj.toLowerCase() === 'false') {
            return false;
        }
        const valueFloat = Number(newObj);
        if (!isNaN(valueFloat)) {
            newObj = valueFloat;
        }
        return newObj;
    }
    private static xml2jsonRec(node: Element, arrayChecker: (node: Element) => boolean) {
        let obj: any = undefined;
        let tempArrayNodes: Element[] = [];
        // Push to array
        for (let index = 0; index < node.children.length; index++) {
            const element = node.children[index];
            tempArrayNodes.push(element);
        }

        // Check Array Type
        if (arrayChecker(node)) { // !!!Jerry: if array type, attribute will be ignored
            obj = [];
            tempArrayNodes.forEach(element => {
                obj.push(XmlUtility.xml2jsonRec(element, arrayChecker));
            });
        } else {
            if (tempArrayNodes.length === 0) { // root emtpy: <a>{here empty}</a>
                if (node.textContent && node.textContent.trim().length) { // if empty textContent use attribute
                    obj = XmlUtility.tryParse(node.textContent.trim()); // try Parse number
                } else { // if not empty textContent ignore attribute
                    if (node.attributes.length) {
                        obj = {};
                        // treat attribue as node
                        for (let index = 0; index < node.attributes.length; index++) {
                            const element = node.attributes[index];

                            let propName = XmlUtility.getUniqueName(obj, element.nodeName);
                            obj[propName] = XmlUtility.tryParse(element.value);
                        }
                    } else {
                        obj = '';
                    }
                }
            } else {
                obj = {};
                // treat attribue as node
                for (let index = 0; index < node.attributes.length; index++) {
                    const element = node.attributes[index];

                    let propName = XmlUtility.getUniqueName(obj, element.nodeName);
                    obj[propName] = XmlUtility.tryParse(element.value);
                }
                // sub element rec
                tempArrayNodes.forEach(element => {
                    let propName = XmlUtility.getUniqueName(obj, element.nodeName);
                    obj[propName] = XmlUtility.xml2jsonRec(element, arrayChecker);
                });
            }
        }
        return obj;
    }
    private static getUniqueName(obj: any, name: string) {
        let propName = name;
        let i = 0;
        while (obj[propName]) {
            propName = name + '.' + i;
            i++;
        }
        return propName;
    }
}
