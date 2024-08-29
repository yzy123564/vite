## 增加依赖

```java
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
</dependencies>
```

## 增加配置

```java
spring:
  thymeleaf:
    mode: LEGACYHTML5
    cache: false
```

## 控制器

```java
@RequestMapping(WebController.MODEL_PATH)
@Controller
public class SampleWebController {
    public static final String MODEL_PATH = "/sample/web";

    @GetMapping("test")
    public String test() {
        return "sample/web/test";
    }
}
```

java方法返回值不能以 / 开头，否则打成jar包后无法访问

页面 `/templates/sample/web/test.html`

```html
<!DOCTYPE html>
<html lang="zh_CN" xmlns:th="http://www.thymeleaf.org">
<head th:include="include :: header"></head>
<body>
    hello thymeleaf!
    <div th:include="include::footer"></div>
</body>
</html>
```

## thymeleaf语法

- 宏定义 include.html

```html
<head th:fragment="header">
    <link th:href="@{/css/bootstrap.min.css}" rel="stylesheet">
</head>
<div th:fragment="footer">
    <script src="@{/js/bootstrap.min.js}"></script>
</div>
```

- 宏定义的引用

```html
<head th:include="include::header"></head>
```
