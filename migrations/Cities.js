const mysql = require("../mysql");

const Cities = {
  createTable: async () => {
    try {
      await mysql.execute(
        `CREATE TABLE IF NOT EXISTS cities
        (id int(11) NOT NULL AUTO_INCREMENT,
        city_name varchar(150) NOT NULL,
        state varchar(150)  NOT NULL,
        PRIMARY KEY (id))`
      );
    } catch (error) {
      if (error) return console.log(error);
    }
  },
};
module.exports = Cities;
