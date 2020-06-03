import SpiderVueTab from "../../Vue/SpiderVueTab/SpiderVueTab";

const SpiderDemoBusiness = (thiscontrol: ComponentInstance) => {
    console.log('+++ SpiderDemoBusiness +++');
    console.log(thiscontrol);
    console.log(thiscontrol.parent);
    console.log(thiscontrol.parent?.ControlInsts);
    console.log(thiscontrol.parent?.ControlInsts[0]);
    console.log(thiscontrol.parent?.ControlInsts[1]);
    console.log(thiscontrol.parent?.ControlInsts[2]);
    console.log(thiscontrol.parent?.ControlInsts[3]);
    const textBox = thiscontrol.parent?.ControlInsts.find(t => t.name === 'SpiderTextBox') as SpiderTextBox;
    const button = thiscontrol.parent?.ControlInsts.find(t => t.name === 'SpiderButton') as SpiderButton;
    const tab = thiscontrol.parent?.ControlInsts.find(t => t.name === 'SpiderVueComponent') as SpiderVueComponent<SpiderVueTab>;
    button.addEventListener('Click', (ev) => {
        console.log(ev);
        console.log(tab);
        console.log(tab.vueInst.testVueGet);
        console.log(tab.vueInst.testVueMethod());
        console.log(tab.vueInst.$props);
        console.log(tab.vueInst.ComponentInstance);
        textBox.Value = ev.detail;
    });
    console.log('--- SpiderDemoBusiness ---');
}

