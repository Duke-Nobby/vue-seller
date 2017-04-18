<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menus-wrapper">
      <ul class="ul-class">
        <li class="menu-item" v-for="item in goods">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="foods-wrapper">
      <ul >
        <li class="good-list good-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul class="ul-class">
            <li class="food-item" v-for="food in item.foods">
              <div>
                <span style="display: block" class="">{{food.name}}</span>
                <span style="display: block" class="">{{food.price}}</span>
                <span style="display: block" class="">{{food.description}}</span>
              </div>
            </li>

          </ul>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import IScroll from 'iscroll';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(function(){
            this._initScroll();
            this._calculateHeight();
          })
        }
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];

    },
    methods:{
      _calculateHeight(){
        let foodList = this.$refs['foods-wrapper'].getElementByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(0);
        for (let i = 0;i<foodList.length;i++){
          let item= foodList[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _initScroll:function(){
        this.menuSroll = new IScroll(this.$refs['menus-wrapper'],{});
        this.foodSroll = new IScroll(this.$refs['foods-wrapper'],{});
      },
    },
    data(){
      return {
        goods: {},
        listHeight:[],
        scrollY
      };
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../commons/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 180px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .ul-class
        -webkit-padding-start 0
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
    .menu-item
      display table
      height 54px
      width 56px
      text-align center
      border-1px(rgba(7, 17, 27, 0.1))
      line-height 14px
      padding 0 12px
      .text
        display table-cell
        vertical-align middle
        width 56px
        font-size 12px
      .icon
        vertical-align middle
        display inline-block
        height 12px
        width 12px
        background-size 12px 12px
        background-repeat no-repeat
        margin-right 2px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')

  &.goods-wrapper
    flex 1

</style>
