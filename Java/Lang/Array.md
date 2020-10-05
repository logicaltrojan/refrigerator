### Array


#### Array 
1.1 
Array : 같은 타입의 여러 변수를 하나의 묶음으로 다루는 것

1.2 배열의 선언과 생성

```java

int[] score;
String[] name;

int score[];
String name[];

타입[] 변수이름;
변수이름 = new 타입[길이];

int[] score;
score = new int[5];

int a = 4; 
score = new int[a];
```

1.3 배열의 길이와 인덱스

인덱스의 범위는 0 - (배열길이 -1)


**배열의 길이 = int범위의 양의 정수(0포함)**

```java

int[] score;
score = new int[5];
score.length // 5 
```

1.4 배열의 초기화

```java
int [] score = new int[]{50, 60, 70, 80, 90};
int [] score = {50,60,70,80,90}; // available
int [] score;
score = {50,60,70,80,90} //error

int add(int[] arr);
add(new int[]{50, 60, 70, 80, 90}) // good;
add({50, 60, 70, 80, 90}); // error
```
배열 출력

```java 
System.out.println(Arrays.toString(iArr));
```

1.5 배열의 복사

Use **System.arraycopy()**

```java
for(int i = 0; i < num.length; i++){
    newNum[i] = num[i];
}

System.arraycopy(num, 0, newNum, 0, num.length)
// num[0] -> newNum[0] , num.length copy
```


#### String Array

2.1 Declaration / Instanization 

```java
String[] name = new String[3];
```

2.2 Initialization of String Array
```java
String[] name = new String[]{"kin", "hi"};
String[] name = {"kin", "hi"};
```
name array holds **reference of string element** not string object.


2.3 char array and String class

>Char Array + Util Functional  = String 


**String Object is IMMUTABLE** 
=> this leads to a lot of problem... later...
```java
String str = "Java";
str = str + "8"; //  Make New String Object and save ref to str 
System.out.println(str); // java 8 
```

2.4  Command Line Arguments

```cmd 
c:\jdk.1.9\work\> java MainTst abc 123
```

```java

public static void main(String[] args){
    //args[0] = abc
    //args[1] = 123
}
```


#### Multi Dimensional Array

3.1 Two Dimension Array Declaration and Index

```java 
int[][] score = new int[4][3];
int score[][];
int[] score[];
```

3.2 Initialization of two dimensional arrays
```java
int[][] arr = new int[][]{{ 1,2,3}, {4,5,6}};
int[][] arr = {{ 1,2,3}, {4,5,6}};
```

3.3 Dynamic Arrays

```java
int[][] score= new int[5][]; // 두번째 차원의 길이는 정하지 않는다 .
score[0] = new int[3];
score[1] = new int[1];
score[2] = new int[2];
score[3] = new int[4];
```