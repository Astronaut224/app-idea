<template>
  <div id="app">
    <div class="stars">
      <div @click="index" v-for="(item,index) in statrsCount" :key="index" ref="star" class="star"/>
    </div>
    <h1>Border-Radius-Previewer</h1>
    <slide1 :max="100" :min="0" :valueRange="[0, 100]" @move1="getTopX"> </slide1>
    <slide2 :max="100" :min="0" :valueRange="[0, 100]" style="display: inline-block" class="slide21" @move2="getLeftY"> </slide2>
    <div class="box-border" :style='style1'></div>
    <slide2 :max="100" :min="0" :valueRange="[0, 100]" style="display: inline-block" class="slide22" @move2="getRightY"> </slide2>
    <slide1 :max="100" :min="0" :valueRange="[0, 100]" class="slide12" @move1="getBottomX"> </slide1>
    <div class="radius-border">{{style1}}</div>
    <button id="myButton" class="copyButton" @click="copyValue">Copy</button>
  </div>
</template>
<script>
import slide1 from "./slide1";
import slide2 from "./slide2";
export default {
  name: 'index',
  components: { slide1, slide2 },
  data() {
    return {
      statrsCount:1800,//星星数量
      distance:1000,//间距
      TopLeftrx: '0%',
      TopRightrx: '0%',
      BottomLeftrx: '0%',
      BottomRightrx: '0%',
      TopLeftry: '0%',
      TopRightry: '0%',
      BottomLeftry: '0%',
      BottomRightry: '0%',
      style1: ''
    };
  },
  watch: {},
  created() {
    this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
    // this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx}` + '/' + `22${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
    console.log(this.style1);
  },
  updated() {
    this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
  },
  mounted(){
    let _this = this
    let starArr = _this.$refs.star
    console.log(starArr)
    starArr.forEach(item =>{
        var speed = 0.2 + (Math.random() * 1);
        var thisDistance = _this.distance + (Math.random() * 300);
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform=`translate3d(0,0,-${thisDistance}px)
        rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`
    })
  },
  methods: {
    getTopX (val) {
      this.TopLeftrx = val[0] + '%';
      this.TopRightrx = val[1] + '%';
      this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
      // console.log(this.style1);
    },

    getBottomX (val) {
      this.BottomLeftrx = val[0] + '%';
      this.BottomRightrx = val[1] + '%';
      this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
      // console.log(this.style1);
    },

    getLeftY (val) {
      this.TopLeftry = val[0] + '%';
      this.BottomLeftry = val[1] + '%';
      this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
      console.log(this.style1);
    },

    getRightY (val) {
      this.TopRightry = val[0] + '%';
      this.BottomRightry = val[1] + '%';
      this.style1 = `border-radius: ${this.TopLeftrx} ${this.TopRightrx} ${this.BottomRightrx} ${this.BottomLeftrx} / ${this.TopLeftry} ${this.TopRightry} ${this.BottomRightry} ${this.BottomLeftry}`
      console.log(this.style1);
    },

    copyValue () {
      navigator.clipboard.writeText(this.style1);
      alert("Copy Successfully!")
    }
  },
};
</script>
<style lang="less" scoped>
#app {
  position: relative;
}

h1 {
  text-align: center;
  line-height: 100px;
  font-size: 3em;
  background-image: linear-gradient(to right, Yellow,MediumVioletRed);
  -webkit-background-clip: text;
  color: transparent;
}

.box-border {
  position: absolute;
  left: 50%;
  top: 245%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  display: inline-block;
  justify-content: center;
  background-image: linear-gradient(MediumVioletRed, Orange)
}

.slide21 {
  position: absolute;
  left: 32%;
}

.slide22 {
  position: absolute;
  left: 67%;
}

.slide12 {
  position: absolute;
  top: 390%;
  left: 36%;
}

.radius-border {
  position: absolute;
  width: 400px;
  line-height: 50px;
  text-align: center;
  left: 37%;
  top: 410%;
  border-radius: 25px;
  background-color:	Orange;
}

.copyButton {
  position: absolute;
  left: 65%;
  top: 410%;
  width: 50px;
  height: 50px;
  background-color: Orange;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.copyButton:hover {
  transform: scale(1.2);
  transition: all .5s;
}

.copyButton:active {
  transform: scale(1);
  transition: all .1s;
}

/* 星空背景CSS */
@keyframes rotate {
    0%{
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100%{
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
}
.stars{
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left:50%;
    animation: rotate 90s infinite linear ;
    bottom: 0;
}
.star{
    width: 2px;
    height: 2px;
    background: #f7f7b8;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
}
html,
body{
    background: radial-gradient(200% 100% at bottom center,#f7f7b6,#e96f92,#1b2947);
    background: radial-gradient(220% 105% at top center,#1b2947 10%,#75517d 40%,#e96f92 65%,#f7f7b6);
    background-attachment: fixed;
    overflow: hidden;
    height: 100%;
    margin: 0px;
    padding: 0px;
}
</style>
