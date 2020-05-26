import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpiderVueDemoTs extends Vue {
  @Prop()
  private msg!: string;
}
