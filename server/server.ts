import adminSeeder from "./adminSeeder";
import app from "./src/app"
import envConfig from "./src/config/config";
require('dotenv').config();

function startServer(){
    const port = envConfig.port || 4000
    app.listen(port, ()=>{
        console.log(`Server running at ${port}`)
        adminSeeder()
    })
    
}



startServer()