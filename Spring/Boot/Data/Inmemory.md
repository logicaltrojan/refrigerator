
### InMemory DB 

Supported in-memory database

1. **h2** (console supported)
2. HSQL
3. Derby



```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
```
Spring JDBC  => auto configures 
- DataSource
- JdbcTemplate


```java
// spring-boot-autoconfigure/spring.factories
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
```

#### H2 Database Dependency

```xml   
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

Database default property
```java
package org.springframework.boot.autoconfigure.jdbc;
public class DataSourceProperties implements BeanClassLoaderAware, InitializingBean {...

```

#### Using H2 Database 

```java
@Component
public class H2Runner implements ApplicationRunner {

    //auto configured & injected by spring jdbc
    @Autowired
    DataSource dataSource;

    @Autowired
    JdbcTemplate jdbcTemplate;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        try(Connection connection = dataSource.getConnection()) {

            System.out.println( connection.getMetaData().getURL());
            System.out.println( connection.getMetaData().getUserName());
            Statement statement = connection.createStatement();
            String sql = "CREATE TABLE USER(ID INTEGER NOT NULL, name VARCHAR(255), PRIMARY KEY(ID))";
            statement.execute(sql);
        }

        //try catch no need
        //Exception Catch
        jdbcTemplate.execute("INSERT INTO USER VALUES (1, 'troy')");

    }
}
```

To use H2 console, 

```java
//application.properties
spring.h2.console.enabled=true
```
```url
http://localhost:8080/h2-console/

```