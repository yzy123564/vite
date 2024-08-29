### 注释

```java
<#-- 注释 -->
```

### 插值

```java
${user!'默认值'}
```

### 代码输出

```java
<script>var sindex = "${sIndex}";</script>
```

### 定义变量

```java
<#assign message="Hello World"/>
```

### if/elseif/else

```java
<#assign data="A"/>
<#if data == 'A'>
是A
<#elseif data == 'B'>
是B
<#else>
不是A、也不是B
</#if>
```

### 判断是否存在

```java
<if user?? && user != "">
${user}
</if>
```

### list

```java
<#assign datas=["A", "B", "C"] />
<#list datas as data>
    <!--显示条数  -->
    角标：${data_index}
    ${data}
</#list>
```

### 跳出循环

```java
<#break>
```

### 日期输出

```java
${createTime?string("yyyy-MM-dd HH:mm:ss")}
```

### 列表长度

```java
${list?size}
```

### 是否包含

```java
<#if ["a", "b", "c"]?seq_contains("c")>包含</#if>
```

### 字符串长度

```java
${str?length}

<#if content?length gt 100>
   ${content[0..100]}...
<#else>
  ${content}
</#if>
```
