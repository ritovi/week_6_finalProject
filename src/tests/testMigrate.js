require('../models')
const sequelize = require('../utils/connection');
const func = require("./createData/createEntrance");

const testMigrate = async () => {

  try {
    await sequelize.sync({ force: true })
    await func();
    console.log('DB reset ✅');
    process.exit()
  } catch (error) {
    console.error(error);
  }
}

testMigrate()