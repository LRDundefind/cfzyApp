/**
 * Created by shibeibei on 2018/4/2.
 */
import my from '@/view/my/my'
import alterPassword from '@/view/my/alterPassword'
import feedBack from '@/view/my/feedBack'
import replacePhone from '@/view/my/replacePhone'
import verification from '@/view/my/verification'
import about from '@/view/my/about'
import rules from '@/view/my/rules'
import personDetails from '@/view/my/personDetails'

export default [{
    path:'my',
    name:'my',
    components: {
        mainView: my
    },
    meta: {
        showFooter: false,
        showHeader:false,
    }
    // redirect: 'owner/record/send',
    // children:[{
    //     path:'send',
    //     name:'send',
    //     components: {
    //         recordRouteView: recordSend
    //     },
    // },{
    //     path:'remit',
    //     name:'remit',
    //     components: {
    //         recordRouteView: recordRemit
    //     },
    // }]
},{
    path:'alterPassword',
    name:'alterPassword',
    components: {
        mainView: alterPassword
    },
    meta: {
        showFooter: false,
    }
},{
    path:'feedBack',
    name:'feedBack',
    components: {
        mainView: feedBack
    },
    meta: {
        showFooter: false,
    }
},{
    path:'replacePhone',
    name:'replacePhone',
    components: {
        mainView: replacePhone
    },
    meta: {
        showFooter: false,
    }
},{
    path:'verification/:phone',
    name:'verification',
    components: {
        mainView: verification
    },
    meta: {
        showFooter: false,
    }
},{
    path:'about',
    name:'about',
    components: {
        mainView: about
    },
},{
    path:'rules',
    name:'rules',
    components: {
        mainView: rules
    },
    meta: {
        showFooter: false,
    }
},{
    path:'personDetails',
    name:'personDetails',
    components: {
        mainView: personDetails
    },
    meta: {
        showFooter: false,
        showHeader:false,
    }
}
]
