<template>
  <div class="home-page">
    <div class="articles">
      <div v-for="article in articles" :key="article.id" class="article-item">
        <h2 class="title">
          <router-link :to="{name: 'article-detail', params: { id: article.id}}">{{ article.title }}</router-link>
        </h2>
        <p class="desciption">{{ article.desciption }}</p>
        <div class="info">
          <span>{{ `${article.date}000` | dateFilter }}</span>
          <span class="spot"> • </span>
          <a href="#" class="category">{{ article.cate_name }}</a>
        </div>
      </div>
      <pagination
        :currentPage="page.currentPage"
        :totalPages="totalPages"
        @onChange="handlePageChange"/>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        articles: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 10,
        },
      }
    },
    computed: {
      /**
       * 总页数
       * @return {Number} 总页数
       */
      totalPages() {
        return Math.ceil(this.page.totalCount / this.page.pageSize)
      },
    },
    created() {
      this.fetch(1)
    },
    methods: {
      /**
       * 获取文章列表
       * @param {Number} page - 当前查询页码
       * @return {Promise} 返回promise
       */
      fetch(page = 1) {
        return this.$axios.get('/articles', {
          params: {
            currentPage: page,
            pageSize: this.page.pageSize,
          },
        })
          .then((res) => {
            const { list, totalCount, currentPage } = res.result
  
            this.articles = list
            this.page.currentPage = currentPage
            this.page.totalCount = totalCount
          })
      },
      /**
       * 分页回调
       * @param {Number} page - 页码
       */
      handlePageChange(page) {
        this.fetch(page)
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-page {
    height: 100%;
    padding: 50px 8%;
    overflow: auto;

    & .articles {
      
      & .article-item {
        position: relative;
        padding: 30px 0;

        &:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 0;
          height: 1px;
          width: 40%;
          background: #ddd;
        }

        & .title {
          font-size: 24px;
          margin: 0 0 10px 0;
          line-height: 1.5;
          cursor: pointer;

          & > a {
            color: #303030;
            text-decoration: none;
          }
        }

        & .desciption {
          font-size: 14px;
          color: #999;
          line-height: 1.7;
        }

        & .info {
          font-size: 12px;
          color: #c7c7c7;

          & .spot {
            margin: 0 10px;
          }

          & .category {
            color: #666;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
