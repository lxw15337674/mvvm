/*
 * @Date: 2020-04-06 13:21:40
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-06 14:19:38
 */

let browser = {
    /**
     * @description: node节点的value处理 
     * @param {object} node node节点
     * @param {String}  val 节点的值 
     * @return: 
     */
    val(node, val) {
        // 将b-value转化成value，需要注意的是解析完后在view.js中会将b-value属性移除
        node.value = val || ''
        console.info(`[browser][val] -> node: `, node)
        console.info(`[browser][val] -> val: `, val)
    },

    event: {
        /** 
            * @Author: zhuxiankang 
            * @Date:   2018-07-13 08:37:10  
            * @Desc:   添加事件 
            * @Parm:   {Object} node 添加事件的节点
            *          {String} type 事件类型
            *          {Function} fn 句柄函数 
            */
        add(node, type, fn) {
            // DOM2
            if (node.addEventListener) {
                node.addEventListener(type, fn, false)
                // IE
            } else if (dom.attachEvent) {
                node.attachEvent(`on${type}`, fn)
                // DOM0  
            } else {
                node[`on${type}`] = fn
            }
        },

        /** 
         * @Author: zhuxiankang 
         * @Date:   2018-07-13 08:43:36  
         * @Desc:   获取事件的目标对象 
         * @Parm:   {Object} event 事件对象  
         */
        target(event) {
            return event.target || event.srcElement
        }
    }
}