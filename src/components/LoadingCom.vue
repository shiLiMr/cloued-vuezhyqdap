<template>
    <div v-if="loadStau" class="loading">
        <div class="text">预取资源加载中…</div>
        <div class="a">
            <div class="b"></div>
        </div>
    </div>
</template>
<script setup lang='ts'>
defineProps({
    loadStau:{
        type:Boolean,
        default:false
    }
})

</script>
<style lang='scss' scoped>
.loading {
    height: 100%;
    position: absolute;
    left: 66%;
    top: 40%;
    transform: translate(-50%, 0);
    text-align: center;

    .text {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
    }

    .a {
        width: 280px;
        height: 5px;
        margin: 20px;
        border-radius: 3px;
        overflow: hidden;
        background-color: rgba(225, 225, 225, 0.16);
        .b{
            width: 5%;
            height: 100%;
            background: linear-gradient(90deg ,#48ffff 0%,#3656ff 100%);
            animation: loading 10s ease;
        }
    }
}
@keyframes loading{
    0%{
        // transform: scaleX(1);
        width: 5%;
    }
    1%{
        // transform: scaleX(38);
        width: 50%;
    }
    100%{
        // transform: scaleX(40);
        width: 100%;
    }
}
</style>
