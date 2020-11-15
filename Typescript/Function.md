
### Function

```ts
function getText(name: string, age : number) : string {  
    // (parm : param type) : return type

}

const getText : (name :string, age : number) => string = function (name, age) {
    // (parm : param type) => return type = function( ) { }
}
```

Optional Parameter

```ts
function getText(name : string, age: number, language? : string) : string{ 
    //language can be undefiend 

}
getText('mike', 23, 'ko') //ok
getText('mike', 23)  //ok
```

Optional Param has to be declared at last 
```ts
//error
function getText(name : string, language? : string, age :number) : string {
}
//good 
function getText(name : string, language : string | undefined, age :number) : string {
}
```

Default value 
```ts
function getText(name : string, , age :number = 15, language = 'korean') : string {
    //type can be refered by default value 
}

getText("tom") //ok
getText("tom", 23) //ok
getText("tom", 13, "kr") //ok
```

Rest Param
```ts

function getText(name : string, ...rest : number[]) : string {
    //type can be refered by default value 
}

getText('hi', 1, 2, 3);//ok
getText('hi', 1, '2', 3);//error

```
