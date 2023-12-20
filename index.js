const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./connection.js");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Index");
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM user", (error, result) => {
    if (error) throw error;
    response(200, result, "data berhasil ditemukan", res);
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM user WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    response(200, result, "data per-user", res);
  });
});

app.post("/user", (req, res) => {
  const { username, password, hak } = req.body;
  const sql = `INSERT INTO user (username, password, hak) VALUES ('${username}', '${password}', '${hak}')`;

  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "Failed", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "Success Registered", res);
    }
  });
});

app.put("/user", (req, res) => {
  const { id, username, password } = req.body;
  const sql = `UPDATE user SET username = '${username}', password = '${password}' WHERE id = '${id}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "error", "Data Failed Updated", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        summary: result.message,
      };
      response(200, data, "Updated Data success", res);
    } else {
      response(500, "error", "Data Failed Updated", res);
    }
  });
});

app.delete("/user", (req, res) => {
  const id = req.body.id;
  const sql = `DELETE FROM user WHERE id = ${id}`;
  db.query(sql, (error, status) => {
    console.log(status);
    if (error) response(400, "error", "Deleted Data Failed");
    if (status.affectedRows) {
      const data = { isSuccess: status.affectedRows };
      response(200, status.affectedRows, "Data Success Deleted", res);
    } else {
      response(404, "Invalid", "Data Tidak Ditemukan", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
