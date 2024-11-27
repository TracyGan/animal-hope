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

async function fetchFoodtable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM Food`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchFeaturesFeed(selection, table) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT DISTINCT ${selection} FROM ${table}`
    );
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchFeedtable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM Feed`);
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

async function fetchDonationtable(selection, order, condition) {
  return await withOracleDB(async (connection) => {
    let query = `SELECT * FROM Donation JOIN Client ON Client.ID=Donation.Client_ID ORDER BY ${selection} ${order}`;

    if (condition == "Foster") {
      console.log("in foster");
      query = `SELECT * FROM Donation 
      JOIN Client ON Client.ID=Donation.Client_ID 
      WHERE Client.AdopterPersonCertificationID IS NULL 
        AND Client.FosterPersonCertificationID IS NOT NULL
      ORDER BY ${selection} ${order}`;
    } else if (condition == "Adopter") {
      query = `SELECT * FROM Donation 
      JOIN Client ON Client.ID=Donation.Client_ID 
      WHERE Client.FosterPersonCertificationID IS NULL 
        AND Client.AdopterPersonCertificationID IS NOT NULL 
      ORDER BY ${selection} ${order}`;
    }
    const result = await connection.execute(query);

    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function nestedAgg() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
      SELECT Client.ID, Client.Name, Client.EmailAddress, SUM(D.Amount), Client.FosterPersonCertificationID, Client.AdopterPersonCertificationID
      FROM Donation D
      JOIN Client ON Client.ID = D.Client_ID
      GROUP BY Client.ID, Client.Name, Client.EmailAddress, Client.FosterPersonCertificationID, Client.AdopterPersonCertificationID
      HAVING SUM(D.Amount) > (SELECT AVG(d1.amount) FROM Donation d1)
    `);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function updateFeedtable(id, feature, value) {
  return await withOracleDB(async (connection) => {
    let query = `UPDATE Feed SET ${feature} =: value WHERE ID =: id`;

    if (feature == "DateTime") {
      query = `UPDATE Feed SET ${feature} = TO_TIMESTAMP(:value, 'yyyy-MM-dd HH24:MI:SS') WHERE ID = :id`;
    }

    const result = await connection.execute(
      query,
      { value: value, id: id },
      { autoCommit: true }
    );

    console.log(result);

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function updateFoodtable(price, amount, name, brand) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `UPDATE Food SET Price=:price, AmountInStock=:amount WHERE Name=:name AND Brand=:brand`,
      [price, amount, name, brand],
      { autoCommit: true }
    );
    // return true;
    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function calculateAverageDonation() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT AVG(Amount) FROM Donation`);
    console.log(result.rows[0]);
    return result.rows[0];
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
  fetchDonationtable,
  fetchFeedtable,
  updateFeedtable,
  fetchFeaturesFeed,
  calculateAverageDonation,
  nestedAgg,
};
