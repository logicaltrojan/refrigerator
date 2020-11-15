

function getText(
    { name, age = 15, lang }: 
    { name: string; age?: number; lang?: string; }) : string { 
    return "string";
}


interface Person { 
    name : string;
    age? : number;  //optional
}

const p1 : Person = { name : 'mike'};


interface Person2 { 
    name : string;
    age : number | undefined
}

const p2 : Person2 = { name : 'mike', age : undefined};


interface Person3 { 
    readonly name : string;
    age? : number;
}
const p333 = { 
    name : 'mike',
    birthday : '1998-12-22'
}
const p33 : Person3 = p333; //allowed 

const p3 : Person3 = { 
    name : 'mike' ,
    birthday : '1993' //not allowed
}


