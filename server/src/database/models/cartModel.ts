//userID , productId , quantity

import { Table, Column, DataType , NotNull,Model, PrimaryKey, AllowNull   } from "sequelize-typescript";

@Table({
    tableName:"carts",
    modelName:'Cart',
    timestamps:true,
    paranoid:true
})

class Cart extends Model{
//primary key for Cart Table i.e id
@PrimaryKey
@Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4
})
declare id:string

@AllowNull(false)
@Column({
    type:DataType.INTEGER
})
declare productquantity:number
}

export default Cart