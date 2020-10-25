#### Spring Boot Application 
---

- Log option 
  - Default : INFO 
    - Vm option : -Ddebug => set logging option to debug
- Banner 
  - Resource/Banner.txt Configurable 
  - Can be configured in code
  - Can use variable( ${spring.version})




How to run Spring application 

```java
    public static void main(String[] args) {

        SpringApplication app = new SpringApplication(InflearnwebApplication.class);
        app.run(args);

    }
```

```java
    public static void main(String[] args) {

        new SpringApplicationBuilder()
                .sources(InflearnwebApplication.class)
                .run(args);
    }
```




```java
public class SampleListener implements ApplicationListener<ApplicationStartingEvent> {

    //application context 가 만들어졌냐 안만들어졌냐가 중요하다. -> bean실행 여부가 결정되기  때문
    //AC 가 만들어지기 시작하기전에 발생하는 이벤트 -> application context가 존재하지 않음
    //listener가 bean일지라도 동작을 하지 않는다
    @Override
    public void onApplicationEvent(ApplicationStartingEvent event) {
        System.out.println("--------------------");
        System.out.println("Starting Application");
        System.out.println("--------------------");
    }
}
```
```java

    // have to add it directly
      SpringApplication app = new SpringApplication(InflearnwebApplication.class);
        app.addListeners(new SampleListener());
        app.run(args);

```

```java

//Applicaiton Context가 만들어진 이후 시점에서의 event는 등록만 해줘도 상관이 없다.
@Component
public class SampleListener implements ApplicationListener<ApplicationStartedEvent> {
    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {

        System.out.println("--------------------");
        System.out.println("Started Application");
        System.out.println("--------------------");
    }
}


```

-D : jvm option args 
-(--) : program args 

jvm option은 application arg가 아니다. => spring app 내부에서 사용하지 않음. 

```java
public SampleComponent { 

    //java -jar app.jar -Dfoo --bar
    @Autowired
    public SampleComponent(ApplicationArguments arguments){

        System.out.println("foo : " + arguments.containsOption("foo")); //false
        System.out.println("Bar : " + arguments.containsOption("bar")); //true
    }
}
```
```java
// Also like this.. 
// 여기서도 jvm option은 무시된다. 
@Component
@Order(1) // 다수의 runner를 구현했을 경우 1, 2, 3 으로 순서를 부여할 수 있다.  순서가 같을 경우 놀랍게도 class alpahbetical order인듯...
public class SampleRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {

        System.out.println("foo : " + args.containsOption("foo"));
        System.out.println("Bar : " + args.containsOption("bar"));

    }
}

```

