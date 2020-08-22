function starts(rate){
  let startList = []; //8.9  4.45  , 6.5/2  3.25
  let start = rate/2;
  let newStart = start.toString().substring(0,1)
  for(let i =1;i<5;i++){
    if(i<=newStart){
      startList.push(1)
    }else if(i>=newStart){
      startList.push(0)
    }
  }
  if(starts%1 !=0){
    startList.splice(newStart,0,2)
  }
  return startList
}

module.exports = {
  starts
}
