二者都是 TCP/IP 协议簇下的子协议。

STOMP 对标的是 AMQP。

WebSocket 跟 HTTP 是平级的协议，虽然前者依赖后者建立链接，但之后就跟 HTTP 没啥关系了。依赖关系是因为是因为它是为了浏览器而设计出来的，出于兼容的需要，二者有交集但不是父子关系。

而 STOMP/AMQP 就跟 WebSocket/HTTP 完全没关系了（硬说有也不是没有，毕竟前者的很多设计思路参考了后者，但在具体实现上则没有必然的依赖关系）。
STOMP 通常是在 WebSocket 等更专业的协议之上实现的。STOMP 描述了使用 Websocket 等底层协议在客户端和服务器之间交换消息帧的特定格式

在实际应用中，STMOP 可以建立在 WebSocket 基础上进行数据传输，但也完全可以使用其他应用层协议上。虽然理论上如此，但用 WebSocket 几乎已成为了事实标准，毕竟 STMOP 需要互操作，而全双工的应用层协议并不多，也只能是 WebSocket 了。

<font size=3>
stomp和websocket一起使用的时候，这两个东东各自完成的工作就好比：用 EMS 给邮寄点东西（数据），信封是 STOMP，EMS 是 WebSocket。
</font>
