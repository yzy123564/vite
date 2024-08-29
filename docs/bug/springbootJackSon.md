# springboot全局配置Jackson未生效的BUG记录

在yaml文件中配置如下:

  ```java
jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: NON_NULL
```

问题描述
配置完成后仍然遇到了返回的JSON数据带着null值

{
"code": 404,
"message": "资源不存在",
"data": null
}

原因分析：
查看了大量的文章发现问题的解释都是两个

1、有配置类继承了WebMvcConfigurationSupport

2、使用了@EnableWebMvc注解

但是,我根本就没有继承或者使用注解

解决方案：
试验了一个小时发现是因为配置了jackson的objectMapper

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper();
}
```
