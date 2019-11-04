 module.exports = {
  "development": {        
    "database": "database_development",    
    "dialect": "sqlite",
    "operatorsAliases": false
  },
  "test": {   
    "database": "database_test",    
    "dialect": "sqlite",
    "operatorsAliases": false
  },
  "production": {    
    "url": process.env.DATABASE_URL,
  }
}
