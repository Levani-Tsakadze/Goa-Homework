// import express from "express";

// const tasksRouter = express.Router();

// const tasks = [
//     { id: 1, title: "Task 1", completed: false },
//     { id: 2, title: "Task 2", completed: true },
//     { id: 3, title: "Task 3", completed: false }
// ]

// // Get all tasks 
// tasksRouter.get("/", (req, res) => {
//     const { completed } = req.query;

//     if(completed === undefined) {
//         return res.json(tasks);
//     } else if(completed === "true") {
//         return res.json(tasks.filter(task => task.completed === true));
//     } else {
//         return res.json(tasks.filter(task => task.completed === false));
//     }
// });


// // Get elkement by id
// tasksRouter.get("/:id", (req, res) => {
//     const task = tasks.find(task => task.id === parseInt(req.params.id));

//     if(!task) return res.status(404).json({ message: "Task not found" });

//     return res.json(task)
// });

// // Create a new task
// tasksRouter.post("/", (req, res) => {
//     const { title } = req.body;
//     const newTask = { id: Date.now(), title, completed: false };
//     tasks.push(newTask);
//     res.json(newTask);
// });

// tasksRouter.put("/:id", (req, res) => {
//     const task = task.find(task => task.id === parseInt(req.params.id))

//     if (!task) return rest.status(404).json({ message: "Task not found"})

//     const {title, completed} = req.body
//     if(title !== undefind) task.title = title
//     if (completed !== undefined) task.completed = completed

//     res.json(task)
// })

// tasksRouter.delete("/:id", (req, res) => {
//     const taskIndex = tasks splice-it gavaketo? 
// })

// export default tasksRouter;



import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev")) 
app.use(express.json())


const data = [
    {id: 1, name: "Levani"},
    {id: 2, name: "Soso"},
    {id: 3, name: "Nika"},
    {id: 4, name: "Luka"},
    {id: 5, name: "Beka"}
]

app.get ("/data", (req, res) => {
    res.json(data)
})

app.get("/data::id", (req, res) => {
    const item = data.find(d => d.id === parseInt(req.params.id))

    if (!item) return res.status(404).json({ message: "not found" })

    res.json(item)
})

app.post("data", (req, res) => {
    const { name } = req.body;
    const newItem = { id: data.length + 1, name };
    data.push(newItem);
    res.json(newItem);
})

app.put("/data/:id", (req, res) => {
    const item = data.find(d => d.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Not found" });

    const { name } = req.body;
    if (name) item.name = name;

    res.json(item);
})

app.listen(5000, () => console.log("Server running on port 5000"));