"use strict";
var emGuid = document.getElementById('guid');
var emCreate = document.getElementById('create');
emCreate.addEventListener('click', function (ev) {
    emGuid.textContent = Guid.NewGuid();
});
//# sourceMappingURL=demo-Guid.js.map