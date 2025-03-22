import { Table, Model, PrimaryKey, DataType, Column, IsNull, AllowNull, Unique,Default } from "sequelize-typescript";
import {paymentMethod, paymentStatus} from '../../globals/types'

@Table({
    tableName: "payment",
    modelName: "Payment",
    timestamps: true
})

export default class Payment extends Model{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id : string

    @AllowNull(false)
    @Column({
        type:DataType.ENUM(paymentMethod.COD,paymentMethod.Esewa,paymentMethod.Khalti),
        
    })
    declare paymentMethod : string

    @Default(paymentStatus.Unpaid)
    @Column({
        type : DataType.ENUM(paymentStatus.Paid,paymentStatus.Unpaid)
    })
    declare paymentStatus : string
}