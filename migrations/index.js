const migrateClient = require("./Clients")
const migrateCities = require("./Cities")

const Migrations = {
    migrate: async ()=>{
   
       await migrateCities.createTable()
       await migrateClient.createTable()
    }
}
module.exports = Migrations;
