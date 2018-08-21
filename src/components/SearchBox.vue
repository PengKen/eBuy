<template>
    <div id="search-box">
    <search
      placeholder="搜索用户"
      @result-click="resultClick"
      :results="results"
      v-model="value"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search">
      <slot>
        <divider v-if="haveRes == false" class="divider">搜索不到结果哦</divider>
        <ul>
          <li :key="index" v-for="(user,index) in  users" @click="personalBattle(user.userId)">
            <img class="portrait" :src="user.portrait" alt="">
            <div>
              <div class="name">{{ user.name }}</div>
              <div>
                <img class="medal" :src="user.honor.url" />
                <span class="honor">{{user.honor.title}}</span>
              </div>
            </div>
            <div class="win-rate"><span class="win">胜</span><span class="num">{{user.win}}/{{user.all}}</span></div>
            <button class="challenge" @click.stop="challenge(user.userId)">挑战</button>
          </li>
        </ul>
      </slot>
    </search>
    </div>
</template>

<script>
  import { Search, Divider } from 'vux'
  import * as API from "@/api/home";
  export default {
    components: {
      Search,
      Divider
    },
    data () {
      return {
        results: [],
        value:'',
        users: [],
        haveRes: true
      }
    },
    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        // this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        API.searchUser(this.value).then(res => {
          console.log(res)
          this.users = res
          if(res.length == 0) {
            this.haveRes = false
          }else {
            this.haveRes = true
          }
        })

    
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
        this.users = []
        this.haveRes = true
      },
      personalBattle(userId) {
        this.$emit('showPersonal',userId)
        console.log('show personal')
      },
      challenge(userId) {
        this.$emit('challenge',userId)
      }
    },
  }
</script>

<style scoped lang="less">
    .vux-search-box {
      .weui-search-bar{
        background-color: linear-gradient(120deg, #f77062 0%, #c7000b 100%) !important;
    }

    .divider {
      margin: 0.3rem;
    }
    ul {
      margin: 0.2rem 0;
      li {
        display: flex;
        line-height: 0.8rem;
        list-style: none;
        font-size: 0.4rem;
        align-items: center;
        justify-content: space-around;
        padding: 0.1rem 0;
        margin: 0 0.2rem 0.3rem;
        border-radius: 0.2rem;
        // border: 1px solid #eee;
        background: #f9f9f9;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
        .portrait {
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
          border: 1px solid #ddd;
        }
        .challenge {
          display: inline-block;
          width: 1.3rem;
          height: 0.7rem;
          border-radius: 1.6rem;
          font-size: 0.35rem;
          background: orange;
          color: white;
          border: none;
        }
        .medal {
          height: 0.7rem;
          width: 0.7rem;
          position: relative;
          // z-index: 1;
          // vertical-align: baseline;
        }
        .honor {
          line-height: 0.5rem;
          font-size: 0.3rem;
          vertical-align: top;
          display: inline-block;
          padding: 0 0.1rem;
          border-radius: 0 0.1rem 0.1rem 0;
          background: #ee3333;
          color: white;
          margin-left: -0.2rem;
          position: relative;
          top: 0.1rem;
        }
        .name {
          text-align: left;
          font-size: 0.5rem;
          font-weight: bold;
          padding-left: 0.1rem;
        }
        .win-rate {
          font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
          .win {
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: white;
            font-size: 0.3rem;
            background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
            margin: 0 0.1rem 0 0.3rem;
            border-radius: 0.1rem;
            vertical-align: middle;
            text-align: center;
          }
          .num {
            display: inline-block;
            width: 3em;
            margin-right: 0.2rem;
          }
        }
      }
    }


  }
</style>
