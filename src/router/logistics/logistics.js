//物流
import logistics from '@/view/logistics/logistics'
import baiduMap from '@/view/logistics/baiduMap'

export default [
	{
		path:'logistics',
		name:'logistics',
		components: {
			mainView: logistics
		}
	},
	{
		path:'logistics/:fromc',
		name:'logistics',
		components: {
			mainView: logistics
		}
	},
	{
		path:'baiduMap',
		name:'baiduMap',
		components: {
			mainView: baiduMap
		},
		meta: {
            showFooter: false
        }
	}
]