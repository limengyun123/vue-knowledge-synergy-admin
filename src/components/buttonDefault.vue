<template>
    <button class="ks-button-default" @click="emitClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ButtonDefault',
    methods:{
        emitClick(){
            this.$emit('buttonClick');
        }
    }
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.ks-button-default{
	outline:none;
    margin: 1rem;
    padding: 0.6rem 1rem;
    background-color: white;
    color: #888888;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
}

.ks-button-default:hover{
    background-color:@support-color-bg;
    color: @main-color;
    border-color: @support-color-ps;
}

</style>