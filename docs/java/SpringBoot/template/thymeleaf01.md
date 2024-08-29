### 注释

```html
<!--/*-->
注释内容
<!--*/-->
```

### 原型注释（thymeleaf模板照常解析）

```html
<!--/*/
  <div th:text="${...}">
    ...
  </div>
/*/-->
```

### 插值

```html
<span th:text="${message}"></span>
```

### 代码输出

```html
<script>var sindex = "[(${sIndex})]";</script>
```

### 定义变量

```html
<div th:with="curPage=${#httpServletRequest.getParameter('page')}">
    <h3>当前页码：<span th:text="${curPage}"></span></h3>
</div>
```

### 日期格式化

```html
<span th:text="${#dates.format(curDate, 'yyyy-MM-dd HH:mm:ss')}"></span>
```
- 使用内置对象dates的format函数即可对日期进行格式化，在format函数中，第一个参数是日期对象，对二两个参数为日期格式（规则跟SimpleDateFormat一样）

- 需要注意的是：

内置对象一般都以s结尾，如dates、lists、numbers等

在使用内置对象是在对象名前都需要加#号。


### if/elseif/else

```html
<body>
	<!--if属性结果为 true，模板会进行显示-->
	<p th:if="true">th:if="true"</p>
	<!--if属性结果为 false，模板不会进行显示-->
	<p th:if="false">th:if="false"</p>
	<!--后台控制器传出数据:model.addAttribute("isMarry"，true);-->
	<p th:if="${isMarry}">已婚</p>
</body>
```

### 判断是否存在

```html
判断是不是为空:null:
<span th:if="${name} != null">不为空</span>
<span th:if="${name1} == null">为空</span>
判断是不是为空字符串: “”
<span th:if="${#strings.isEmpty(name1)}">空的</span>
判断是否相同：
<span th:if="${name} eq 'jack'">相同于jack,</span>
<span th:if="${name} eq 'ywj'">相同于ywj,</span>
<span th:if="${name} ne 'jack'">不相同于jack,</span>
不存在设置默认值：
<span th:text="${name2} ?: '默认值'"></span>
```

### list

```html
<select id="event" name="event" class="form-control">
    <option value="">请选择</option>
    <option th:each="dict,state:${dictList}"
            th:value="${dict.value}" th:text="${dict.text}"
            th:attr="selected=${data.event == dict.value?true:false}"></option>
</select>
```

### 属性容器

```html
<table>
  <th:block th:each="user : ${users}">
    <tr>
        <td th:text="${user.login}">...</td>
        <td th:text="${user.name}">...</td>
    </tr>
  </th:block>
</table>
```
