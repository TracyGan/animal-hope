const oracledb = require("oracledb");
require("dotenv").config();
const loadEnvFile = require("./utils/envUtil");

const envVariables = loadEnvFile("./.env");

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASS,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DBNAME}`,
  poolMin: 1,
  poolMax: 3,
  poolIncrement: 1,
  poolTimeout: 60,
};

// initialize connection pool
async function initializeConnectionPool() {
  try {
    // oracledb.initOracleClient({
    //   libDir: null,
    // });
    await oracledb.createPool(dbConfig);
    console.log("Connection pool started");
  } catch (err) {
    console.error("Initialization error: " + err.message);
  }
}

async function closePoolAndExit() {
  console.log("\nTerminating");
  try {
    await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
    console.log("Pool closed");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

initializeConnectionPool();

process.once("SIGTERM", closePoolAndExit).once("SIGINT", closePoolAndExit);

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
  let connection;
  try {
    connection = await oracledb.getConnection(); // Gets a connection from the default pool
    return await action(connection);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
  return await withOracleDB(async (connection) => {
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM DEMOTABLE");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchAnimaltable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Animal A, AnimalTypes T WHERE A.Breed = T.Breed");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchFoodtable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM Food`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function initiateDemotable() {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP TABLE DEMOTABLE`);
    } catch (err) {
      console.log("Table might not exist, proceeding to create...");
    }

    const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
    return true;
  }).catch(() => {
    return false;
  });
}

async function validateSignIn(username, password) {
  return await withOracleDB(async (connection) => {
    console.log("in appservice");
    const result = await connection.execute(
      `SELECT * FROM PaidStaff WHERE Username =: username AND Password =: password`,
      [username, password],

      { autoCommit: true }
    );
    return result.rows && result.rows.length > 0;
  }).catch(() => {
    return false;
  });
}

async function insertDemotable(id, name) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
      [id, name],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateFoodtable(price, amount, name, brand) {
  return await withOracleDB(async (connection) => {
    console.log("app service - update food");
    console.log(price);
    console.log(amount);
    const result = await connection.execute(
      `UPDATE Food SET Price=:price, AmountInStock=:amount WHERE Name=:name AND Brand=:brand`,
      [price, amount, name, brand],
      { autoCommit: true }
    );
    console.log("result");
    return true;
    // return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateNameDemotable(oldName, newName) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
      [newName, oldName],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM DEMOTABLE");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function deleteAnimal(id) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("DELETE FROM Animal WHERE ID=:id", [id], { autoCommit: true });
    return result; // # of rows deleted
  }).catch(() => {
    return 0; 
  })
}

module.exports = {
  testOracleConnection,
  fetchDemotableFromDb,
  initiateDemotable,
  insertDemotable,
  updateNameDemotable,
  countDemotable,
  validateSignIn,
  fetchFoodtable,
  updateFoodtable,
  fetchAnimaltable,
  deleteAnimal,
};


