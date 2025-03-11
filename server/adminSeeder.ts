import envConfig from "./src/config/config"
import User from "./src/database/models/userModel"
import bcrypt from 'bcrypt'
const adminSeeder =async()=>{

    const [data] = await User.findAll({
        where :{
            email : envConfig.admin_email
        }
    })
    if(!data){
    await User.create({
        username : envConfig.admin_username,
        password : bcrypt.hashSync(envConfig.admin_password,14),
        email : envConfig.admin_email,
        role : "admin"
    })
    console.log("Admin Seeded!!")
}else{
    console.log("Admin already seeded!!")
}
}

export default adminSeeder