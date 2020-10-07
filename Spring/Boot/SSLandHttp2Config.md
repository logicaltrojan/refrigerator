


#### SSL Config

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-configure-ssl

1. keystore gen 

```shell
 keytool -genkey -alias spring -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 4000
```
2. ssl config

```yml
server.ssl.key-store=keystore.p12
server.ssl.key-store-type=PKCS12
server.ssl.key-store-password=password
server.ssl.key-alias=spring
server.port=8443
```

```shell
curl -I -k --http2 https://localhost:8080/hello

HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 5
Date: Wed, 07 Oct 2020 14:28:32 GMT


```

#### How do I use http / https both ? 

Add ServletWebServerFactory Bean with additional Connector

```java
    @Bean
    public ServletWebServerFactory servletWebServerFactory(){
        TomcatServletWebServerFactory tomcatServletWebServerFactory = new TomcatServletWebServerFactory();
        tomcatServletWebServerFactory.addAdditionalTomcatConnectors(createStandardConnector());

        return tomcatServletWebServerFactory;
    }
    private Connector createStandardConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(8080);
        return connector;
    }
```


#### HTTP2 Config
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-configure-http2

Diffrent configuration / dependency by servlet container(Tomact, Netty, Jetty, Undertow)

1. Undertow 
    Dependency
    - **Must implement ssl**
```yml
server.http2.enabled=true
```