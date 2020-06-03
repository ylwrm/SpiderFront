const SpiderDemoBusiness = (thiscontrol: ComponentInstance) => {
    console.log('+++ SpiderDemoBusiness +++');
    console.log(thiscontrol);
    console.log(thiscontrol.parent);
    console.log(thiscontrol.parent?.ControlInsts);
    console.log(thiscontrol.parent?.ControlInsts[0]);
    console.log(thiscontrol.parent?.ControlInsts[1]);
    console.log(thiscontrol.parent?.ControlInsts[2]);
    console.log(thiscontrol.parent?.ControlInsts[3]);
    const textBox = thiscontrol.parent?.ControlInsts.find(t=>t.name === 'SpiderTextBox') as SpiderTextBox;
    const button = thiscontrol.parent?.ControlInsts.find(t=>t.name === 'SpiderButton') as SpiderButton;
    button.addEventListener('Click',(ev)=>{
        console.log(ev);
        textBox.Value = ev.detail;
    });
    console.log('--- SpiderDemoBusiness ---');
}

