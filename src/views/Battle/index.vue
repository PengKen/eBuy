<template>
<div class="battle-index">
  <keep-alive include="battle">
    <router-view/>
  </keep-alive>



</div>
</template>

<script>
export default {
    name: "BattleIndex",
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.battle-index {
    height: 100%;
}
</style>

