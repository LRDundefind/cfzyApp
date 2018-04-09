import storage from '@/view/goods/storage'
import goodsDetails from '@/view/goods/goodsDetails'

export default [
    {
        path: 'goodsDetails/:id',
        name: 'goodsDetails',
        components: {
            mainView: goodsDetails
        },
        meta: {
            showFooter: false
        }
    },
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