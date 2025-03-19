
import {Table,Column,Model,DataType, PrimaryKey, AllowNull} from 'sequelize-typescript'


@Table({
    tableName:'orderDetails',
    modelName: "Orderdetails",
    timestamps:true,
    paranoid:true
})

class OrderDetail extends Model{
    
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @AllowNull(false)
    @Column({
        type  :DataType.INTEGER
    })
    declare quantiy : number
}
export default OrderDetail