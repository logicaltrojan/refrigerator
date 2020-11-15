#### Enum


Enum Type 의 원소는 type and value로 사용될 수 있다.


```ts
enum Fruit {
    Apple,
    Banana,
    Orange
}

const v1 : Fruit = Fruit.Apple;
const v2 : Fruilt.Apple | Fruit.Banana = Fruit.Banana
```

명시적으로 할당되지 않을 경우는 0부터 1증가한 값. 명시적으로 할당되었을 경우는 그 값으로 부터 1증가함

```ts
enum Fruit {
    Apple,
    Banana = 5,
    Orange
}

console.log(Fruit.Apple, Fruit.Banana, Fruit.Organge)
//0, 5, 6
```

이름 과 값이 양방향으로 mapping 

```ts

enum Fruit {
    Apple,
    Banana = 5,
    Orange
}
console.log(Fruit.Banana);
console.log(Fruit['Banana']);
console.log(Fruit[5]);

```

value를 문자열로 할당 가능 but 이떄는 단방향이다.

```ts
enum Country { 
    China = "cn",
    Korea = "kr",
    UnitedStates ="us"
}
//not allowed
Country["cn"] 
```


#### Compile tip

Use const enum

```ts
const enum Fruit {
    Apple,
    Banana,
    Orange
}
const fruit = Fruit.Apple;

// after compile var fruit = 0
```