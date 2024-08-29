import{_ as e,c as t,o,a4 as a}from"./chunks/framework.C3o_UkTa.js";const c="/assets/img.CMD5N6EI.png",S=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"java/springbootWebSocket/WebSocket.md","filePath":"java/springbootWebSocket/WebSocket.md"}'),p={name:"java/springbootWebSocket/WebSocket.md"},s=a('<h3 id="websocket介绍" tabindex="-1">WebSocket介绍 <a class="header-anchor" href="#websocket介绍" aria-label="Permalink to &quot;WebSocket介绍&quot;">​</a></h3><p>初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？</p><p>答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。</p><p>举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。</p><p>这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用&quot;轮询&quot;：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。</p><p>轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。</p><blockquote><p>WebSocket 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯，它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据。</p></blockquote><h3 id="websocket特点" tabindex="-1">WebSocket特点 <a class="header-anchor" href="#websocket特点" aria-label="Permalink to &quot;WebSocket特点&quot;">​</a></h3><p>WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。</p><p>它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。 <img src="'+c+'" alt="img.png"> 其他特点包括：</p><p>（1）建立在 TCP 协议之上，服务器端的实现比较容易。</p><p>（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。</p><p>（3）数据格式比较轻量，性能开销小，通信高效。</p><p>（4）可以发送文本，也可以发送二进制数据。</p><p>（5）没有同源限制，客户端可以与任意服务器通信。</p><p>（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。</p><h3 id="websocket适用场景" tabindex="-1">WebSocket适用场景 <a class="header-anchor" href="#websocket适用场景" aria-label="Permalink to &quot;WebSocket适用场景&quot;">​</a></h3><ul><li>弹幕</li><li>媒体聊天</li><li>协同编辑</li><li>基于位置的应用</li><li>体育实况更新</li><li>股票基金报价实时更新</li></ul>',18),i=[s];function r(l,b,n,k,_,T){return o(),t("div",null,i)}const h=e(p,[["render",r]]);export{S as __pageData,h as default};
