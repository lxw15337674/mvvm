/*
 * @Date: 2020-04-06 12:52:35
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-06 14:40:56
 */
(function (window, browser) {
    window.binder = {
        /**
         * @description: 判断是否是绑定属性 
         * @param {string}  attr Node节点的属性
         * @return: 
         */
        is(attr) {
            return attr.includes('b-')
        },

        /**
         * @description: 解析绑定制定 
         * @param {object} attr html属性对象
         * @param {object} node Node节点
         * @param {object} model 数据
         * @param {object} mediator 中介者
         * @return: 
         */
        parse(node, attr, model, mediator) {
            if (!this.is(attr.name)) return
            // 获取model数据
            this.model = model
            this.mediator = mediator
            // b-value = 'message', 因此attr.value = 'message'
            let bindValue = attr.value,
                // 'b-value'.subString(2) = value
                bindType = attr.name.substring(2)
            this[bindType](node, bindValue.trim())
        },
        /**
          * @description: 值绑定处理（b-value) 
          * @param {object} node Node节点
          * @param {string} key model的属性
          * @return: 
          */
        value(node, key) {
            this.update(node, key)
            // View -> ViewModel -> Model
            // 监听用户的输入事件
            browser.event.add(node, 'input', (e) => {
                // 更新model
                let newVal = browser.event.target(e).value
                this.model.setData(key, newVal)
            })
            // 一旦model变化，数据劫持会mediator.pub变化的数据		
            // 订阅数据变化更新视图(闭包)
            this.mediator.sub(key, () => {
                this.update(node, key)
            })
        },
        /**
         * @description: 值绑定更新（b-value) 
         * @param {object} node Node节点 
         * @param {string} key model的属性
         * @return: 
         */
        update(node, key) {
            // this.model.getData是用于获取model对象的属性值
            // 例如 model = { a : { b : 111 } }
            // <input type="text" b-value="a.b" />
            // this.model.getData('a.b') = 111
            // 从而可以将input元素更新为<input type="text" value="111" />
            browser.val(node, this.model.getData(key))
        }
    }
})(window, browser)
