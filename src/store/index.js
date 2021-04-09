import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0,
        list: [{
            name: "张三"
        },
        {
            name: "李四"
        }]
    },
    getters: {
        getstringCount: state => name => {

            return state.list.find(item => item.name == name)
        }
    },
    mutations: {
        addCount(state, payload) {
            state.count += payload
        }
    },
    actions: {
        asyncaddcount(context, prames) {
            setTimeout(() => {
                context.commit("addCount", prames)//?
            }, 2000)
        }
    }
})


export default store