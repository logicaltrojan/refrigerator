### Function

#### Overloading

```ts

//add(string , string) => string 
//add(number, number) => number

function add(x:number | string, y :number | string) : number | string { 
    if(typeof x === 'number' && typeof y === 'number'){}
    //...
}

const v1 : number | string = add(1,2); // number => number not guranteed
add(1, '2') //allowed 


//overloading 
function add(x:number ,y :number) : number; 
function add(x:string,y :string) : string;
function add(x :number | string, y: number | string) :number |string {

}

const v1 : number = add(1,2); // number => number guranteed
add(1, '2') //error

```

#### Named Paramter
```ts
function getText(name : string, age =15, lang? : string) : string { 
    return "string";
}

//named 

function getText(
    { name, age = 15, lang }: 
    { name: string; age?: number; lang?: string; }) : string { 
    return "string";
}

//interface 

interface Param = { name: string; age?: number; lang?: string; }
function getText( { name, age = 15, lang }: Param) : string { 
    return "string";
}
```