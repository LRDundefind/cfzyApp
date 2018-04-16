import storage from '@/view/goods/storage'
import goodsDetails from '@/view/goods/goodsDetails'

export default [
    // {
    //     path: 'goodsDetails/update/:id',
    //     name: 'goodsDetails/update',
    //     components: {
    //         mainView: goodsDetails
    //     },
    //     meta: {
    //         showFooter: false
    //     }
    // }, {
    //     path: 'goodsDetails/create',
    //     name: 'goodsDetails/create',
    //     components: {
    //         mainView: goodsDetails
    //     },
    //     meta: {
    //         showFooter: false
    //     }
    // },
    {
        path: 'storage',
        name: 'storage',
        components: {
            mainView: storage
        },
        meta: {
            showFooter: false
        }
    },
]