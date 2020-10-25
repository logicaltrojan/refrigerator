#### External Properties & Configuration

----

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config


- properties
- YAML
- environment variable
- command line argument


Application Property Priority

1. 유저 홈 디렉토리에 있는 spring-boot-dev-tools.properties
2. 테스트에 있는 @TestPropertySource
3. @SpringBootTest 애노테이션의 properties 애트리뷰트
4. @SpringBootTest 애노테이션의 properties 애트리뷰트
5. 커맨드 라인 아규먼트
6. SPRING_APPLICATION_JSON (환경 변수 또는 시스템 프로티) 에 들어있는 프로퍼티
7. ServletConfig 파라미터
8. ServletContext 파라미터
9. java:comp/env JNDI 애트리뷰트
10. System.getProperties() 자바 시스템 프로퍼티
11. OS 환경 변수
12. RandomValuePropertySource
13. JAR 밖에 있는 특정 프로파일용 application properties
14. JAR 안에 있는 특정 프로파일용 application properties
15. JAR 밖에 있는 application properties
16. JAR 안에 있는 application properties
17. @PropertySource
18. 기본 프로퍼티 (SpringApplication.setDefaultProperties)


```yml
//application.properties  => 15th priority
troy.name = troy
```
```java
    @Value("${troy.name}")
    private String name; // troy
 
```


```shell

java -jar target/myApp.jar --troy.name=KYUNG

# overrides troy.name  => 4th priority
```

Higher Priority overrrides value


##### Test Properties override

Test Build Process
1. Build src / resource to jar 
2. Build test src/ resource and override jar


```yml
# /src/resources/application.properties
troy.name = TROY
# /test/resources/application.properties
troy.name = KYUNG 
```
```java
@SpringBootTest
class InflearnwebApplicationTests {

    @Autowired
    Environment environment;

    @Test
    void contextLoads() {
        assertThat(environment.getProperty("troy.name")).isEqualTo("KYUNG");
    }
}
```


##### Test Properties override caution


```yml
# /src/resources/application.properties
troy.name = TROY
troy.age = ${random.int}
# /test/resources/application.properties
troy.name = KYUNG 
```
*TEST FAILS* 
```log
Injection of autowired dependencies failed; nested exception is java.lang.IllegalArgumentException: Could not resolve placeholder 'troy.age' in value "${troy.age}"
```
WHY ? => test/resources/application.properties overrides src/...

SOLUTION 
1. Do not override application.properties with test resource. 
2. Make test.properties, and set it as @TestPropertSource(locations = "classpath:/test.properties")
   
```java
@TestPropertySource(locations = "classpath:/test.properties") //higher priority  3th
@SpringBootTest
class InflearnwebApplicationTests {
    @Autowired
    Environment environment;
    @Test
    void contextLoads() {
        assertThat(environment.getProperty("troy.name")).isEqualTo("KYUNG");
    }
}
```

#### application.properties 우선 순위 (높은게 낮은걸 덮어 씁니다.)
1. file:./config/ 
2. file:./ (~/application.properties)
3. classpath:/config/
4. classpath:/


랜덤값 설정하기
${random.*}

플레이스 홀더
name = keesun
fullName = ${name} baik


#### Properties 묶어서 사용하기(Properties Class) 

```yml
troy.name = troy
troy.age = ${random.int}
```
```java
@Configuration //Bean 으로 등록안한다면 @EnableConfigurationProperties(TroyProperties.class) 추가해야함
@ConfigurationProperties("troy")
public class TroyProperties {

    String name;
    int age;

    //Getter , Setter needed
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

```

#### 융통성 있는 바인딩 Relax Binding

```java
String fullName; 

```
```yml
troy.fullName 
troy.full_name
troy.full-name
troy.FULLNAME
```

만약 property class 에 fullName, full_name 두개가 있고 fullName 만 properties 정의하면 둘다 mapping 
```java
String fullName;
String full_name;
```
```yml
troy.fullName = troy.jo
```

```cmd
<!-- sout(fullName) sout(full_name)-->
troy.jo
troy.jo
```


#### Property type conversion
properties 내에서는 type 존재하지 않음 
```yml
troy.name = troy
troy.age = "10" #string 10 이지만 int property 이므로 넣어준다 

troy.sessionTimeout=25 # 시간을 받으려면 어떻게 해야할까
```
```java
// TroyProperties.class

    @DurationUnit(ChronoUnit.SECONDS) //@Duration Unit 을 선언해주거나 
    private Duration sessionTimeout = Duration.ofSeconds(30);
```
```yml

troy.sessionTimeout=25s # suffix 's'
```


#### Property Validation 

hibernate validator dependency
```xml
<!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-validator -->
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.1.0.Final</version>
</dependency>

```

```java
@Validated
public class TroyProperties {

    @NotEmpty // not empty constraint
    String name;
    @Range(max =100 , min= 0) //range constraint
    int age;
    @Size(max = 2)
    String[] names;
}
```

```yml
#application properties
troy.names = hi,mynameis  # occurs error 
```

```log
Description:

Binding to target org.springframework.boot.context.properties.bind.BindException: Failed to bind properties under 'troy' to me.troy.inflearnweb.TroyProperties$$EnhancerBySpringCGLIB$$3c4f90e3 failed:

    Property: troy.names
    Value: [Ljava.lang.String;@1a38ba58
    Origin: class path resource [application.properties]:8:14
    Reason: 크기가 0에서 2 사이여야 합니다

```





