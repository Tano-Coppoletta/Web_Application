'use strict'

const myStrings=["spring","summer","winter","autumn","a","it","cat"];

function modifyString(strings){
    let result=[];
    let i=0;
 //   strings.map(s => s.toUpperCase());//+s[1]+s[s.length-2]+s[s.length-1]);

 for(let s of strings){
     if(s.length<2)
        result[i++]="";
    else if(s.length===2){
        result[i++]=s+s;
    }else if(s.length===3){
        result[i++]=s[0]+s[1]+s[1]+s[2];
    }else
        result[i++]=s[0]+s[1]+s[s.length-2]+s[s.length-1];
     
 }
 return result;
}


const myModifiedString=modifyString(myStrings)

console.log(myModifiedString);
