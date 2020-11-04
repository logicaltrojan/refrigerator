### Devtools 

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-devtools


TL; DR; 

**No need to use... just know below properties and use on yourself....**

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

아래 설정들을 켜주는 역할 

```java
// cache 설정을 바꿔준다
		properties.put("spring.thymeleaf.cache", "false"); 
		properties.put("spring.freemarker.cache", "false");
		properties.put("spring.groovy.template.cache", "false");
		properties.put("spring.mustache.cache", "false");
		properties.put("server.servlet.session.persistent", "true");
		properties.put("spring.h2.console.enabled", "true");
		properties.put("spring.resources.cache.period", "0");
		properties.put("spring.resources.chain.cache", "false");
		properties.put("spring.template.provider.cache", "false");
		properties.put("spring.mvc.log-resolved-exception", "true");
		properties.put("server.error.include-binding-errors", "ALWAYS");
		properties.put("server.error.include-message", "ALWAYS");
		properties.put("server.error.include-stacktrace", "ALWAYS");
		properties.put("server.servlet.jsp.init-parameters.development", "true");
		properties.put("spring.reactor.debug", "true");

```

### Reload vs Restart

reload  > restart > cold start 

Base Class loader :  Loads class that do not change ( third party lib, dependency)
Resater Class loader :  Loads actively developing 

When the application is restarted, the restart classloader is thrown away and a new one is created. This approach means that application restarts are typically much faster than “cold starts”, since the base classloader is already available and populated.

If you find that restarts are not quick enough for your applications or you encounter classloading issues, you could consider reloading technologies such as JRebel from ZeroTurnaround. These work by rewriting classes as they are loaded to make them more amenable to reloading.


### Live Reload 

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-devtools-livereload

Restart 후 browser refresh 

-> Browser plugin needed 
