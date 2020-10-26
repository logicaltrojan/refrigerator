### Test


https://docs.spring.io/spring-boot/docs/2.1.5.RELEASE/reference/html/boot-features-testing.html
junit5 

```java
@ExtendWith(SpringExtension.class) //spring continer
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK) //mock mvc 
@AutoConfigureMockMvc
class SampleControllerTest {

    @Autowired
    MockMvc mockMvc;


    @Test
    void hello() throws Exception {
        mockMvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("helloTroy"))
                .andDo(print());

    }

}
```

실제 내장 tomcat , servlet 가동
```java
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SampleControllerTest {

    @Autowired // testResttemplate injection
    TestRestTemplate testRestTemplate;

    @MockBean //Mock Bean으로 교체
    SampleService mockSampleService;

    //실제 servlet 가동
    //내장 tomcat 가동
    @Test
    void hello() throws Exception {
        when(mockSampleService.getName()).thenReturn("kyungdae");

        String forObject = testRestTemplate.getForObject("/hello", String.class);
        assertThat(forObject).isEqualTo("hellokyungdae");

    }

}

```

For webflux async

```java
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SampleControllerTest {

    @Autowired //webflux  asyncr
    WebTestClient webTestClient;

    @MockBean //Mock Bean으로 교체
    SampleService mockSampleService;

    @Test
    void hello() throws Exception {
        when(mockSampleService.getName()).thenReturn("kyungdae");

        webTestClient.get().uri("/hello").exchange().expectStatus().isOk()
                .expectBody(String.class).isEqualTo("hellokyungdae");

    }

}
```


#### Slice Test

1. @JsonTest
2. @WebMvcTest
3. @WebFluxTest
4. DataJpaTest

@JsonTest

Object - > Jackson - > json compare 


@WebMvcTest Slice Test

```java
@ExtendWith(SpringExtension.class)
@WebMvcTest(SampleController.class) //slicing , only @controller , @ControllerAdvice, .... only web related( excluding service repo)
class SampleControllerTest {

    @MockBean //Mock Bean으로 교체
    SampleService mockSampleService;

    @Autowired
    MockMvc mockMvc;

    @Test
    void hello() throws Exception {
        when(mockSampleService.getName()).thenReturn("kyungdae");

        mockMvc.perform(get("/hello"))
                .andExpect(content().string("hellokyungdae"));
    }
}
```

#### Test Utility

1. **OutputCapture**
2. TestPropertyValues
3. TestRestTemplate
4. ConfigFileApplicationContextInitializer

```java
@ExtendWith(OutputCaptureExtension.class)
class OutputCaptureExtensionTests {

    @Test
    void outputTest(CapturedOutput capturedOutput) {

        System.out.println("hello world");
        assertThat(capturedOutput).contains("hello world");

    }
}

@ExtendWith(OutputCaptureExtension.class)
class OutputCaptureExtensionTests {

    private final CapturedOutput capturedOutput;

    @Autowired
    OutputCaptureExtensionTests(CapturedOutput capturedOutput) {
        this.capturedOutput = capturedOutput;
    }

    // ...
}
```