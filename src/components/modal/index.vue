<template>
    <div class="modal" :class="{show: visible}">
      <transition name="fade">
        <div class="background" v-show="visible"/>
      </transition>
      <transition name="scroll">
        <div class="container" v-show="visible">
          <header>
            <span>{{ title }}</span>
            <div @click="handleClose">×</div>
          </header>
          <div class="content">
            <slot></slot>
          </div>
          <div class="btns flex justify-end">
            <div class="cancel" @click="handleClose">{{ cancelText }}</div>
            <div class="confirm" @click="handleConfirm">{{ confirmText }}</div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script type="text/babel">
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '提示',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
      confirmText: {
        type: String,
        default: '确认',
      },
      onClose: {
        type: Function,
        default: () => {},
      },
      onOk: {
        type: Function,
        default: () => {},
      },
    },
    methods: {
      /**
       * 关闭
       */
      handleClose() {
        this.$emit('onClose')
      },
      /**
       * 确认
       */
      handleConfirm() {
        this.$emit('onOk')
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~assets/style/flexible.styl'

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s;
    // background: rgba(0,0,0,0.4);

    &.show {
      opacity: 1;
      z-index: 1000;
    }

    & .background {
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
    }

    & .container {
      position: absolute;
      width: 520px;
      top: 20%;
      left: 50%;
      transform: translate(-50%, 0);
      background: #fff;
      border-radius: 6px;
      overflow: hidden;

      & header {
        padding: 15px;
        font-size: 20px;
        font-weight: 500;
        color: #333;
        border-bottom: 1px solid #eceeef;
        line-height: 1.4;

        & > div {
          position: absolute;
          top: 11px;
          right: 15px;
          color: #666;
          font-size: 24px;
          font-weight: 700;

          &:hover {
            color: #333;
            cursor: pointer;
          }
        }
      }

      & .content {
        padding: 15px;
        font-size: 16px;
        color: #333;
      }

      & .btns {
        border-top: 1px solid #eceeef;
        padding: 15px;

        & > div {
          padding: 8px 16px;
          font-size: 16px;
          overflow: hidden;
          border-radius: 4px;
          cursor: pointer;

          &.cancel {
            color: #333;
            border: 1px solid #ccc;
            margin-right: 10px;

            &:hover {
              background: #e6e6e6;
            }
          }

          &.confirm {
            color: #fff;
            background: #0275d8;

            &:hover {
              background: #025aa5;
            }
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .scroll-enter-active, .scroll-leave-active {
    transition: all 0.4s;
  }
  .scroll-enter, .scroll-leave-to {
    opacity: 0.4;
    transform: translate(-50%, -50px) !important;
  }
</style>
