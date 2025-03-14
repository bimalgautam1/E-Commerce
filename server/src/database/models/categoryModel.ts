import { Table, Column , AllowNull ,Model, PrimaryKey , DataType } from "sequelize-typescript";

@Table({
    tableName : "categories",
    modelName : "Category",
    timestamps : true
})

class Category extends Model{
    @PrimaryKey
    @Column({
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING,
    })
    declare categoryName : string

}

export default Category