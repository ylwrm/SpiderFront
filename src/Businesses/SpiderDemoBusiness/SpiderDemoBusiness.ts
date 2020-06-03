const SpiderDemoBusiness = (thiscontrol: ComponentInstance) => {
    console.log('+++ SpiderDemoBusiness +++');
    console.log(thiscontrol);
    console.log(thiscontrol.parent);
    console.log(thiscontrol.parent?.ControlInsts);
    console.log(thiscontrol.parent?.ControlInsts[0]);
    console.log(thiscontrol.parent?.ControlInsts[1]);
    console.log(thiscontrol.parent?.ControlInsts[2]);
    console.log(thiscontrol.parent?.ControlInsts[3]);
    console.log('--- SpiderDemoBusiness ---');
}

