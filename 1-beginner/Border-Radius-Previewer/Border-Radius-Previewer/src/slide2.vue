<template>
  <div :style="{ display: 'flex', 'justify-content': 'flex-start' }" class="bar">
    <div
      class="slider-box"
      :style="{ height: outerWidth + 10 + 'px', background: outBg }"
      @mousedown="handleClickZong"
    >
      <div
        :class="['slider-nei', isClick ? 'transtion' : '']"
        :style="{
          height: moveDistanceTwo - moveDistanceOne + 'px',
          top: `${moveDistanceOne + 10}px`,
          background: neiBg,
        }"
      ></div>
      <!-- <div
        :style="{
          transform: `translateX(${moveDistance}px)`,
        }"
        :class="{
          'point-box': true,
          zhua: isMove,
          transtion: isClick,
        }"
        v-if="!range"
        @mousedown.stop.prevent="handleMousedown"
      ></div> -->
      <div
        :style="{
          transform: `translateY(${moveDistanceOne}px)`,
          background: btnBg,
        }"
        :class="{
          'point-box': true,
          zhua: isMove,
          transtion: isClick,
        }"
        v-if="range"
        @mousedown.stop.prevent="handleMousedownOne"
      >
        {{ Math.trunc(moveDistanceOne * rate) + min }}%
      </div>
      <div
        :style="{
          transform: `translateY(${moveDistanceTwo}px)`,
          background: btnBg,
        }"
        :class="{
          'point-box': true,
          zhua: isMove,
          transtion: isClick,
        }"
        v-if="range"
        @mousedown.stop.prevent="handleMousedownTwo"
      >
        {{ 100 - Math.trunc(moveDistanceTwo * rate) + min }}%
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      range: true, //是否开启双滑块
      isClick: false, //是否直接点击
      isMove: false, //是否处于滑动状态
      moveDistance: 0,
      initX: 0, //记录鼠标点下时的坐标，用于移动中求差值
      moveStart: 0, //进度条的开始位置
      moveEnd: 0, //进度条的结束位置
      moveDistanceOne: 0, //滑块一的位置
      moveDistanceTwo: 50, //滑块二的位置
      rate: 1, // 比率
      radiusArr: []
    };
  },
  props: {
    outerWidth: {
      type: Number,
      default: 400,
    },
    // 可选择范围的较大值
    max: {
      type: Number,
      default: 750,
    },
    // 外层背景色
    outBg: {
      type: String,
      default: "#F0F0F0",
    },
    // 滑块背景色
    btnBg: {
      type: String,
      default: "MediumVioletRed",
    },
    // 内层背景色
    neiBg: {
      type: String,
      default: "#E5EDFF",
    },
    // 可选择范围的较小值
    min: {
      type: Number,
      default: 150,
    },
    // 已经选择的范围
    valueRange: {
      type: Array,
      default: [350, 550],
    },
  },
  watch: {},
  mounted() {
    let max_min = this.max - this.min;
    this.rate = max_min / this.outerWidth;
    this.moveDistanceOne = (this.valueRange[0] - this.min) / this.rate;
    this.moveDistanceTwo = (this.valueRange[1] - this.min) / this.rate;
  },
  methods: {
    //移动端 touchstart 点击监听 ontouchmove 移动监听 ontouchend 松开监听，e.changedTouches[0] 元素偏移的一些数据
    //PC端 mousedown 点击监听 onmousemove 移动监听 onmouseup 松开监听
    /**
     * 初始坐标就是鼠标点下时的clientY坐标，这样就可以做到将slider放在页面任何位置，拖动原点偏移的量也是正确的，
     * 因为原点移动距离是用鼠标移动的位置和鼠标点下的位置做差值计算，所以不用担心这里的clientY会因为slider放在
     * 别的地方而导致距离计算错误
     * @param e
     */
    //鼠标点击
    // handleMousedown(e) {
    //   this.isMove = true;
    //   this.initX = e.clientY;
    //   const sliderDomWidth = this.outerWidth;
    //   // const sliderDomWidth = document.getElementsByClassName("slider-box")[0].clientWidth;
    //   document.onmousemove = (e) => {
    //     if (this.isMove) {
    //       this.moveDistance += e.clientY - this.initX;
    //       this.initX = e.clientY;
    //       if ((this.moveDistance / sliderDomWidth) * 100 > 100) {
    //         this.moveDistance = sliderDomWidth;
    //         return;
    //       }
    //       if ((this.moveDistance / sliderDomWidth) * 100 < 0) {
    //         this.moveDistance = 0;
    //         return;
    //       }
    //     }
    //   };
    //   document.onmouseup = (e) => {
    //     this.isMove = false;
    //     document.onmousemove = null;
    //   };
    // },
    /**
     * 当点击进度条某一个位置时，快捷设置进度条的位置，这里就需要用offsetX而不是clientY了。这里需要设置的便宜距离是鼠标距离目标元素的距离而不是鼠标在整个页面上的坐标
     * @param e
     */
    handleClickZong(e) {
      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      }, 300);
      const sliderDomWidth = this.outerWidth;
      this.moveDistance = e.offsetX - 10;
    },
    //滑动滑块1
    handleMousedownOne(e) {
      this.isMove = true;
      let currentDistance = e.clientY;
      const sliderDomWidth = this.outerWidth;
      document.onmousemove = (e) => {
        if (this.isMove) {
          const moveX = e.clientY - currentDistance;
          currentDistance = e.clientY;
          this.moveDistanceOne += moveX;
          this.radiusArr = [Math.trunc(this.moveDistanceOne * this.rate) + this.min, 100 - Math.trunc(this.moveDistanceTwo * this.rate) + this.min]
          this.$emit('move2', this.radiusArr)
          if (this.moveDistanceOne > this.outerWidth) {
            this.moveDistanceOne = this.outerWidth;
            return;
          }
          if (this.moveDistanceOne < 0) {
            this.moveDistanceOne = 0;
            return;
          }
          // if (this.moveDistanceOne > this.moveDistanceTwo) {
          //   this.moveDistanceOne = this.moveDistanceTwo;
          //   return;
          // }
        }
      };
      document.onmouseup = (e) => {
        this.isMove = false;
        document.onmousemove = null;
      };
    },
    //滑动滑块2
    handleMousedownTwo(e) {
      this.isMove = true;
      let currentDistance = e.clientY;
      const sliderDomWidth = this.outerWidth;
      document.onmousemove = (e) => {
        if (this.isMove) {
          const moveX = e.clientY - currentDistance;
          currentDistance = e.clientY;
          this.moveDistanceTwo += moveX;
          this.radiusArr = [Math.trunc(this.moveDistanceOne * this.rate) + this.min, 100 - Math.trunc(this.moveDistanceTwo * this.rate) + this.min]
          this.$emit('move2', this.radiusArr)
          if (this.moveDistanceTwo > this.outerWidth) {
            this.moveDistanceTwo = this.outerWidth;
            return;
          }
          // if (this.moveDistanceTwo < this.moveDistanceOne) {
          //   this.moveDistanceTwo = this.moveDistanceOne;
          //   return;
          // }
          if (this.moveDistanceTwo < 0) {
            this.moveDistanceTwo = 0;
            return;
          }
        }
      };
      document.onmouseup = (e) => {
        this.isMove = false;
        document.onmousemove = null;
      };
    },
  },
};
</script>
<style lang="less" scoped>
// .bar {
//   margin-left: 500px;
// }

.slider-box {
  width: 10px;
  border-radius: 20px;
  position: relative;
}

.slider-nei {
  position: absolute;
  left: 0;
  top: 0;
  height: 0;
  width: 10px;
  border-radius: 20px;
}

.point-box {
  width: 43px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  top: -5px;
  left: -15px;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}

.point-box:hover {
  cursor: grab;
}

.zhua:active {
  cursor: grabbing;
}

.transtion {
  transition: all 0.3s;
}
</style>
