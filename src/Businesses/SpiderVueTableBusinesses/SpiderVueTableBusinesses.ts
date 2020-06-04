import SpiderVueTable from "../../Vue/SpiderVueTable/SpiderVueTable";

const SpiderVueTableBusinesses = (thiscontrol: ComponentInstance) => {
    console.log('+++ SpiderVueTableBusinesses +++');
    console.log(thiscontrol);
    const table = thiscontrol.parent?.ControlInsts.find(t => t.name === 'SpiderVueTable') as SpiderVueComponent<SpiderVueTable>;
    table.vueInst.UpdateData({
        data: [
            {
                Name: 'A1',
                Code: 'A1'
            },
            {
                Name: 'A2',
                Code: 'A2'
            }
        ],
        totalcount: 100
    });
    console.log('--- SpiderVueTableBusinesses ---');
}

