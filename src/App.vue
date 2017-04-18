<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='rating'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">卖家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view to="/"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  const ERROK = 0;
  import header from '@/components/header/header'
  export default {
    name: 'app',
    created(){
      this.$http.get(
        '/api/seller').then(function (response) {
        response = response.body;
        if (response.errno == ERROK) {
          this.seller = response.data;
        }
      }, function (response) {
      });
    },
    data(){
      return {
        seller: {}
      };
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./commons/stylus/index.styl";
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(77, 85, 93, 0.2))
      .tab-item
        flex: 1
        text-align: center
        & > a
          text-decoration: none
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
