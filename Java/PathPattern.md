### PathPattern

https://docs.spring.io/spring-framework/docs/5.3.0/javadoc-api/org/springframework/web/util/pattern/PathPattern.html#extractPathWithinPattern-org.springframework.http.server.PathContainer-



#### How It is Used in Spring Gateway filter 

```java
	@Override
	public Predicate<ServerWebExchange> apply(Config config) {
		final ArrayList<PathPattern> pathPatterns = new ArrayList<>();
        //synchronized 가 필요없을 거 같은데... 
		synchronized (this.pathPatternParser) {
			pathPatternParser.setMatchOptionalTrailingSeparator(
					config.isMatchOptionalTrailingSeparator());
			config.getPatterns().forEach(pattern -> {
				PathPattern pathPattern = this.pathPatternParser.parse(pattern);
				pathPatterns.add(pathPattern);
			});
		}
		return new GatewayPredicate() {
			@Override
			public boolean test(ServerWebExchange exchange) {
				PathContainer path = parsePath(
						exchange.getRequest().getURI().getRawPath());

				Optional<PathPattern> optionalPathPattern = pathPatterns.stream()
						.filter(pattern -> pattern.matches(path)).findFirst();

				if (optionalPathPattern.isPresent()) {
					PathPattern pathPattern = optionalPathPattern.get();
					traceMatch("Pattern", pathPattern.getPatternString(), path, true);
					PathMatchInfo pathMatchInfo = pathPattern.matchAndExtract(path);
					putUriTemplateVariables(exchange, pathMatchInfo.getUriVariables());
					return true;
				}
				else {
					traceMatch("Pattern", config.getPatterns(), path, false);
					return false;
				}
			}


```

1. Assume we want to extract param variable from path
```
/head/{headName}/tail/{tailName}
```

2. Parse string as pathPattern by using PathPatternParser, parse() method
```java
/**
	 * Process the path pattern content, a character at a time, breaking it into
	 * path elements around separator boundaries and verifying the structure at each
	 * stage. Produces a PathPattern object that can be used for fast matching
	 * against paths. Each invocation of this method delegates to a new instance of
	 * the {@link InternalPathPatternParser} because that class is not thread-safe.
	 * @param pathPattern the input path pattern, e.g. /project/{name}
	 * @return a PathPattern for quickly matching paths against request paths
	 * @throws PatternParseException in case of parse errors
	 */
	public PathPattern parse(String pathPattern) throws PatternParseException {
         //Skip 
         //...
         //...
		return new InternalPathPatternParser(this).parse(pathPattern);
	}
```

3. Parse url with PathContainer.parsePath()
```java
/**
	 * Parse the path value into a sequence of {@code "/"} {@link Separator Separator}
	 * and {@link PathSegment PathSegment} elements.
	 * @param path the encoded, raw path value to parse
	 * @return the parsed path
	 */
	static PathContainer parsePath(String path) {
		return DefaultPathContainer.createFromUrlPath(path, Options.HTTP_PATH);
	}
```

4. Use as a pattern predication or extract PathMatchInfo
```java
/**
* Whether this pattern matches the given path.
* @param pathContainer the candidate path to attempt to match against
* @return {@code true} if the path matches this pattern
*/
pathPattern.matches(PathContainer pathContainer) {}
/**
* Match this pattern to the given URI path and return extracted URI template
* variables as well as path parameters (matrix variables).
* @param pathContainer the candidate path to attempt to match against
* @return info object with the extracted variables, or {@code null} for no match
*/
pathPattern.matchAndExtract(PathContainer pathContainer){ }
```