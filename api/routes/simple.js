// routes/sample.js
/**
 * @swagger
 * /checkmember:
 *   get:
 *     summary: Member GET.
 *     description: Check Member existing.
 *     responses:
 *       200:
 *         description: A list.          
 * /checkbook:
 *   get:
 *     summary: BOOKS GET.
 *     description: Check BOOKS .
 *     responses:
 *       200:
 *         description: A list.   
 * /borrows:
 *   post:
 *     summary: BORROWS THE BOOKS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               code_book:
 *                 type: string
 *                 description: code books.
 *                 example: JK-45
 *               code_member:
 *                 type: string
 *                 description: code member.
 *                 example: M001
 *     responses:
 *       201:
 *         description: Created
 * /return:
 *   post:
 *     summary: RETURN THE BOOKS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               code_book:
 *                 type: string
 *                 description: code books.
 *                 example: JK-45
 *               code_member:
 *                 type: string
 *                 description: code member.
 *                 example: M001
 *     responses:
 *       201:
 *         description: Created
 *         
*/     


const express = require('express');
const router = express.Router();

module.exports = router;