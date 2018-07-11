<template>
  <div class="app flex">
    <div class="info">
      <div class="user">
        <div class="user-logo">
          <div/>
        </div>
        <h1>李滨 & 聂鹏的技术博客</h1>
        <p>浮生若梦，一曲折烟</p>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/style/flexible.styl"
  @import "~assets/style/common.styl"

  .app {
    height: 100vh;
    min-width: 1200px;
    overflow: hidden;

    & .info {
      position: relative;
      width: 400px;
      height: 100%;
      background: url('~assets/images/app-info.png');
      background-size: cover;
      background-position: center top;

      &:before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
      }

      & .user {
        position: relative;
        z-index: 10;
        padding: 167px 30px;
        text-align: center;
        color: #fff;

        & .user-logo {
          width: 60px;
          height: 60px;
          margin: 0 auto;
          background: #fff;
          padding: 10px;
          border-radius: 50%;
          overflow: hidden;

          & > div {
            height: 100%;
            background-image: url('~assets/images/user-logo.jpg');
            background-size: cover;
            background-position: center;
          }
        }

        & h1 {
          font-size: 28px;
          margin: 30px 0 50px;
          overflow: hidden;
        }

        & > p {
          position: relative;
          padding: 20px 0;
          font-size: 20px;
          overflow: hidden;

          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 32%;
            right: 32%
            height: 1px;
            background: rgba(255,255,255,.34);
          }

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 32%;
            right: 32%
            height: 1px;
            background: rgba(255,255,255,.34);
          }
        }
      }
    }

    & .content {
      flex: 1;
      height: 100%;
      background: #fff;
      overflow: hidden;
    }
  }
</style>
