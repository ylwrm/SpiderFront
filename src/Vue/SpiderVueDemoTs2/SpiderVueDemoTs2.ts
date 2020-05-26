import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpiderVueDemoTs2 extends Vue {
  @Prop()
  private msg: string = "Hello SpiderVueDemoTs2";
}
