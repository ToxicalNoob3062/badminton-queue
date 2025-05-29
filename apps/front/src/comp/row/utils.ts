export function decideSwapRowColor(id:string):string {
  const idInt = parseInt(id);
  if (idInt >=1 && idInt <= 8 ){
    return "bg-lime-200"
  }
  else if (idInt >=9 && idInt <= 10 ){
    return "bg-yellow-200"
  }else{
    return "bg-red-200";
  }
}
