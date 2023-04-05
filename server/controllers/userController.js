const pool = require('../config/db')
const bcrypt = require('bcrypt')
const token = require("../utils/generateToken");


const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const signUp = await pool.query(
        `INSERT INTO users (email,hashed_password) VALUES($1,$2)`,
        [email, hashedPassword]
      );
      res.json({ email, token });
    } catch (err) {
      console.error(err);
      if (err) {
        res.json({ detail: err.detail });
      }
    }
}

const loginUser = async(req,res) => {
    const { email, password } = req.body;
    try {
      const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      if (!users.rows.length)
        return res.json({ detail: "User does not exist!" });

      const success = await bcrypt.compare(
        password,
        users.rows[0].hashed_password
      );
      
      if (success) {
        res.json({ email: users.rows[0].email, token });
      } else {
        res.json({ detail: "Login failed" });
      }
    } catch (err) {
      console.error(err);
    }
}

module.exports = {registerUser,loginUser}
