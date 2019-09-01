<template>
  <div class="wscn-http404-container">
    <canvas ref="fluid" class="canvas" />
    <div class="wscn-http404">
      <div class="bullshit">
        <div class="bullshit__oops">OOPS! <small>404</small></div>
        <div class="bullshit__headline">站长说这个页面不存在…</div>
        <div class="bullshit__info">请检查您输入的URL是否正确，或者单击下面的按钮返回主页。</div>
        <a href="/" class="bullshit__return-home">返回首页</a>
        <div class="bullshit__info fs16"><b>在此放松放松</b></div>
        <div class="bullshit__info mt5">试试 按 "空格键" 或者 "p键", 或者按住鼠标划拉划拉</div>
        <div class="bullshit__info mt5">按 "s键", 保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import { WebGLFluid } from '@/assets/js/WebGLFluid'
export default {
  name: 'Page404',
  mounted() {
    this.$nextTick(function() {
      WebGLFluid(this.$refs.fluid)
    })
  }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  position: relative;
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .wscn-http404 {
    position: fixed;
    top: 20%;
    right: 50px;
    .bullshit {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #fff;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: #fff;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        width: 110px;
        height: 36px;
        margin: 15px 0;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
</style>
