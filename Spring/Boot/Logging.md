### Logging

#### Logging Facade vs Logger

Logging Facade : to switch loggers 
Commons Logging, SLF4j (simple logging facade 4 java)

Logger : JUL, Log4J2, Logback


#### Spring5 logger issue


https://docs.spring.io/spring/docs/5.0.0.RC3/spring-framework-reference/overview.html#overview-logging

Spring-JCL
- Commons Logging -> SLF4j or Log4j

Spring boot uses commons logging ... :(
:default : Logback 이 결국 찍는다 

log4j -> sl4j -> logback
jul -> sl4j -> logbackA



```log
2020-10-25 19:29:07.053  INFO 90910 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''

```


####  

-debug 
-trace
```yml
logging.file.name=logs #file
logging.file.path=logs #dir
```


#### Log level customization 

```yml
logging.level.${package}=DEBUG  #INFO, ERROR
```
```java
    private Logger logger = LoggerFactory.getLogger(SampleRunner.class);
    @Override
    public void run(ApplicationArguments args) throws Exception {
        logger.debug("debug"); //logged
        logger.info("info"); //not logged

    }
```


https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto-configure-logback-for-logging


커스텀 로그 설정 파일 사용하기

**Logback: logback-spring.xml**
Log4J2: log4j2-spring.xml
JUL (비추): logging.properties
Logback extension  
- 프로파일 <springProfile name=”프로파일”>
- Environment 프로퍼티 <springProperty>



#### Change to log4j

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```