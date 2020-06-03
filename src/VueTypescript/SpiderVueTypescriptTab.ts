// import { Component, Prop, Vue } from 'vue-property-decorator';
declare let Component:any, Prop:any
// declare let Vue:any;
interface SpiderVueTypescriptTabComponentInstance extends VueComponentInstance {
  name?: string | undefined;
  parent?: SpiderCombination | undefined;
  div?: HTMLDivElement;
  setting:
  {
    name: string,
    type: string,
    config: {
      type: string,
      tabs: {
        title: string,
        name: string
      }[]
    }
  };
}
@Component(
  {
    template: `
    <el-tabs style="width:100%;height:100%;overflow:hidden"
      @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in ComponentInstance.setting.config.tabs"
        :key="tab.name"
        :label="tab.title">
        <div :ref="tab.name" style="width:100%;height:100%;overflow:hidden">

        </div>
      </el-tab-pane>
    </el-tabs>
  `}
)
class SpiderVueTypescriptTab extends Vue implements SpiderVueBase {
  @Prop()
  public ComponentInstance: SpiderVueTypescriptTabComponentInstance = {
    setting: {
      name: "Tab",
      type: "SpiderVueTypescriptComponent",
      config: {
        type: "SpiderVueTypescriptTab",
        tabs: [
          {
            title: 'Tab1',
            name: 'Tab1'
          }, {
            title: 'Tab2',
            name: 'Tab2'
          }
        ]
      }
    }
  };
  @Prop()
  handleClick() {
    setTimeout(() => {
      // if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      //   var evt = document.createEvent('UIEvents') as any;
      //   evt.initUIEvent('resize', true, false, window, 0);
      //   window.dispatchEvent(evt);
      // } else {
      //   window.dispatchEvent(new Event('resize'));
      // }

      if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
      } else {
        //This will be executed on old browsers and especially IE
        console.log(1)
        var resizeEvent = window.document.createEvent('UIEvents') as any;
        console.log(2)
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        console.log(3)
        window.dispatchEvent(resizeEvent);
        console.log(4)
      }
    }, 100);
  }

  get testVueGet(): string {
    return 'testVueGet';
  }

  testVueMethod() {
    return this;
  }
  Update() {
    this.$nextTick(() => {
      if (this.ComponentInstance.parent) {
        const ControlInsts = this.ComponentInstance.parent.ControlInsts;
        for (let iC = 0; iC < ControlInsts.length; iC++) {
          const ci = ControlInsts[iC];
          for (let iT = 0; iT < this.ComponentInstance.setting.config.tabs.length; iT++) {
            const tab = this.ComponentInstance.setting.config.tabs[iT];
            if (tab.name === ci.name) {
              console.log('====');
              const div = this.$refs[tab.name][0] as HTMLDivElement;
              console.log(div);
              console.log(ci.div);
              if (ci.div) {
                div.appendChild(ci.div);
              }
            }
          }
        }
        this.handleClick();
      }
    });
  }
}
