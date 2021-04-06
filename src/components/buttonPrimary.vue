<template>
    <button class="ks-button-primary" @click="emitClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ButtonPrimary',
    methods:{
        emitClick(){
            this.$emit('buttonClick');
        }
    }
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.ks-button-primary{
	outline:none;
    margin: 1rem;
    padding: 0.6rem 1rem;
    background-color: @support-color-ps;
    color: white;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
    font-size: 0.8rem;
}

.ks-button-primary:hover{
    background-color:@main-color;
}

</style>