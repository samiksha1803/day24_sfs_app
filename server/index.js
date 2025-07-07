const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12787323",
    password: "8GyJnRrRHR",
    database: "sql12787323"
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/ss", upload.single("file"), (req, res) => {
    let sql = "INSERT INTO student (rno, name, phone, file, mime, email, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let data = [
        req.body.rno,
        req.body.name,
        req.body.phone,
        req.file.buffer,
        req.file.mimetype,
        req.body.email,
        req.body.gender,
        req.body.dob
    ];
    con.query(sql, data, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });
});

app.get("/gs", (req, res) => {
    let sql = "SELECT * FROM student";
    con.query(sql, (error, result) => {
        if (error) res.send(error);
        else {
            let alldata = result.map((row) => ({
                rno: row.rno,
                name: row.name,
                phone: row.phone,
                file: row.file.toString("base64"),
                mime: row.mime,
                email: row.email,
                gender: row.gender,
                dob: row.dob
            }));
            res.send(alldata);
        }
    });
});

app.delete("/ds", (req, res) => {
    let data = [req.body.rno];
    let sql = "DELETE FROM student WHERE rno=?";
    con.query(sql, data, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });
});

#app.listen(9000, () => { console.log("Ready at 9000"); });
