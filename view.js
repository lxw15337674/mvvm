/*
 * @Date: 2020-04-06 12:23:33
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-06 14:29:53
 */

class View {
    constructor(el, model, mediator) {
        this.model = model
        this.mediator = mediator
        // 获取需要处理的node节点
        this.el = el.nodeType === Node.ELEMENT_NODE ? el : document.querySelector(el)
        if (!this.el) return
        // 将已有的el元素的所有子元素转成文档碎片
        this.fragment = this.node2Fragment(this.el)
        // 解析和处理绑定制定并修改文档
        this.parseFragment(this.fragment)
        // 将文档碎片重新添加到dom树
        this.el.appendChild(this.fragment)
    }

    /**
     * @description: 将node节点转为文档碎片
     * @param {object} node node节点
     * @return: 
     */
    node2Fragment(node) {
        let fragment = document.createDocumentFragment(),
            child;
        while (child = node.firstChild) {
            // 给文档碎片添加节点时，该节点会自动从dom中删除
            fragment.appendChild(child)
        }
        return fragment
    }
    /**
     * @description:  解析文档碎片(在parseFragment中遍历的属性，需要在binder.parse中处理绑定指令的解析处理) 
     * @param {Object} fragment 文档碎片 
     * @return: 
     */
    parseFragment(fragment) {
        // 类数组转化成数组进行遍历
        for (let node of [].slice.call(fragment.childNodes)) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue
            // 绑定视图指令解析
            for (let attr of [].slice.call(node.attributes)) {
                binder.parse(node, attr, this.model, this.mediator)
                // 移除绑定属性
                node.removeAttribute(attr.name)
            }
            // 遍历node节点树
            if (node.childNodes && node.childNodes.length) this.parseFragment(node)
        }
    }
}