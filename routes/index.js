var express = require('express');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Healthy
 *   description: Healthy api
 * /:
 *   get:
 *     summary: It is healthy
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                response:
 *                  type: string
 *                  description: Healthy description
 *              example:
 *                response: "bienvenidos"
 *       500:
 *         description: Some server error
 *
 */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).send({ response: 'bienvenidos' });
});

module.exports = router;
