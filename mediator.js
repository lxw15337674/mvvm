/*
 * @Date: 2020-04-06 13:51:39
 * @LastEditors: bhwa233
 * @LastEditTime: 2020-04-06 14:38:01
 */
// 中介者

class Mediator {
    constructor() {
        this.channels = {}
        this.uid = 0
    }
    /**
     * @description:  订阅频道
     * @param {string} channel 频道
     * @param {string} cb 回调函数
     * @return: 
     */
    sub(channel, cb) {
        let { channels } = this
        if (!channels[channel]) channels[channel] = []
        this.uid++
        channels[channel].push({
            context: this,
            uid: this.uid,
            cb
        })
        console.info('[mediator][sub] -> this.channels: ', this.channels)
        return this.uid
    }

    /**
     * @description: 发布频道
     * @param {string} channel 频道
     * @param {any} data 数据
     * @return:
     */
    pub(channel, data) {
        console.info('[mediator][pub] -> chanel: ', channel)
        let ch = this.channels[channel]
        if (!ch) return false
        let len = ch.length
        // 后订阅先触发
        while (len--) {
            ch[len].cb.call(ch[len].context, data)
        }
        return this
    }

    /**
     * @description:取消订阅
     * @param {string} uid 订阅表示
     * @return:
     */
    cancel(uid) {
        let { channels } = this
        for (let channel in channels) {
            let ch = channels[channel]
            if (ch.length === 1 && ch[0].uid === uid) {
                delete channels[channel]
                console.info('[mediator][cancel][delete] -> chanel: ', channel)
                console.info('[mediator][cancel] -> chanels: ', channels)
                return
            }
            for (let i = 0, len = ch.length; i < len; i++) {
                if (ch[i].uid === uid) {
                    ch.splice(i, 1)
                    console.info('[mediator][cancel][splice] -> chanel: ', channel)
                    console.info('[mediator][cancel] -> chanels: ', channels)
                    return
                }
            }
        }
    }
}

