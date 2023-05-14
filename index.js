

const app = require('./app')
require('dotenv').config()
require('./config/database').connect()


let port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})