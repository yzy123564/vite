### pom依赖

<details>

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```
</details>

### 方式一
后台自己实现Endpoint，前端使用内置的WebSocket。
##### 配置类
```java
@Configuration
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 扫描@ServerEndpoint,将@ServerEndpoint修饰的类注册为websocket
     * 如果使用外置tomcat，则不需要此配置，把此配置去掉
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter()
    {
        return new ServerEndpointExporter();
    }

}

```

##### Endpoint 端点

```java
//ServerEndpoint主要是将目前的类定义成一个websocket服务器端, 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端
@ServerEndpoint("/websocket")
@Component  //放到spring容器中
@Slf4j
public class WebSocketServer{

    /**
     * 所有连接的客户端
     */
    private static ConcurrentHashMap<String,Session> clients = new ConcurrentHashMap<>();


    /**
     * 建立连接时调用的方法
     */
    @OnOpen
    public void onOpen(Session session) {
        clients.put(session.getId(),session);
        //向特定用户发送消息，使用的session是接收方的session
        session.getAsyncRemote().sendText("已加入群聊");
    }


    /**
     * 连接关闭时调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        clients.remove(session.getId());
        session.getAsyncRemote().sendText("已退出群聊");
    }


    /**
     * 收到客户端发送过来的消息时调用的方法
     * @param msg 客户端用户发送过来的消息，二进制可以声明为byte[]
     */
    @OnMessage
    public void onMessage(String msg) {
        //群发消息
        for (Session session : clients.values()) {
            session.getAsyncRemote().sendText(msg);
        }
    }


    /**
     * 发生错误时调用的方法
     */
    @OnError
    public void onError(Session session, Throwable e) {
        log.error("发送错误的sessionId："+session.getId()+"，错误信息："+e.getMessage());
    }

}

```

##### 前端
```javascript
<script>
    let socket;

    //手动打开连接
    function openSocket() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您使用的浏览器不支持WebSocket");
        }else{
            //连接到websocket的某个endpoint
            socket = new WebSocket("ws://127.0.0.1:8080/websocket");
            //以下几个方法相当于事件监听，在特定事件触发时会自动调用
            socket.onopen = () => {
                console.log("已连接到websocket");
            };
            socket.onmessage = resp => {
                console.log("接收到服务端信息：" + resp.data);
            };
            socket.onclose = () => {
                console.log("已断开websocket连接");
            };
            socket.onerror = () => {
                console.log("websocket发生错误");
            }
        }
    }

    //手动关闭连接
    function closeSocket() {
        socket.close();
    }

    //发送消息到服务器
    function sendMsg(msg) {
        //参数不一定要是字符串类型，可以是任意类型（二进制数据）
        socket.send(msg);
    }

</script>

```

##### 说明
1、如果要同时实现单发、群发

前端可以将msg写成对象，设置发送类型、接收方等属性，将对象转换为json字符串进行发送，然后在服务端的onMessage()中解析
也可以多写几个endpoint，一个endpoint作为单发、一个作为群发

2、getBasicRemote()、getAsyncRemote()的区别

getBasicRemote()是同步的，getAsyncRemote()是异步的，getBasicRemote()会抛出异常。

eg. sendText()，sendText() 前后发送2次消息
如果是同步的，会等第一个sendText()执行完毕才执行第二个sendText()；如果是异步的，第一个sendText()开始执行后就继续往下执行代码。


3、sendText()发送文本内容，sendBinary()发送二进制数据


4、websocket支持 ws、wss 协议，ws不使用ssl，wss使用了ssl。

可根据http通信协议判断 window.location.protocol，如果是http则使用ws，如果是https则使用wss。


5、方式一简单，但功能单一、能接收的数据类型有限，适合只群发、不单发，消息内容简单的场景。

### 方式二

后端使用@MessageMapping、@SendTo指定接受、推送地址，前端使用[sockjs+stomp](#关于sockjs和stomp)。

sockjs封装了websocket，stomp是消息队列模式。

##### 配置类
```java
/**
 * 通过EnableWebSocketMessageBroker 开启使用STOMP协议来传输基于代理(message broker)的消息,此时浏览器支持使用@MessageMapping 就像支持@RequestMapping一样。
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

   /**
     * endPoint 注册协议节点,并映射指定的URl
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 注册endpoint（服务端点），用于接收客户端连接，客户端的SockJS通过端点连接到websocket
        // setAllowedOrigins是配置跨域，withSockJS是启用SockJS支持
        // 可注册多个端点
        registry.addEndpoint("/socket").setAllowedOrigins("*").withSockJS();
    }


    /**
     * 配置服务器接收消息、推送消息的地址前缀
     */
    /**
     * 配置消息代理(message broker)
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 客户端订阅地址前缀，用于客户端订阅服务端的某个
        // registry.enableSimpleBroker("/topic");

        // 服务端接收地址前缀，用于服务端接收客户端的消息
        // registry.setApplicationDestinationPrefixes("/app");
    }

}

```
##### 消息实体类
```java
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Msg implements Serializable {

    private String msgContent;

    private String fromUserId;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date sendTime;

}

```
##### 处理消息的controller
```java
@Controller
public class MsgController {

    @MessageMapping("/app/serverReceive")  //@MessageMapping指定服务器接收消息的地址，此方法只处理发给该地址的消息
    @SendTo("/topic/serverPush")  //@SendTo指定消息的推送地址，会把return返回的数据推送到指定的地址
    public Msg msgHandler(Msg message){
        return message;
    }

}

```

##### 前端
要引入2个核心的js文件：sockjs.js、stomp.js
```javascript
<noscript>您使用的浏览器不支持websocket</noscript>

<script src="https://cdn.bootcdn.net/ajax/libs/sockjs-client/1.5.0/sockjs.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script type="text/javascript">
    let stompClient = null;

    //连接到websocket
    function connect() {
        //SockJS连接的是端点endpoint
        let socket = new SockJS('/socket');
        stompClient = Stomp.over(socket);

        //参数：请求头设置，连接成功的回调函数，连接失败的回调函数
        stompClient.connect({},frame => {
            console.log("连接成功");
            //stompClient订阅的是推送地址。参数：订阅地址、回调函数
            stompClient.subscribe('/topic/serverPush',resp => {
                // console.log(resp.body)
            });
        },error => {
            console.log("连接失败")
        });
    }


    //断开连接
    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        console.log("已断开连接");
    }


    //发送消息
    function sendMsg() {
        //消息可以是对象
        let msg={ 'fromUserId': $('#fromUserId').val(),'msgContent': $('#msgContent').val(),'sendTime':new Date()};
        //参数：服务器接收地址，请求头设置，消息内容
        stompClient.send("/app/serverReceive", {}, JSON.stringify(msg));
    }

</script>

```
##### 说明
1、不管在配置类中配不配置订阅地址的前缀，@SendTo()中都要写全全路径，不能省略前缀。

如果在配置中配置了接受地址的前缀，@MessageMapping中要省略前缀；如果没配置接受地址的前缀，@MessageMapping中必须要写全路径。


2、fromUserId给其它用户推送消息，推送时fromUserId本身也会收到自己发出的消息，但这个消息是本地的msg，其它人收到的msg是服务端推送的msg，可能在原msg的基础上做了修改。

消息最好在本地就配置好，尽量不要在服务端修改消息，以保证每个用户收到的消息是一致的（主要是发送方和接受方收到的消息一致）。


3、此种方式可以接受多种类型的消息内容，主要是可以接受对象形式的消息内容，但@SendTo适合群发，实现单点发送有点麻烦。此种方式与方式一相比，优点是可以接收对象形式的消息。

##### 关于SockJS和STOMP

SockJS 和 STOMP 都是用于 Web 应用程序与消息代理进行通信的技术，但它们解决的问题不同。

SockJS 是一个 JavaScript 库，它提供了一种在 Web 浏览器和 Web 服务器之间建立 WebSocket 连接的跨浏览器解决方案，能为浏览器提供一个近似于 WebSocket 的API。

SockJS 旨在解决 WebSocket 不受支持或无法使用的情况下，使用轮询和其他技术建立实时双向通信的问题。SockJS 库支持多种传输方式，包括 WebSocket、XHR 流、XHR 短轮询等，从而保证了最大的兼容性和可靠性。


当使用 SockJS 时，连接可能首先会尝试使用 XMLHttpRequest 来获取一些基本信息，这是 SockJS 的一部分协议


STOMP（Simple Text Oriented Messaging Protocol）是一种基于文本的简单消息协议，它提供了一种可互操作性的机制，用于跨语言和平台之间的实时消息传递。

STOMP 协议定义了一组命令和消息格式，用于在客户端和服务器之间进行消息传递，它与特定的消息代理无关，因此可以使用 STOMP 协议与多个消息代理进行通信。STOMP 支持订阅/发布模式和点对点模式，可以用于实现诸如聊天室、通知系统和实时数据更新等应用程序。

通常情况下，使用 SockJS和 STOMP结合使用可以获得最佳的性能和可靠性。

SockJS 提供了一种建立 WebSocket 连接的可靠跨浏览器解决方案，而 STOMP 提供了一种在 WebSocket 连接上实现实时消息传递的标准化协议。

在使用 SockJS 和 STOMP 的组合时，可以使用 SockJS 建立 WebSocket 连接，然后使用 STOMP 协议在 WebSocket 连接上进行消息传递，从而获得最佳的性能和可靠性。


### 方式三（推荐）
在方式二的基础上改进，使用SimpMessagingTemplate代替@SendTo注解。
##### 配置类
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 注册端点
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").setAllowedOrigins("*").withSockJS();
    }


    /**
     * 配置服务器接收消息、推送消息的地址前缀
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 客户端订阅地址前缀，用于客户端订阅服务端的某个
        // 需要加上点对点的前缀
        registry.enableSimpleBroker("/topic","/user");

        // 服务端接收地址前缀，用于服务端接收客户端的消息
        registry.setApplicationDestinationPrefixes("/app");

        //点对点使用的订阅前缀
        registry.setUserDestinationPrefix("/user");
    }

}

```
##### 消息实体类
```java
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Msg implements Serializable {

    private String msgContent;

    private String fromUserId;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date sendTime;

}

```
##### 处理消息的controller
```java
@Controller
public class MsgController {

    @Autowired
    private SimpMessagingTemplate template;

    /**
     * 群发
     */
    @MessageMapping("/toAll")
    public void toAll(Msg msg) {
        //convertAndSend代替@SendTo指定目标地址
        template.convertAndSend("/topic/toAll", msg);
    }


    /**
     * 点对点
     */
    @MessageMapping("/toOne")
    // @Scheduled(fixedDelay = 1000L)  //可以使用定时器实现定时推送
    public void toOne(Msg msg) {
        //参数：当前用户的标识，目标地址，消息内容。会将消息推送到当前用户的频道中，所有订阅了当前用户的客户端都会收到消息
        template.convertAndSendToUser(msg.getFromUserId(), "/toOne", msg);
    }


}

```
##### 前端
```java
<noscript>您使用的浏览器不支持websocket</noscript>

<script src="https://cdn.bootcdn.net/ajax/libs/sockjs-client/1.5.0/sockjs.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script type="text/javascript">
    let stompClient = null;

    //连接到websocket
    function connect() {
        //SockJS连接的是端点endpoint
        let socket = new SockJS('/socket');
        stompClient = Stomp.over(socket);

        //参数：请求头设置，连接成功的回调函数，连接失败的回调函数
        stompClient.connect({},frame => {
            console.log("连接成功");
            //订阅全体消息
            stompClient.subscribe('/topic/toAll',resp => {
                // console.log(resp.body)
            });
            //订阅点对点消息，/user/toUserId/toOne 此处订阅的是目标用户的消息
            stompClient.subscribe('/user/' + $("#toUserId").val() + '/toOne', resp => {
                // console.log("ok:"+resp.body);
            });
        },error => {
            console.log("连接失败")
        });
    }


    //断开连接
    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        console.log("已断开连接");
    }


    //群发消息
    function sendMsgToAll() {
        let msg={ 'fromUserId': $('#fromUserId').val(),'msgContent': $('#msgContent').val(),'sendDate':new Date()};
        //参数：服务器接收地址，请求头设置，消息内容
        stompClient.send("/app/toAll", {}, JSON.stringify(msg));
    }

    //点对点
    function sendMsgToOne() {
        let msg={ 'fromUserId': $('#fromUserId').val(),'msgContent': $('#msgContent').val(),'sendDate':new Date()};
        //服务器接收地址天@MessageMapping映射的即可
        stompClient.send("/app/toOne", {}, JSON.stringify(msg));
    }

</script>

```

##### 说明

SimpMessagingTemplate是Spring Framework中的一个类，用于向WebSocket客户端发送消息。在Spring Boot应用程序中，可以使用SimpMessagingTemplate来实现WebSocket通信的消息发送功能。

SimpMessagingTemplate类提供了多种方法来向WebSocket客户端发送消息，支持多种消息类型，例如文本消息、二进制消息、对象消息等。

SimpMessagingTemplate的原理是通过WebSocket消息代理来向WebSocket客户端发送消息。在启用WebSocket消息代理之后，可以使用SimpMessagingTemplate类来向WebSocket客户端发送消息。

SimpMessagingTemplate类中的sendMessage方法用于向WebSocket客户端发送消息，该方法会将消息发送到WebSocket消息代理，由WebSocket消息代理负责将消息转发给目标WebSocket客户端。

### WebSocket的监听器
WebSocket的监听器可以监听以下事件

- SessionSubscribeEvent 订阅
- SessionUnsubscribeEvent 取消订阅
- SessionDisconnectEvent 断开连接
- SessionConnectEvent 建立连接
##### 使用示例
新建类listener.ConnectEventListener

```java
@Component  //放到spring容器中
public class ConnectEventListener implements ApplicationListener<SessionConnectEvent> {

    @Override
    public void onApplicationEvent(SessionConnectEvent event) {
        StompHeaderAccessor headerAccessor =  StompHeaderAccessor.wrap(event.getMessage());
        System.out.println("事件类型："+headerAccessor.getCommand().getMessageType());
    }

}

```
需要实现ApplicationListener接口，泛型指定要监听的事件类型。一个类只能监听一个事件，如果要监听多个事件，需要写多个类。
### WebSocket的拦截器
WebSocket的一次通信只需要1次握手，HandshakeInterceptor 握手拦截器可以在握手前后进行拦截，做一些处理。

新建类intecepter.MyHandShakeIntecepter
```java
public class MyHandShakeIntecepter implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,ServerHttpResponse response,WebSocketHandler wsHandler,Map<String, Object> attributes) {
        ServletServerHttpRequest req = (ServletServerHttpRequest) request;
        HttpSession session = req.getServletRequest().getSession();
        // 返回的boolean标识是否继续往下执行
        return true;
    }


    @Override
    public void afterHandshake(ServerHttpRequest request,ServerHttpResponse response, WebSocketHandler wsHandler,Exception exception) {
        ServletServerHttpRequest req = (ServletServerHttpRequest) request;
        HttpSession session = req.getServletRequest().getSession();
    }


}

```
需要在websocket的[配置类](#peizhilei)中添加要使用的拦截器
```java
/**
 * 注册端点
 */
@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/socket")
            .addInterceptors(new MyHandShakeIntecepter())  //拦截器
            .setAllowedOrigins("*")
            .withSockJS();
}

```
