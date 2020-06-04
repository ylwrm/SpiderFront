import SpiderVueTable from "../../Vue/SpiderVueTable/SpiderVueTable";

const SpiderVueTableBusinesses = (thiscontrol: ComponentInstance) => {
    console.log('+++ SpiderVueTableBusinesses +++');
    console.log(thiscontrol);
    const table = thiscontrol.parent?.ControlInsts.find(t => t.name === 'SpiderVueTable') as SpiderVueComponent<SpiderVueTable>;

    table.vueInst.addEventListenerCheckChanged((ev) => {
        console.log(ev);
    });
    table.vueInst.addEventListenerTableChange((ev) => {
        console.log(ev);
        const arr = [...Array(ev.detail.countperpage)].map((t, i) => i);
        table.vueInst.UpdateData({
            data: arr.map(t => {
                return {
                    Name: (ev.detail.page - 1) * ev.detail.countperpage + t + 1 + '',
                    Code: (ev.detail.page - 1) * ev.detail.countperpage + t + 1 + '',
                    Major: (ev.detail.page - 1) + t + '',
                    Minor: (ev.detail.page - 1) + t + 1 + '',
                }
            }),
            totalcount: 1000
        });
    });
    console.log('--- SpiderVueTableBusinesses ---');
}

