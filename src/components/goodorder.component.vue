<template>
  <ul>
    <li v-for="(item, index) in list">
      <img :src="item.cover" alt="">
      <div>
        <h6>{{item.name}}</h6>
        <p><span>&yen;{{item.price}}</span><span>x {{item.count}}</span></p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list_in: {
      default: []
    }
  },
  data() {
    return {
      list: this.list_in,
    }
  },
  watch: {
    list_in(newValue){
      this.list = newValue;
    }
  },
  mounted() {},
  updated() {},
  methods: {
    
  }
}
</script>


<style scoped lang='scss'>
@import "../assets/scss/common";

ul{
  li{
    border-bottom: 1px solid $border;
    padding: $padding;
    overflow: hidden;
    background: #fff;
    img{
      float: left;
      width: 24%;
      border: 1px solid #eee;
    }
    div{
      float: right;
      width: 76%;
      padding-left: 10px;
      h6{
        font-weight: 500;
        line-height: 1.8rem;
        margin-bottom: 10px;
      }
      p{
        overflow: hidden;
        span:first-child{
          float: left;
          color: $color-primary;
        }
        span:last-child{
          float: right;
        }
      }
      
    }
  }
}
</style>

