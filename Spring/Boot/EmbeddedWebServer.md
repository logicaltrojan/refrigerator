
### Spring Boot - Embedded Web Server


Spring auto configures Tomcat as deafult embedded web servlet container.


```xml
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

If you want use different servlet container, 

1. exclude tomcat from dependency

```xml
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

2. add your favored one

undertow
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```
jetty
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```


#### How to change port 
```yml
server.port = 8111
server.port = 0 #random port
```

Getting your port 

 https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-discover-the-http-port-at-runtime




 ```java

@Component
public class PortListener implements ApplicationListener<ServletWebServerInitializedEvent> {


    @Override
    public void onApplicationEvent(ServletWebServerInitializedEvent event) {

        int port1 = event.getApplicationContext().getWebServer().getPort();
        System.out.println(port1);
        int port = event.getWebServer().getPort();
        System.out.println(port);

    }
}

 ```

#### How to disable spring web function
```yml
#application.properties
spring.main.web-application-type=none
```

