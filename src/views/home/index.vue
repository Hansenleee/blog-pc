<template>
  <div class="home-page">
    <header v-show="categoryName">
      {{ categoryName }}
    </header>
    <div class="articles">
      <transition-group name="list">
        <div v-for="article in articles" :key="article.id" class="article-item">
          <h2 class="title">
            <a @click="handleGoDetail(article)">{{ article.title }}</a>
          </h2>
          <p class="desciption">{{ article.desciption }}</p>
          <div class="info">
            <span>{{ `${article.date}000` | dateFilter }}</span>
            <span class="spot"> • </span>
            <router-link
              class="category"
              :to="{name: 'home', query: {categoryId: article.cate_line_id}}">
              {{ article.cate_name }}
            </router-link>
          </div>
        </div>
      </transition-group>
      <pagination
        :currentPage="page.currentPage"
        :totalPages="totalPages"
        @onChange="handlePageChange"/>
    </div>
    <modal
      :visible="modal.visible"
      title="查看文章请输入密码"
      @onClose="handleOnClose"
      @onOk="handleOnOk">
      <template>
        <div class="password">
          <input type="password" placeholder="文章查看密码" v-model="modal.password"/>
        </div>
        <p class="password__err">{{ modal.err }}</p>
      </template>
    </modal>
  </div>
</template>
<script type="text/babel">
  import md5 from 'md5'

  export default {
    data() {
      return {
        articles: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          totalCount: 10,
        },
        modal: {
          visible: false,
          password: '',
          record: {},
          err: '',
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
      /**
       * 当前分类
       * @return {Stirng} 分类名称
       */
      categoryName() {
        const categoryId = this.$route.query.categoryId

        if (!categoryId || this.articles.length === 0) {
          return ''
        }

        return this.articles[0].cate_name || ''
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
            categoryId: this.$route.query.categoryId || 0,
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
      /**
       *  进入详情
       * @param {Object} article - 文章详情
       */
      handleGoDetail(article) {
        if (article.type === '2') {
          this.modal.visible = true
          this.modal.record = article
          this.modal.err = ''
        } else {
          this.$router.push({
            name: 'article-detail',
            params: {
              id: article.id,
            },
          })
        }
      },
      /**
       * 关闭modal
       */
      handleOnClose() {
        this.modal.visible = false
      },
      /**
       * modal确认
       */
      handleOnOk() {
        this.$axios.get(`/articles/${this.modal.record.id}/password/${this.modal.password}`)
          .then(() => {
            this.$router.push({
              name: 'article-detail',
              params: {
                id: this.modal.record.id,
              },
              query: {
                p: md5(this.modal.password),
              },
            })
            this.handleOnClose()
          })
          .catch((err) => {
            this.modal.err = err.message
          })
      },
    },
    watch: {
      /**
       * 监听路由
       */
      $route() {
        this.fetch()
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .home-page {
    height: 100%;
    padding: 50px 8%;
    overflow: auto;

    & header {
      padding: 20px 0;
      font-size: 36px;
      font-weight: bold;
      color: #000;
      border-bottom: 1px solid #ddd;
    }

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
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .password {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 15px;

    & > input {
      width: 100%;
      border-radius: 4px;
      outline: none;
      border: 0;
    }
  }
  .password__err {
    margin: 10px 0 0 0;
    color: #f5222d;
    font-size: 14px;
  }
</style>
