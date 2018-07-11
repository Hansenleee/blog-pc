<template>
  <div class="pagination flex">
    <div
      class="left button"
      :class="{disable: currentPage <= 1}"
      @click="handleChange(currentPage - 1)">前一页</div>
    <p>{{ currentPage }} / {{ totalPages }}</p>
    <div
      class="right button"
      :class="{disable: currentPage >= totalPages}"
      @click="handleChange(currentPage + 1)">后一页</div>
  </div>
</template>
<script type="text/babel">
  export default {
    props: {
      /**
       * 当前页数
       */
      currentPage: {
        type: Number,
        default: 1,
      },
      /**
       * 总页数
       */
      totalPages: {
        type: Number,
        default: 1,
      },
      /**
       * 切换页数回调
       */
      onChange: {
        type: Function,
        default: () => {},
      },
    },
    methods: {
      /**
       * 分页点击
       * @param {Number} page - 页码
       */
      handleChange(page) {
        if (page === this.currentPage ||
            page < 1 ||
            page > this.totalPages) {
          return
        }
        this.$emit('onChange', page)
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~assets/style/flexible.styl"

  .pagination {
    margin: 40px 0;
    font-size: 14px;
    color: #999;
    line-height: 34px;
    text-align: center;
    cursor: pointer;

    & .button {
      width: 70px;
      height: 34px;
      border: 1px solid #999;
      border-radius: 40px;

      &.disable {
        color: #ddd;
        border-color: #ddd;
      }

      &:not(.disable):hover {
        color: #666;
        border-color: #666;
      }
    }

    & > p {
      margin: 0 30px;
    }
  }
</style>
