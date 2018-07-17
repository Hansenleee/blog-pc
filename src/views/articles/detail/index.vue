<template>
  <div class="article-detail">
    <h2 class="title">{{ article.title }}</h2>
    <div class="info">
      <span>{{ updateDate | dateFilter }}</span>
      <span class="spot"> • </span>
      <a href="#" class="category">{{ article.cate_name }}</a>
    </div>
    <div class="content" v-if="article.content">
      <vue-markdown
        :source="article.content"></vue-markdown>
    </div>
  </div>
</template>
<script type="text/babel">
  import Prism from 'prismjs'

  export default {
    data() {
      return {
        article: {},
      }
    },
    computed: {
      /**
       * 日期
       * @return {Number} 时间戳
       */
      updateDate() {
        const date = this.article.date
        return date ? `${date}000` : new Date().getTime()
      },
    },
    created() {
      this.fetch()
    },
    methods: {
      /**
       * 获取文章列表
       * @return {Promise} 返回promise
       */
      fetch() {
        return this.$axios.get(`/articles/${this.$route.params.id}`, {
          params: {
            password: this.$route.query.p,
          },
        })
          .then((res) => {
            this.article = res.result

            this.$nextTick(() => {
              // 利用prism高亮
              Prism.highlightAll()
            })
          })
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .article-detail {
    height: 100%;
    padding: 50px 8%;
    overflow: auto;

    & .title {
      font-size: 28px;
      margin: 0 0 10px 0;
      font-weight: bold;
      line-height: 1.5;
    }

    & .info {
      font-size: 14px;
      color: #c7c7c7;
      margin-bottom: 20px;

      & .spot {
        margin: 0 10px;
      }

      & .category {
        color: #666;
        text-decoration: none;
      }
    }

    & .content {
      font-size: 16px;
      color: #555;
      line-height: 1.7;

      & p {
        line-height: 1.7;
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .content {
    & code {
      padding: 2px 4px;
      font-size: 90%;
      color: #c7254e;
      background-color: #f9f2f4;
      border-radius: 4px;
    }

    & a {
      color: #337ab7;
      text-decoration: none;
    }

    & img {
      max-width: 100%;
    }
  }
</style>
