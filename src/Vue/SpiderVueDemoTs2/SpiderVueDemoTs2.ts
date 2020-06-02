import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpiderVueDemoTs2 extends Vue {
  @Prop()
  public ComponentInstance =null;
  @Prop()
  msg: string = "Hello SpiderVueDemoTs2";
}
