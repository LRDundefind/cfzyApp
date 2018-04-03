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

export default [{
    path:'my',
    name:'my',
    components: {
        mainView: my
    },
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
},{
    path:'feedBack',
    name:'feedBack',
    components: {
        mainView: feedBack
    },
},{
    path:'replacePhone',
    name:'replacePhone',
    components: {
        mainView: replacePhone
    },
},{
    path:'verification:phone',
    name:'verification',
    components: {
        mainView: verification
    },
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
}
]
