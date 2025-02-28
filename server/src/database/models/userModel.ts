import { Table, Model, PrimaryKey, DataType, Column, IsNull, AllowNull, Unique } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})

class User extends Model{
    @PrimaryKey
    @Column({
        type : DataType.UUID, 
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Unique
    @AllowNull(false)
    @Column({
        type : DataType.STRING
    })
    declare username:string

    @Unique
    @AllowNull(false)
    @Column({
        type : DataType.STRING,
        validate: {
            isEmail: true
        }
    })
    declare email:string

    @AllowNull(false)
    @Column({
        type : DataType.STRING
    })
    declare password:string 

    @Column({
        type : DataType.ENUM('customer','admin'), 
        defaultValue : 'customer'
    })
    declare role:string
}

export default User