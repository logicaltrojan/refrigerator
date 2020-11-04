### JDBC and DBCP
https://d2.naver.com/helloworld/5102792

https://gompangs.tistory.com/entry/DB-DBCP-%EA%B5%AC%ED%98%84-DB-Connection-Pooling

https://www.holaxprogramming.com/2013/01/10/devops-how-to-manage-dbcp/

https://www.baeldung.com/java-connection-pooling

https://www.kdata.or.kr/info/info_04_view.html?field=&keyword=&type=techreport&page=18&dbnum=183740&mode=detail&type=techreport

JDBC : Java DataBase Connector
DBCP : Data Base Connection Pool

#### DBCP : Database Connection Pool

Why Connection Pooling? 

https://www.baeldung.com/java-connection-pooling


Makign DB Connect is expensive.
```java
// https://www.holaxprogramming.com/2013/01/10/devops-how-to-manage-dbcp/ 
String driverPath = "net.sourceforge.jtds.jdbc.Driver";
String address = "jdbc:jtds:sqlserver://IP/DB";
String userName = "user";
String password = "password";
String query = "SELECT ... where id = ?";
try {
 Class.forName(driverPath); //1
 Connection connection = DriverManager.getConnection(address, userName, password);//2
 PreparedStatement ps = con.prepareStatement(query);//3
 ps.setString(1, id);//4
 ResultSet rs = get.executeQuery();//5
 // ....
} catch (Exception e) { }
} finally {
 rs.close();//6
 ps.close();//7
}
```

1. JDBC Driver load
2. DB Connection 객체 생성
3. Connection 객체로부터 Prepared Statement 객체
4. PS Setting
5. Execute Query
6. 7. Resource close

=> 2 : Expensive 물리적으로 db서버에 연결되어 connection 객체를 생성하기 때문

```
1. Opening a connection to the database using the database driver
2. Opening a TCP socket for reading/writing data
3. Reading / writing data over the socket
4. Closing the connection
5. Closing the socket
```

DBCP 의 경우 매번 요청을 위해 connection을 생성하는 것이 아닌, 일정 connection을 pool형태로 관리하여 필요시 제공

#### DBCP : Basic Implementation

```java
public interface ConnectionPool {
    Connection getConnection();
    boolean releaseConnection(Connection connection);
    String getUrl();
    String getUser();
    String getPassword();
}
```
```java
public class BasicConnectionPool implements ConnectionPool {

    private String url;
    private String user;
    private String password;
    private List<Connection> connectionPool;
    private List<Connection> usedConnections = new ArrayList<>();
    private static int INITIAL_POOL_SIZE = 10;
    
    public static BasicConnectionPool create(
      String url, String user, 
      String password) throws SQLException {
 
        List<Connection> pool = new ArrayList<>(INITIAL_POOL_SIZE);
        for (int i = 0; i < INITIAL_POOL_SIZE; i++) {
            pool.add(createConnection(url, user, password));
        }
        return new BasicConnectionPool(url, user, password, pool);
    }
    
    // standard constructors
    
    @Override
    public Connection getConnection() {
        Connection connection = connectionPool
          .remove(connectionPool.size() - 1);
        usedConnections.add(connection);
        return connection;
    }
    
    @Override
    public boolean releaseConnection(Connection connection) {
        connectionPool.add(connection);
        return usedConnections.remove(connection);
    }
    
    private static Connection createConnection(
      String url, String user, String password) 
      throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }
    
    public int getSize() {
        return connectionPool.size() + usedConnections.size();
    }
 
    // standard getters
}

```

#### DBCP : Framework

1. ApacheCommons DBCP
2. HikariCP

HikariCP Sample
```java
public class HikariCPDataSource {
    
    private static HikariConfig config = new HikariConfig();
    private static HikariDataSource ds;
    
    static {
        config.setJdbcUrl("jdbc:h2:mem:test");
        config.setUsername("user");
        config.setPassword("password");
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        ds = new HikariDataSource(config);
    }
    
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
    
    private HikariCPDataSource(){}
}
```

#### Apache Commons DBCP 

https://commons.apache.org/proper/commons-dbcp/download_dbcp.cgi


<img src="https://lh5.googleusercontent.com/0yuTW7sJhPs3K6fRqg1bYZS74uFQCgDbvwBUKsvLyQdKctq2T2EySjv4C3NST49mDFEI6CzYcu7S0OiNTFgbUc_KjC8XxYRnYlQ0T7-zwaTOm8Fh0VZcPizon7WQUpwejQ">

Value | Desc 
-|-
maxActive | 동시 사용 최대 커넥션 개수
maxIdle | Connection Pool에 반납할 때 최대로 유지될 수 있는 커넥션 개수
minIdle | 최소한으로 유지할 커넥션 개수
initialSize | 	최초로 getConnection() Method를 통해 커넥션 풀에 채워 넣을 커넥션 개수

1. maxActive >= initialSize
2. maxActive = maxIdle
maxActive 값과 maxIdle 값은 같은 것이 바람직하다. 만약 둘의 값이 아래와 같다고 가정해보자.
```
maxActive = 10
maxIdle = 5
```
항상 커넥션을 동시에 5개는 사용하고 있는 상황에서 1개의 커넥션이 추가로 요청된다면 maxActive = 10이므로 1개의 추가 커넥션을 데이터베이스에 연결한 후 Pool은 비즈니스 로직으로 커넥션을 전달한다. 이후 비즈니스 로직이 커넥션을 사용 후 풀에 반납할 경우, **maxIdle = 5에 영향을 받아 커넥션을 실제로 닫아버리므로**, 일부 커넥션을 매번 생성했다 닫는 비용이 발생할 수 있다.

initialSize와 maxActive, maxIdle, minIdle 항목을 동일한 값으로 통일해도 무방하다.
커넥션 개수와 관련된 가장 중요한 성능 요소는 일반적으로 **커넥션의 최대 개수**다. 4개 항목의 설정 값 차이는 성능을 좌우하는 중요 변수는 아니다.

maxActive 값은 DBMS의 설정과 애플리케이션 서버의 개수, Apache, Tomcat에서 동시에 처리할 수 있는 사용자 수 등을 고려해서 설정해야 한다. DBMS가 수용할 수 있는 커넥션 개수를 확인한 후에 애플리케이션 서버 인스턴스 1개가 사용하기에 적절한 개수를 설정한다. 사용자가 몰려서 커넥션을 많이 사용할 때는 maxActive 값이 충분히 크지 않다면 병목 지점이 될 수 있다. 반대로 사용자가 적어서 사용 중인 커넥션이 많지 않은 시스템에서는 maxActive 값을 지나치게 작게 설정하지 않는 한 성능에 큰 영향이 없다.

Commons DBCP에서는 DBMS에 로그인을 시도하고 있는 커넥션도 사용 중인 것으로 간주한다. 만약 DBMS에 로그인을 시도하고 있는 상태에서 무한으로 대기하고 있다면, 애플리케이션에서 모든 커넥션이 사용 중인 상태가 돼 새로운 요청을 처리하지 못할 수도 있다. 이런 경우 장애 확산을 최소화하려면 Microsoft SQL Server의 JDBC 드라이버에서 설정하는 loginTimeOut 속성같은 JDBC 드라이버별 타임아웃 속성을 설정하는 것이 좋다.

WAS의 Thread 수와 Connection Pool 수의 관계

WAS에서 설정해야 하는 값이 굉장히 많지만, 그 중 가장 성능에 많은 영향을 주는 부분은 Thread와 Connection Pool의 개수 이다.
이들 값은 직접적으로 메모리와 관련이 있기 때문에, 많이 사용하면 할 수록 메모리를 많이 점유하게 된다. 그렇다고 반대로 메모리를 위해 적게 지정한다면, 서버에서는 많은 요청을 처리하지 못하고 대기 할 수 밖에 없다.
