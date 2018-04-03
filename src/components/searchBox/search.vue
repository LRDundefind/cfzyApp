<template>
	<div class="searchBox pos-r">
		<input v-model="searchValue" placeholder="请输入筛选内容" @input="searchChange"/>
		<div class="clearSearch pos-a" @click="clearSearch"></div>
	</div>
</template>
<script>

export default {
	name:'search-box',
    data () {
        return {
            searchValue:''
        }
    },
    mounted () {

    },
    methods: {
        clearSearch() {
        	this.searchValue = '';
        },
        searchChange() {
        	console.log(this.searchValue)
        }   
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	
	.searchBox{
		padding: 0.2rem 0.5rem;
		background: #fff;
		input{
		    display: block;
		    width: 100%;
		    height: 0.9rem;
		    box-sizing: border-box;
		    padding-left: 1rem;
		    border-radius: 2em;
		    font-size:  $fons_size_26;

			background:#e1fcef url(../../assets/kehu_search_icon.png);
			background-position: 0.3rem center;
    		background-repeat: no-repeat;

		}
		.clearSearch{
			top: 0.2rem;
			right: 0.5rem;
			width: 0.9rem;
			height: 0.9rem;
			background: url(../../assets/kehu_del_icon.png) center;
			background-repeat: no-repeat;
		}
	}
</style>