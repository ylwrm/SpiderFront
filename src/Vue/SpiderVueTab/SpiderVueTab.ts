import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpiderVueTab extends Vue {
  @Prop()
  private tabs: {
    title: string,
    name: string
  }[] = [
      {
        title: 'Tab1',
        name: 'Tab1'
      }, {
        title: 'Tab2',
        name: 'Tab2'
      }
    ];
  @Prop()
  private msg: string = "Hello SpiderVueTab";
}
