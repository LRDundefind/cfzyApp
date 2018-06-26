// import storage from '@/view/goods/storage'
// import goodsDetails from '@/view/goods/goodsDetails'

const storage = resolve => require([ '@/view/goods/storage'],resolve)

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
    },{
        path: 'storage/train/:trainsNum/:status',
        name: 'storage/train',
        components: {
            mainView: storage
        },
        meta: {
            showFooter: false
        }
    },

]