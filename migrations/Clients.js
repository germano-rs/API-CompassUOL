const mysql = require("../mysql");

const Clients = {
  createTable: async () => {
    try {
      await mysql.execute(
        `CREATE TABLE IF NOT EXISTS clients
        (id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(150) NOT NULL,
        genre varchar(150) NOT NULL,
        birth_date varchar(50)  NOT NULL, 
        city_id int(11) NOT NULL, 
        PRIMARY KEY (id),
        CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES cities (id))`
      );
    } catch (error) {
      if (error) return console.log(error);
    }
  },
};
module.exports = Clients;
