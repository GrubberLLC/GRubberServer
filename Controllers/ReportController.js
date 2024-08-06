const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ReportController = {
  createReport: async (req, res) => {
    const { reporter_id, reported_id, subject, message, category } = req.body; 
    const query = `
      INSERT INTO Places
      (reporter_id, reported_id, subject, message, category, created_at)
      VALUES ($1, $2, $3, $4, $5,  NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [reporter_id, reported_id, subject, message, category]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getReports: async (req, res) => {
    const { id } = req.params; 
    const query = `
      SELECT * 
      FROM Reports 
      ORDER BY created_at DESC
      LIMIT 150
    `;
    
    try {
      const result = await pool.query(query, [id]);
      res.status(200).json(result.rows); // return all rows as JSON
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
}

module.exports = {ReportController}