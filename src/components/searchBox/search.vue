<template>
	<div class="searchBox pos-r">

		<input v-model="searchValue"  v-bind:placeholder='sendGet'  @input="searchChange"/>
		<div class="clearSearch pos-a" @click="clearSearch"></div>
		<a class="searchBtn pos-a" @click="searAll">搜索{{sendGet}}</a>
	</div>
</template>
<script>

export default {
	name:'search-box',
	props:['sendGet'],
    data () {
        return {
            searchValue:''
        }
    },
    mounted () {
		console.log(this.sendGet)
	},
    methods: {
        clearSearch() {
        	this.searchValue = '';
		},
		 searAll() {
			this.$emit('getSmeage',this.searchValue); //主动触发getSmeage方法，'this.searchValue'为向父组件传递的数据
		},
        searchChange() {
        	console.log(this.searchValue)
        }   
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	
	.searchBox{
		padding: 0.3rem;
		background: #fff;
		input{
		    display: block;
		    width: -moz-calc(100% - 1rem);
            width: -webkit-calc(100% - 1rem);
            width: calc(100% - 1rem);
		    height: 0.8rem;
		    box-sizing: border-box;
		    padding-left: 0.9rem;
		    border-radius: 2em;
		    font-size:  $fons_size_26;
		    color: $main_color999999;

			background:#e1fcef url(../../assets/kehu_search_icon.png);
			background-position: 0.28rem center;
    		background-repeat: no-repeat;

		}
		.clearSearch{
			top: 0.3rem;
			right: 1.3rem;
			width: 0.9rem;
			height: 0.8rem;
			background: url(../../assets/kehu_del_icon.png) center;
			background-repeat: no-repeat;
		}
		.searchBtn{
			top: 0.3rem;
			right: 0.3rem;
			width: 1rem;
			text-align: right;
			color: $main_colorNumber;
			font-size: $fons_size_30;
			line-height: 0.8rem;
		}
	}
</style>