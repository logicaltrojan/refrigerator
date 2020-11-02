#### Spring Bean LifeCycle

https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-lifecycle

To implement Bean Lifecycle callback, 3 ways to do it
1. Implement Interface(InitializingBean, DisposableBean)
2. Bean Configuration( xml ) 
3. **Annotation** (Recommended)


Why annotation recommended 
	
> The JSR-250 @PostConstruct and @PreDestroy annotations are generally considered best practice for receiving lifecycle callbacks in a modern Spring application. Using these annotations means that your beans are not coupled to Spring-specific interfaces. For details, see Using @PostConstruct and @PreDestroy.

> If you do not want to use the JSR-250 annotations but you still want to remove coupling, consider init-method and destroy-method bean definition metadata.


```java
@Component
public class TestBean implements InitializingBean, DisposableBean {

    // Container calls
    // Spring reference :
    // We recommend that you do not use the InitializingBean interface, because it unnecessarily couples the code to Spring.
    // we suggest using the @PostConstruct annotation or specifying a POJO initialization method.
   @PostConstruct
   public void init(){
       System.out.println("POST CONSTURCT");
   }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("AFTER PROPERTIES SET");
    }

    @PreDestroy
    public void cleanup(){
        System.out.println("PRE DESTROY");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("AFTER DESTROY");
    }

}
```

```log
POST CONSTURCT
AFTER PROPERTIES SET
<!-- terminate process -->
PRE DESTROY
AFTER DESTROY

```


#### Default Initialization and Destroy Methods

When you write initialization and destroy method callbacks that do not use the Spring-specific InitializingBean and DisposableBean callback interfaces, you typically write methods with names such as init(), initialize(), dispose(), and so on. Ideally, the names of such lifecycle callback methods are standardized across a project so that all developers use the same method names and ensure consistency.

```java
//bad
@PreDestroy
void destroy(){}
//good
@PreDestroy
void dispose(){}
@PostConstruct
void init();
void initialize();

```