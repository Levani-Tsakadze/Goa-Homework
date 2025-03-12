const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
