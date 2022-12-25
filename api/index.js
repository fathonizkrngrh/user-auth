require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiNotFoundResponse,
} = require("./utils/apiResponse.utils");
const routes = require("./routes/index.route");

const app = express();
const port = process.env.PORT || 7000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.get("/", (req, res) =>
  res
    .status(status.OK)
    .json(apiResponse(status.OK, "OK", "Welcome to Angkasa API Application."))
);

// catch 404 and forward to error handler
app.use((req, res) =>
  res
    .status(status.NOT_FOUND)
    .json(apiNotFoundResponse("The requested resource could not be found"))
);

// error handler
app.use((err, req, res, next) =>
  res
    .status(status.INTERNAL_SERVER_ERROR)
    .json(
      apiResponse(
        status.INTERNAL_SERVER_ERROR,
        "INTERNAL_SERVER_ERROR",
        err.message
      )
    )
);

app.listen(port, () => {
  console.info(`======= Server is running on port ${port}. =======`);
});

module.exports = app;
