const findData =async(model:any,data:string)=>{
    const [result] = await model.findAll({
        where :{
            email : data
        }
    })
    return result
}
export default findData