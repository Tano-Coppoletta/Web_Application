'use strict';

const scores = [28, 25, 21, 30, 18, 24, 22] ;

console.log(scores.join(', ')); //print the values of the array

const new_scores =[...scores] //copy of the array scores

//find the minimum
//I can't sort because if I do I lose the chronological order

let min_pos = 0;

for(let i=0;i<new_scores.length;i++){
    if(new_scores[i]<new_scores[min_pos])
        min_pos=i;
}

new_scores.splice(min_pos,1) //it removes one element at pos= min_pos

min_pos = 0;


for(let i=0;i<new_scores.length;i++){
    if(new_scores[i]<new_scores[min_pos])
        min_pos=i;
}


new_scores.splice(min_pos,1) //it removes one element at pos= min_pos


//compute the average over new_scores
let new_avg=0;
for (let x of new_scores){
    new_avg+=x;
}
new_avg /=new_scores.length;

//add two new scores equal to the avg
new_scores.push(Math.round(new_avg));
new_scores.push(Math.round(new_avg));

console.log(new_scores.join(', '));