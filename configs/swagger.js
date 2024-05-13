const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Fichador nodejs",
        version: "0.1.0",
        description:
          "This is a simple fichador with nodejs and mongodb",
        contact: {
          name: "Santiago Lopez",
          url: "https://github.com/santiagolo90",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  }
module.exports = swaggerJsdoc(swaggerOptions);