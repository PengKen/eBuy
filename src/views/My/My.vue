<template>
<div class="my">
  <router-view></router-view>
</div>
</template>

<script>
export default {
    name: "my",
    data() {
        return {
        }
    }
}
</script>

<style lang="less" scoped>
.my {
    min-height: 100%;
    background: white;
}
</style>

