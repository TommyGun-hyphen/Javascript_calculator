let factor = 10;
let factorDir = 1;
let precision = 0;
let number = 0;
let operations = "";
let current = operations;
function setFactorDir(n) {
    factorDir = n;
    factor = .1;
}
function digit(n) {
    // if (factorDir == 1) {
    //     number *= factor;
    //     number += n;
    // } else {
    //     number += n * factor;
    //     factor /= 10;
    //     precision++;
    //     number = Number(number.toFixed(precision));
    // }
    operations = operations + n;
    updateResult(operations);
}
function operation(op) {
    setFactorDir(1);
    operations = operations + ' ' + op + ' ';
    updateResult(operations);
    number = 0;
}
function solve() {
    //current.push(number);
    number = myEval(operations.split(' '));
    updateResult(number[0], operations);
    reset();
}
function updateResult(res, op) {
    document.getElementById('primary').innerHTML = res;
    document.getElementById('secondary').innerHTML = op||"";
}
function reset(){
    operations = number;
    factorDir = 1;
    factor = 10;
}
function CE(){
    number = 0;
    operations = [];
    factorDir = 1;
    factor = 10;
    updateResult('','');
}

// My Eval

function removePar(arr){ //remouve les parentheses. remplace le centenu par un array
    let openC = 0;
    let openIndex = arr.indexOf('(');
    let closeIndex;
    let nbOpenC = arr.reduce((prev,curr)=>{
        if(curr == '(')return prev+1;
        return prev;
    }, 0);

    for(let o = 0; o < nbOpenC; o++){
        for(let i = openIndex; i < arr.length; i++){
            if(arr[i] == ')' && openC == 1){
                closeIndex = i;
                let par = removePar(arr.slice(openIndex+1, closeIndex));
                arr.splice(openIndex,closeIndex-openIndex+1, par)
                break;
            }else if(arr[i] == ')') openC--;
            else if(arr[i] == '(')openC++;
        }
        openC = 0;
        openIndex = arr.indexOf('(');
        closeIndex;
    }
    
    
    arr = arr.filter((e)=>e!='');
    arr = arr.map((e)=>{
        if(e.length == 1)return e[0];
        return e;
    });
    return arr;
}
function myEval(ops){
    ops = removePar(ops);
    //functions
    for(let i = 0; i < ops.length;i++){
        // console.log(ops);
        if(ops[i] == 'Math.cos'){
            if(ops[i+1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Math.cos(ops[i+1]);
            ops.splice(i,2, res);
            // i--;

        }
        if(ops[i] == 'Math.sin'){
            if(ops[i+1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Math.sin(ops[i+1]);
            ops.splice(i,2, res);
            // i--;
        }
        if(ops[i] == 'Math.tan'){
            if(ops[i+1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Math.tan(ops[i+1]);
            ops.splice(i,2, res);
            // i--;
        }
        if(ops[i] == 'Math.sqrt'){
            if(ops[i+1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Math.sqrt(ops[i+1]);
            ops.splice(i,2, res);
            // i--;
        }
        
    }
    //mult and div
    for(let i = 0; i < ops.length;i++){
        if(ops[i] == '*'){
            if(ops[i+1] === undefined || ops[i-1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i-1])) ops[i-1] = myEval(ops[i-1]);
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Number(ops[i-1]) * Number(ops[i+1]);
            ops.splice(i-1,3, res);
            i--;
        }
        if(ops[i] == '/'){
            if(ops[i+1] === undefined || ops[i-1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i-1])) ops[i-1] = myEval(ops[i-1]);
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Number(ops[i-1]) / Number(ops[i+1]);
            ops.splice(i-1,3, res);
            i--;
        }
    }
    //addition and substraction
    for(let i = 0; i < ops.length;i++){
        if(ops[i] == '+'){
            if(ops[i+1] === undefined || ops[i-1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i-1])) ops[i-1] = myEval(ops[i-1]);
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Number(ops[i-1]) + Number(ops[i+1]);
            ops.splice(i-1,3, res);
            i--;
        }
        if(ops[i] == '-'){
            if(ops[i+1] === undefined || ops[i-1] === undefined){
                return false;
            }
            if(Array.isArray(ops[i-1])) ops[i-1] = myEval(ops[i-1]);
            if(Array.isArray(ops[i+1])) ops[i+1] = myEval(ops[i+1]);
            let res = Number(ops[i-1]) - Number(ops[i+1]);
            ops.splice(i-1,3, res);
            i--;
        }
    }
    if(ops.length == 1 && Array.isArray(ops[0])){
        ops = myEval(ops[0]);
    }
    return ops;
}

console.log((removePar('( 2 + 2 ) + ( 2 + 2 )'.split(' '))));
