// import damage from '@/view/damage/index'
// import damageReport from '@/view/damage/damageReport'
// import damageRecord from '@/view/damage/damageRecord'
// import ownerList from '@/view/damage/ownerList'

const damage = resolve => require([ '@/view/damage/index'],resolve)
const damageReport = resolve => require([ '@/view/damage/damageReport'],resolve)
const damageRecord = resolve => require([ '@/view/damage/damageRecord'],resolve)
const ownerList = resolve => require([ '@/view/damage/ownerList'],resolve)


export default [
    {
        path: 'damage',
        name: 'damage',
        components: {
            mainView: damage
        },
        meta: {
            showFooter: false
        }
    }, {
        path: 'damageReport/:tid',
        name: 'damageReport',
        components: {
            mainView: damageReport
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'damageRecord/create/:id',
        name: 'damageRecord/create',
        components: {
            mainView: damageRecord
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'damageRecord/update/:id',
        name: 'damageRecord/update',
        components: {
            mainView: damageRecord
        },
        meta: {
            showFooter: false
        }
    },
]