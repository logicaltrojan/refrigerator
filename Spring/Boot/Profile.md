### Spring Profile

#### Active Profile

```yml
spring.profiles.active=test
```
```java
@Profile("test") 
@Configuration
public class TestConfiguration {
    @Bea**n**
    public String hello(){
        return "test";
    }
}
```
OR  Make  application-prod.properites(application-${profile}.properties)

```yml
#application-prod.properties
#application-dev.properties
```
```cmd
java -jar target/springproject-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```


#### Including profiles

Profile을 읽을 때 다른 profile include
```yml
spring.profiles.include=proddb #include application-proddb.properties
```

