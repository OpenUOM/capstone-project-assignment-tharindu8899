const sqlite3 = require('sqlite3').verbose();

let _DBConnection;

const connectDatabase = async () => {
  try {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend") {
      return new sqlite3.Database(":memory:", sqlite3.OPEN_READWRITE);
  } else {
    return new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE);
  }

  } catch (error) {
    //Handle database connection error
    console.error("Database connection error: " + error.message);
  }

  
};

const getDbConnection = async () => {
  try {
    if (!_DBConnection) {
    _DBConnection = await connectDatabase();
  }
  return _DBConnection;
  }catch (error) {
    //Handle error when getting a database connection
    console.error("error while getting database connection: " + error.message);
    throw error;
  }
  
};

const closeConnection = conn => {
  if (conn) {
    try {
      conn.close((error) => {
        if (error) {
          console.error("Error while closing database connection: " + error.message);
        }
      });
    }catch (error) {
      console.error("Error while closing database connection: " + error.message);
    }
    //return conn.close();
  }
};

module.exports = {
  getDbConnection,
  closeConnection
};