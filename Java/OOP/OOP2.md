#### Overriding

Overriding Condition - Method Signature 
1. Same method name
2. Same Paramter
3. Same return type


Overriding Rules

1. 접근 제어자는 조상클래스의 메서드보다 좁은 범위로 변경할 수 없다 / Access modifiers can't be narrowed
2. 조상 클래스의 메서드 보다 더 많은 수의(더 넓은 범위의) 예외를 선언할 수 없다. / Can't throw exceptions broader than the overridden method
3. 인스턴스 메서드를 static 메서드로 또는 그 반대로 변경할 수 없다.

---
1. 접근 제어자는 조상클래스의 메서드보다 좁은 범위로 변경할 수 없다 / Access modifiers can't be narrowed



2. Can't throw exceptions broader than the overridden method

https://stackoverflow.com/questions/5875414/why-cant-overriding-methods-throw-exceptions-broader-than-the-overridden-method

Because of Polymorphism and [Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
```java
class A {
   public void foo() throws IOException {..}
}

class B extends A {
   @Override
   public void foo() throws SocketException {..} // allowed

   @Override
   public void foo() throws SQLException {..} // NOT allowed

   @Override
   public void foo() throws Exception {..} // NOT allowed
}
```
```java
A a = new B();
try {
    a.foo();
} catch (IOException ex) {
    // forced to catch this by the compiler
}
```

#### super(), Super Class Constructor

```java
this() // calls class's other constuctor
super() // calls super class's constructor
```





