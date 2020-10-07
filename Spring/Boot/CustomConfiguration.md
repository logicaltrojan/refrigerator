### Making Custom Configuration 


Spring auto configures a lot of things ...


```yml
# spring-boot-autoconfigure/META-INF/spring.factories

# Initializers
org.springframework.context.ApplicationContextInitializer=\
org.springframework.boot.autoconfigure.SharedMetadataReaderFactoryContextInitializer,\
org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
...
```

Making Custom auto configuration 

1. Do what you want.. for instance you want auto configure a bean..

Banana.java
```java

@Getter@Setter
public class Banana{ 
    String name;
}

```
```java
@Configuration
public class BananaConfiguration {

    @Bean
    public Banana banana()){
        Banana ban = new Banana();
        ban.setName("TT");
        return ban;
    }
}
```

2. Make resources/META-INF/spring.factories
3. add your configuration to EnableAutoConfiguration
   
```yml
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  me.troy.BananaConfiguration
```

4. Build / Deploy as Jar 
5. add to maven 
```xml
<dependency>
    <groupId>org.example</groupId>
    <artifactId>troyspringbootstarter</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

#### Problem

1. You can not override that bean from module. 
2. You can not customzie bean by property.


1. Add Conditional State Bean Annotation 

```java
@Configuration
public class BananaConfiguration {

    @Bean
    @ConditionalOnMissingBean // only there is no bean Banana
    public Banana banana()){
        Banana ban = new Banana();
        ban.setName("TT");
        return ban;
    }
}
```

2. Add Property Configuration 

    1. Make Property Class
    ```java
    @ConfigurationProperties("banana")
    public class BananaProperties{
        private String name;
    }
    ```
    2. Enable Configuration Properties on Configuration
    ```java
    @Configuration
    @EnableConfigurationProperties(BananaProperties.class)
    public class BananaConfiguration {
        ...
    }
    ```

    3. Modify Bean register
    ```java
    @Bean
    @ConditionalOnMissingBean // only there is no bean Banana
    public Banana banana(BananaProperties properties)){
        Banana ban = new Banana();
        ban.setName(properties.getName());
        return ban;
    }
    ```

    4. Now the property can be configured by using module. 
    ```yml
    banana.name = 'property'
    ```


