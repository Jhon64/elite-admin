export namespace ValidadoresHelper{
/**Validar si es un objeto json */
export const isJson = (_object: any) => {
  try {
    JSON.parse(JSON.stringify(_object));
    return true;
  } catch (error) {
    return false;
  }
};
  export const validNumber=(value:number)=>value>=0
  export const isEmpty=(value:string)=>!value.trim().length
  export const isValidValue=(value?:any)=>{
    if(typeof  value === "string"){
      if(ValidadoresHelper.isEmpty(value))return false
    }
    if(typeof value ==="number" ){
      if(!ValidadoresHelper.validNumber(value))return false
    }
    return !!value;
  }
}
