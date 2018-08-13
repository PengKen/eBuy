<template>
    <div id="search-box">
      <search
        placeholder="搜索用户"

        :results="results"
      ></search>
    </div>
</template>

<script>
  import { Search } from 'vux'

  export default {
    components: {
      Search
    },
    data () {
      return {
        results: [{title:'aaa'}],
      }
    }
  }
</script>

<style scoped lang="less">
    .vux-search-box {
      .weui-search-bar{
        background-color: linear-gradient(120deg, #f77062 0%, #c7000b 100%) !important;
    }

  // .weui-search-bar__label{
  //   border-radius: 10px !important;
  //   background: red;
  // }

  }
</style>
