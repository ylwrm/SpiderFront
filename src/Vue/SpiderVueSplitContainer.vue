<template>
  <div class="layoutOuter">
    <div v-if="split == '左右分割'" class="splitOuter" ref="spiltOuter">
      <div
        :style="{ width: splitfirst, height: '100%' }"
        class="splitFirst"
        ref="splitFirst"
      ></div>
      <div
        class="splitVertical"
        @mousedown="splitClickHor($event)"
        ref="splitVertical"
        :style="{ left: splitfirst }"
      ></div>
      <div
        class="splitSecond"
        :style="{
          width: `calc(${splitsecond} - ${splitVerticalSize})`,
          height: '100%',
          left: `calc(${splitfirst} + ${splitVerticalSize})`,
        }"
        ref="splitSecond"
      ></div>
    </div>
    <div v-if="split == '上下分割'" class="splitOuter" ref="spiltOuter">
      <div
        :style="{ height: splitfirst, width: '100%' }"
        class="splitFirst"
        ref="splitFirst"
      ></div>
      <div
        class="splitHorizontal"
        @mousedown="splitClickVer($event)"
        ref="splitHorizontal"
        :style="{ top: splitfirst }"
      ></div>
      <div
        class="splitSecond"
        :style="{
          height: `calc(${splitsecond} - ${splitVerticalSize})`,
          width: '100%',
          top: `calc(${splitfirst} + ${splitVerticalSize})`,
        }"
        ref="splitSecond"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 分割方向
      split: null,
      // 判断是否移动的中间div
      isChange: true,
      // 移动距离的最大值的百分比
      splitMax: 80,
      // 移动距离的最小值的百分比
      splitMin: 20,
      // splitfirst模块的初始区域
      splitfirst: 0,
      // splitsecond模块的初始区域
      splitsecond: 0,
      // split中间移动div的宽度
      splitVerticalSize: '6px',
      splitHorizontalSize: '6px',
      // 获取xml数据
      config: null,
      // 主要创建配置的控件
      parent: null,
    }
  },
  methods: {
    update() {
      console.log('------分割容器打印-------')
      const context = this.parent.controlsMap
      console.log(this.config)
      this.split = this.config.分割方向
      this.splitfirst = this.config.第一区域.区域尺寸
      this.splitsecond = this.config.第二区域.区域尺寸
      this.$nextTick(() => {
        let controlFirst = context.get(this.config.第一区域.控件)
        let controlSecond = context.get(this.config.第二区域.控件)
        console.log(controlSecond)
        console.log(this.$refs.splitSecond)
        this.$refs.splitFirst.appendChild(controlFirst)
        this.$refs.splitSecond.appendChild(controlSecond)
      })
      // get container node ref from vue.$refs.
      // const container = this.$refs.container;
      // move content control to container
      // container.appendChild(control);
      // invoke resize event to adjust size of moved control and other controls.
      // window.dispatchEvent(new Event('resize'))
    },
    // 左右分割移动的函数
    splitClickHor(e) {
      this.isChange = false
      let first = this.$refs.splitFirst
      let second = this.$refs.splitSecond
      let el = this.$refs.splitVertical
      let elWidth = el.offsetWidth
      let outterWidth = this.$refs.spiltOuter.offsetWidth
      // 中间盒子移动的距离（光标的横坐标-中间盒子距离body的位置）
      var disx = e.pageX - el.offsetLeft
      document.onmousemove = (e) => {
        let elLeft = ((e.pageX - disx) / outterWidth) * 100
        // 判断是否超过最大移动距离
        elLeft = elLeft >= this.splitMax ? this.splitMax : elLeft
        // 判断是否超过最小移动距离
        elLeft = elLeft <= this.splitMin ? this.splitMin : elLeft
        el.style.left = elLeft + '%'
        first.style.width = el.style.left
        second.style.width = (1 - elWidth / outterWidth) * 100 - elLeft + '%'
        second.style.left = `calc(${first.style.width} + ${
          this.splitVerticalSize
        })`
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
        let arr = []
        arr.push(this.$refs.splitFirst.style.width + 'px')
        arr.push(this.$refs.splitSecond.style.width + 'px')
        if (window['SendMessage']) {
          window['SendMessage']({
            name: 'SplitChanged',
            obj: arr,
          })
        }
        this.$emit('SplitChanged', arr)
      }
    },
    // 上下分割函数
    splitClickVer(e) {
      this.isChange = false
      let first = this.$refs.splitFirst
      console.log(first)
      let second = this.$refs.splitSecond
      let el = this.$refs.splitHorizontal
      let elHeight = el.offsetHeight
      let outterHeight = this.$refs.spiltOuter.offsetHeight
      // 中间盒子移动的距离（光标的横坐标-中间盒子距离body的位置）
      var disy = e.pageY - el.offsetTop
      document.onmousemove = (e) => {
        let elTop = ((e.pageY - disy) / outterHeight) * 100
        // 判断是否超过最大移动距离
        elTop = elTop >= this.splitMax ? this.splitMax : elTop
        // 判断是否超过最小移动距离
        elTop = elTop <= this.splitMin ? this.splitMin : elTop
        el.style.top = elTop + '%'
        first.style.height = el.style.top
        second.style.height = (1 - elHeight / outterHeight) * 100 - elTop + '%'
        second.style.top = `calc(${first.style.height} + ${
          this.splitHorizontalSize
        })`
      }
      document.onmouseup = () => {
        window.dispatchEvent(new Event('resize'))
        document.onmousemove = document.onmouseup = null
        let arr = []
        arr.push(this.$refs.splitFirst.style.width + 'px')
        arr.push(this.$refs.splitSecond.style.width + 'px')
        if (window['SendMessage']) {
          window['SendMessage']({
            name: 'SplitChanged',
            obj: arr,
          })
        }
        this.$emit('SplitChanged', arr)
      }
    },
  },
}
</script>
<style scoped>
.splitVertical {
  position: absolute;
  top: 0;
  width: 4px;
  height: 100%;
  background: #e1e3e5;
  border-top: none;
  border-bottom: none;
  cursor: col-resize;
  /* transform: translateX(-50%); */
}
.splitHorizontal {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background: #e1e3e5;
  border-top: none;
  border-bottom: none;
  cursor: row-resize;
  /* transform: translateX(-50%); */
}
.splitOuter {
  background-color: unset;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 4px);
  position: relative;
}
.splitFirst {
  position: absolute;
  left: 0;
  box-sizing: border-box;
  top: 0;
  height: 100%;
}
.splitSecond {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
}
.layoutOuter {
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
</style>
