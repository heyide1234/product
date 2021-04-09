import Vue from 'vue'

const Item = Vue.component('Item', {
    template: `<div>
                <h2>子组件</h2>
                <slot></slot>
              </div>`
})
const app = new Vue({
    el: '#app',
    template: `<div ref="myDiv">
                    <item ref="item">
                        <p ref="p">this is a slot</p>
                    </item>
               </div>`,
    data: {
        count: 0
    },
    components: {
        Item
    }
})
/////////
const app = new Vue({
    el: '#app',
    data: {
        count: 0
    },
    render(createElement) {
        return createElement(
            'div',
            {
                ref: 'myDiv',
                // domProps: {
                //    innerHTML: '<span>注意：添加该属性会把后面的子节点覆盖</span>'
                // },
                attrs: {
                    id: 'test-id',
                    title: 'test-title'
                }
            },
            [
                createElement(
                    'item',
                    {
                        ref: 'item'
                    },
                    [
                        createElement(
                            'p',
                            {
                                ref: 'p'
                            },
                            'this is a slot'
                        )
                    ])
            ])
    },
    components: {
        Item
    }
})