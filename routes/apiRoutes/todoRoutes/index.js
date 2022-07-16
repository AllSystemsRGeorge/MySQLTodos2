const router = require('express').Router();
const connection = require('./../../../db/connection');

const isEven = function(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            resolve ('isEven');
        } else {
            reject('isOdd');
        }
    });
};

router.get('/', async (req, res) => {

    try {
        const getAllTodos = 'SELECT * FROM todos;';
        // await is ONLY good inside of a function
        // it has to have the word 'async' before using await
        // 'await' will automatically call the '.then'
        // You can only await promises 
        const [ todos ] = await connection.query(getAllTodos);

        res.json(todos);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
    // run as much code as much as we can inside of the try block
    // if any of it throws an error, immediately go into the catch block
    // with the specific error that happened and exit out of the try block
});

router.post('/', async (req, res) => {
    const { todo } = req.body;

    if (todo.trim().length === 0) {
        return res.status(400).json({ error: 'Todo must be valid'});
    }

    const insertTodoQuery = 'INSERT INTO todos (todo) VALUES(?);';
    const getTodoById = 'SELECT * FORM todos WHERE id = ?;';

    try {
        const [ queryResult ] = await connection.query(insertTodoQuery, [todo]);
        const [ todos ] = await connection.query(getTodoById, [queryResult.insertId]);
        res.json(todos[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:todoId', async (req, res) => {
    const { todoId } = req.params;

    const getTodoById = 'SELECT * FORM todos WHERE id = ?;';
    const deleteTodoById = 'DELETE FROM todos WHERE = ?;';

    try {
        const [ todos ] = await connection.query(getTodoById, [queryResult.insertId]);

        if(todos.length === 0) {
            return res.status(404).json({error: 'Todo not found with that id'});
        }
        await connection.query(deleteTodoById, todoId);
        res.json(todo[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.patch('/:todoId', async (res, req) => {
    const { todo } =req.body;
    const { todoId } = req.params;

    if (todo.trim().length === 0) {
        return res.status(400).json({ error: 'Todo must be provided!'})
    }
    
    
    const getTodoById = 'SELECT * FORM todos WHERE id = ?;';
    const updateTodoById = 'UPDATE todos SET todo = ? WHERE id = ?;';

    try {
        
        await connection.query(updateTodoById, [todo, todoId]);
        const [ todos ] = await connection.query(getTodoById, [queryResult.insertId]);
        res.json(todos[0]);
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;