import express  from 'express'
import userRoute from './routes/userRoute'
import sequelize from './database/connection';
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
const app = express()

app.use(express.json());

sequelize.sync({force : false}).then(()=>{
    console.log("Synced!!")
})
// localhost:3000/api/auth/
app.use("/api/auth",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)

export default app 

