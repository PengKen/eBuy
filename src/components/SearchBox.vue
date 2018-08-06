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
  #search-box{
  .weui-search-bar__label{
    border-radius: 10px !important;
    background: red;
  }

  }
</style>
