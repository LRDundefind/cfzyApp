//物流
// import logistics from '@/view/logistics/logistics'
// import baiduMap from '@/view/logistics/baiduMap'

const logistics = resolve => require([ '@/view/logistics/logistics'],resolve)
const baiduMap = resolve => require([ '@/view/logistics/baiduMap'],resolve)


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
        name:'logistics/fromc',
        components: {
            mainView: logistics
        },
        meta: {
            showFooter: false
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
		path:'baiduMap/:orderId',
		name:'baiduMap',
		components: {
			mainView: baiduMap
		},
		meta: {
            showFooter: false
        }
	}
]