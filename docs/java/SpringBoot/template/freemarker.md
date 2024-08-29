## 增加依赖

```java
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-freemarker</artifactId>
    </dependency>
    <dependency>
        <groupId>net.sourceforge.nekohtml</groupId>
        <artifactId>nekohtml</artifactId>
    </dependency>
</dependencies>
```

## 增加配置

```java
spring:
  #配置freemarker
  freemarker:
  # 设置模板后缀名
  suffix: .html
  # 设置文档类型
  content-type: text/html
  # 设置页面编码格式
  charset: UTF-8
  # 设置页面缓存
  cache: false
  prefer-file-system-access: false
  # 设置ftl文件路径
  template-loader-path:
    - classpath:/templates
  settings:
    number_format: 0.##
```
