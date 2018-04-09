import damage from '@/view/damage/index'
import damageReport from '@/view/damage/damageReport'
import damageRecord from '@/view/damage/damageRecord'

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
        path: 'damageReport/:id',
        name: 'damageReport',
        components: {
            mainView: damageReport
        },
        meta: {
            showFooter: false
        }
    },{
        path: 'damageRecord',
        name: 'damageRecord',
        components: {
            mainView: damageRecord
        },
        meta: {
            showFooter: false
        }
    },


]