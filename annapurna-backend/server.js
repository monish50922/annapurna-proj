const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/donor", require("./routes/donorRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log("Server running on port", process.env.PORT)
  );
});