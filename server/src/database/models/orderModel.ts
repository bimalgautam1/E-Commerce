
import {Table,Column,Model,DataType, PrimaryKey, AllowNull} from 'sequelize-typescript'
import { orderStatus } from '../../globals/types'

@Table({
    tableName:'orders',
    modelName: "Order",
    timestamps:true,
    paranoid:true
})

class Order extends Model{
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id:string

    @AllowNull(false)
    @Column({
        type:DataType.STRING,
        validate:{
            len:{
                args :[10,10],
                msg:'Phone number must be of size 10'
            }
        }
    })
    declare phoneNumber : string

    @AllowNull(false)
    @Column({
        type:DataType.STRING,
    })
    declare shippingAddress : string

    @AllowNull(false)
    @Column({
        type:DataType.FLOAT,
    })
    declare totalAmount:number

    @Column({
        type:DataType.ENUM(orderStatus.Cancelled,orderStatus.Delivered,orderStatus.Onthewaty,orderStatus.Pending,orderStatus.Preparation),
        defaultValue : orderStatus.Pending
    })
    declare orderStatus : string
}

export default Order