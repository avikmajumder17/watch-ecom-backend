const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const watchRouter = require(`${__dirname}/routes/watchRoutes.js`);
const blogRouter = require(`${__dirname}/routes/blogRoutes.js`);
const blogTagRouter = require(`${__dirname}/routes/blogTagRoutes.js`);
const blogCategoryRouter = require(`${__dirname}/routes/blogCategoryRoutes.js`);
const userRouter = require(`${__dirname}/routes/userRoutes.js`);



if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors({
    origin: "https://watch-ecom-react.netlify.app",
    // origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());


app.use("/api/v1/watches", watchRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/blog_tags", blogTagRouter);
app.use("/api/v1/blog_categories", blogCategoryRouter);
app.use("/api/v1/users", userRouter);



module.exports = app;