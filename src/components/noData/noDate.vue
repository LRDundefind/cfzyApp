<template>
	<div class="noDate pos-r">
        <img src="../../assets/index/no_Stalls.png" alt="">
        <h3>暂无数据</h3>
	</div>
</template>
<script>

export default {
	name:'noDate',
    data () {
        return {
            searchValue:''
        }
    },
    mounted () {

	},
    methods: {
        
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.noDate{
    text-align: center;
    img{
        width: 2.5rem;
        margin: 1rem auto 0.5rem;;
    }
    h3{
        font-size: 0.3rem;
        padding: 0.15rem 0;
        color: #333;
    }
}
</style>