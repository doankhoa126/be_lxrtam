import express from 'express';
import {
  getAllSummary,
  addSummary,
  updateSummary,
  deleteSummary,
  getTotalWeightByDateAndGold,
  getProcessVariationByDateAndGold,
} from '../../controllers/admin/goldInventorySumController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gold  Sum Inventory
 *   description: API endpoints for managing the Gold  Sum Inventory.
 */

/**
 * @swagger
 * /gold-sum-inventory:
 *   get:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Retrieve all summaries
 *     description: Get a list of all summaries in the Gold  Sum Inventory.
 *     responses:
 *       200:
 *         description: A list of summaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error.
 */
router.get('/gold-sum-inventory', getAllSummary);

/**
 * @swagger
 * /gold-sum-inventory:
 *   post:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Add a new summary
 *     description: Add a new summary to the Gold  Sum Inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_manage:
 *                 type: string
 *                 format: date
 *               item_category:
 *                 type: string
 *               opening_inventory:
 *                 type: number
 *               gold_produced:
 *                 type: number
 *               process_variation:
 *                 type: number
 *               closing_inventory:
 *                 type: number
 *     responses:
 *       201:
 *         description: Summary created successfully.
 *       500:
 *         description: Server error.
 */
router.post('/gold-sum-inventory', addSummary);

/**
 * @swagger
 * /gold-sum-inventory/{id}:
 *   put:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Update a summary
 *     description: Update an existing summary in the Gold  Sum Inventory.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the summary to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_manage:
 *                 type: string
 *                 format: date
 *               item_category:
 *                 type: string
 *               opening_inventory:
 *                 type: number
 *               gold_produced:
 *                 type: number
 *               process_variation:
 *                 type: number
 *               closing_inventory:
 *                 type: number
 *     responses:
 *       200:
 *         description: Summary updated successfully.
 *       404:
 *         description: Summary not found.
 *       500:
 *         description: Server error.
 */
router.put('/gold-sum-inventory/:id', updateSummary);

/**
 * @swagger
 * /gold-sum-inventory/{id}:
 *   delete:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Delete a summary
 *     description: Delete a summary from the Gold  Sum Inventory.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the summary to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Summary deleted successfully.
 *       404:
 *         description: Summary not found.
 *       500:
 *         description: Server error.
 */
router.delete('/gold-sum-inventory/:id', deleteSummary);

/**
 * @swagger
 * /gold-sum-inventory/total-weight:
 *   get:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Get total weight by date and gold type
 *     description: Retrieve the total weight grouped by date and gold type.
 *     responses:
 *       200:
 *         description: Total weight data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error.
 */
router.get('/gold-sum-inventory/total-weight', getTotalWeightByDateAndGold);

/**
 * @swagger
 * /gold-sum-inventory/process-variation:
 *   get:
 *     tags:
 *       - Gold  Sum Inventory
 *     summary: Get process variation by date and gold type
 *     description: Retrieve process variation grouped by date and gold type.
 *     responses:
 *       200:
 *         description: Process variation data.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error.
 */
router.get('/gold-sum-inventory/process-variation', getProcessVariationByDateAndGold);

export default router;
