/*
 * @Date: 2020-04-06 13:51:55
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-06 14:52:57
 */

var hijack = (function () {
    class hijack {
        /**
         * @description:  数据劫持构造函数
         * @param {object} model 数据
         * @param {object} mediator 发布订阅对象 
         * @return: 
         */
        constructor(model, mediator) {
            this.model = model
            this.mediator = mediator
        }

        hijackData() {
            let { model, mediator } = this
            for (let key in model) {
                let val = model[key]
                Object.defineProperty(model, key, {
                    enumerable: true,
                    configurable: false,
                    get() {
                        return val
                    },
                    set(newVal) {

                        if (newVal === val) return
                        val = newVal
                        // 重点注意这里的通道，在最后的MVVM示例中和这里的实现不一样
                        mediator.pub(key)
                    }
                })
            }
        }

    }
    return (model, mediator) => {
        if (!model || typeof model !== 'object') return
        new hijack(model, mediator).hijackData()
    }
})()
