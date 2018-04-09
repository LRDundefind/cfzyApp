import damage from '@/view/damage/index'
import damageReport from '@/view/damage/damageReport'

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
    },

]