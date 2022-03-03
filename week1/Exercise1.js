'use strict';

const scores = [28, 25, 21, 30, 18, 24, 22] ;

console.log(scores.join(', ')); //print the values of the array

const new_scores =[...scores] //copy of the array scores

//find the minimum
//I can't sort because if I do I lose the chronological order

let min_pos = 0;

for(let i=0;i<new_scores.length;i++){
    if(scores[i]<scores[min_pos])
        min_pos=i;
}

new_scores.splice(min_pos,1) //it removes one element at pos= min_pos


console.log(new_scores.join(', '));


min_pos = 0;


for(let i=0;i<new_scores.length;i++){
    if(new_scores[i]<new_scores[min_pos])
        min_pos=i;
}


new_scores.splice(min_pos,1) //it removes one element at pos= min_pos


console.log(new_scores.join(', '));