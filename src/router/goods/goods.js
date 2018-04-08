import storage from '@/view/goods/storage'
import basicInformation from '@/view/goods/basicInformation'
import productInformation from '@/view/goods/productInformation'
import goodsDetails from '@/view/goods/goodsDetails'

export default [
    {
        //消费和还款记录
        path: 'storage',
        name: 'storage',
        components: {
            mainView: storage
        },
        meta: {
            showFooter: false
        },
        redirect: 'storage/basic',
        children: [
            {
                path: 'basic',
                name: 'basic',
                components: {
                    storageRouteView: basicInformation
                },
                meta: {
                    showFooter: false
                }
            }, {
                path: 'goods',
                name: 'goods',
                components: {
                    storageRouteView: productInformation
                },
                meta: {
                    showFooter: false
                }
            },{
                path: 'details',
                name: 'details',
                components: {
                    storageRouteView: goodsDetails
                },
                meta: {
                    showFooter: false
                }
            }
        ]
    }
]