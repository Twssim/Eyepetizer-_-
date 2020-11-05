import { Empty,Search , List ,Image as VanImage, Popup, DatetimePicker, ShareSheet, Tab, Tabs, SwipeCell, PullRefresh, Notify, Icon, Skeleton, Toast, Form, field, button, swipe, swipeItem, cell, popup, Dialog, Loading } from 'vant'

const vants = [Empty, Search,List  ,VanImage, Tab, Popup, DatetimePicker, Tabs, SwipeCell, ShareSheet, PullRefresh, Notify, Icon, Skeleton, Toast, Form, field, button, swipe, swipeItem, cell, popup, Dialog, Loading]


export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }
}