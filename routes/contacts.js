const router = require("express").Router();
const { ObjectId } = require("mongodb");

const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactsController");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contacts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65abc1234567890abcdef123
 *         firstName:
 *           type: string
 *           example: Elora
 *         lastName:
 *           type: string
 *           example: Mathias
 *         email:
 *           type: string
 *           example: elora@example.com
 *         favoriteColor:
 *           type: string
 *           example: Green
 *         birthday:
 *           type: string
 *           example: 1999-12-31
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Server error
 */
router.get("/", getAllContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res, next) => {
  // quick ID validation so Swagger tests don't crash your server
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }
  return getContactById(req, res, next);
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created (returns new contact id)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 65abc1234567890abcdef123
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact (replace all fields)
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid ID or missing required fields
 *       500:
 *         description: Server error
 */
router.put("/:id", (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }
  return updateContact(req, res, next);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the contact
 *     responses:
 *       200:
 *         description: Contact deleted
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Server error
 */
router.delete("/:id", (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }
  return deleteContact(req, res, next);
});

module.exports = router;
