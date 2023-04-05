const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const getAllTodo = async (req,res) => {
    const { userEmail } = req.params;

    try {
      const todos = await pool.query(
        "SELECT * FROM todos WHERE user_email = $1",
        [userEmail]
      );
      res.json(todos.rows);
    } catch (err) {
      console.error(err);
    }
};

const postTodo = async(req,res) => {
    const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTodo = await pool.query(
      `INSERT INTO todos(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err);
  }
}

const updateTodo = async (req,res) => {
     const { id } = req.params;
     const { user_email, title, progress, date } = req.body;

     try {
       const editTodo = await pool.query(
         "UPDATE todos SET user_email = $1 ,title = $2, progress = $3, date = $4 WHERE id = $5",
         [user_email, title, progress, date, id]
       );
       res.json(editTodo);
     } catch (err) {
       console.error(err);
     }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteTodo = await pool.query("DELETE FROM todos WHERE id =$1", [
        id,
      ]);
      res.json(deleteTodo);
    } catch (err) {
      console.error(err);
    }
}


module.exports = {getAllTodo,postTodo,updateTodo,deleteTodo}