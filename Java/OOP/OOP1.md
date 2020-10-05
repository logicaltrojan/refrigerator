

3.7 
JVM Memory Structure

![img](https://brucehenry.github.io/blog/public/2018/02/07/JVM-Memory-Structure/JVM-Memory.png)


Method Area  
Class Data / Class Variable(Static Var)

Heap
All the objects. Instance Variable included.

Call Stack(Execution Stack)


6.1 변수의 초기화 

지역 변수는 사용하기 전에 반드시 초기화 해야한다. 

```java
class InitTest{
    int x;  // instance variable. init to 0
    int y = x;
    void method(){
        int i ;
        int j = i; //error
    }
}
```

> Class Variable / Instans Varialbe의 초기화는 선택적이지만, 지역변수의 초기화는 필수이다. 


default init value 

| type             | default  |
| :--------------- | -------- |
| boolean          | false    |
| char             | '\u0000' |
| byte, short, int | 0        |
| long             | 0L       |
| float            | 0.0f     |
| double           | 0.0d     |
| 참조형 변수      | null     |


 6.3 Initialization Block

클래스 초기화 브록 - 클래스 변수의 복잡한 초기화
인스턴스 초기화 블록 - 인스턴스 변수의 복잡한 초기화 

```java
class InitBlock { 
    static { 
        // Class Init block
    }
    { 
        // intance init block

    }
}
```

6.4 멤버 변수의 초기화 시기와 순서

> 클래스 변수의 초기화 시점 : 클래스 로딩 시점
> 인스턴스 변수의 초기화 시점 : 인스턴스가 생성될 때마다 각 인스턴스 별 초기화

> 클래스 변수의 초기화 순서 : 기본값 -> 명시적 초기화 -> 클래스 초기화 블록
> 인스턴스 변수의 초기화 순서 : 기본값 -> 명시적 초기화 -> 인스턴스 초기화 블록 -> 생성자

```java

// 1.  cv = 0 default val 
class InitTst { 
    static int cv = 1;  // 2 .명시적 초기화
    int iv = 2;  //  1. default 2. explicit

    static { 
        cv = 2;  //3. 초기화 블록
    }

    {
        iv = 10;  //3 
    }

    InitTst(){ 
        iv = 3; //4 
    }
}

```