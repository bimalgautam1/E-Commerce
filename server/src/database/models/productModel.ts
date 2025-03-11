import { Table, Model, PrimaryKey, DataType, Column, IsNull, AllowNull, Unique } from "sequelize-typescript";

@Table({
    tableName: "products",
    modelName: "Products",
    timestamps: true
})

class Products extends Model{
    @PrimaryKey
    @Column({
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @AllowNull(false)
    @Column({
        type : DataType.STRING
    })
    declare productName:string

    @AllowNull(false)
    @Column({
        type : DataType.TEXT,
    })
    declare productDescription:string

    @AllowNull(false)
    @Column({
        type : DataType.FLOAT
    })
    declare productPrice:number 

    @AllowNull(false)
    @Column({
        type : DataType.INTEGER
    })
    declare productTotalStock:number 

    @Column({
        type : DataType.INTEGER
    })
    declare discount:number 

    @AllowNull(false)
    @Column({
        type : DataType.STRING
    })
    declare productImageUrl:string 


}

export default Products