"use strict";
var emXml = document.getElementById('xml');
var emJson = document.getElementById('json');
var emTransform = document.getElementById('transform');
// init
emXml.textContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<apparray>\n    <app name=\"Spider\">\n        <root>ConfigurationSpider</root>\n    </app>\n    <app name=\"Spider2\">\n        <root>ConfigurationSpider2</root>\n    </app>\n</apparray>\n";
emTransform.addEventListener('click', function (ev) {
    var xml = emXml.textContent;
    if (xml) {
        console.log(xml);
        var json = XmlUtility.Xml2json(xml, function (node) { return node.tagName.endsWith('array'); });
        emJson.textContent = JSON.stringify(json, null, 4);
    }
});
//# sourceMappingURL=demo-XmlUtility.js.map