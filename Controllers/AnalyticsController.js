const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary


const AnalyticsController = {
  getUserCount: async (req, res) => {
    const { startDate, endDate } = req.query;

    console.log('start date: ', startDate)
    console.log('end date: ', endDate)
    
    const totalQuery = `
      SELECT COUNT(*) as total
      FROM profiles 
      WHERE created_at >= $1 AND created_at <= $2
    `;
  
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_signups
      FROM 
        profiles
      WHERE 
        created_at >= $1 AND created_at <= $2
      GROUP BY 
        DATE(created_at)
      ORDER BY 
        date ASC
    `;
  
    try {
      const totalResult = await pool.query(totalQuery, [startDate, endDate]);
      const dailyResult = await pool.query(dailyQuery, [startDate, endDate]);
  
      const totalSignups = parseInt(totalResult.rows[0].total);
      const dailySignups = dailyResult.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new_signups: parseInt(row.new_signups)
      }));
  
      res.status(200).json({
        totalSignups,
        dailySignups
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPostCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    let query = 'SELECT COUNT(*) FROM posts WHERE created_at >= $1 AND created_at <= $2';
    let params = [startDate, endDate];
  
    try {
      const result = await pool.query(query, params);
      res.status(200).json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getLikeCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    let query = 'SELECT COUNT(*) FROM likes WHERE created_at >= $1 AND created_at <= $2';
    let params = [startDate, endDate];

    try {
      const result = await pool.query(query, params);
      res.status(200).json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getCommentCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    let query = 'SELECT COUNT(*) FROM comments WHERE created_at >= $1 AND created_at <= $2';
    let params = [startDate, endDate];

    try {
      const result = await pool.query(query, params);
      res.status(200).json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getListCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    let query = 'SELECT COUNT(*) FROM lists WHERE created_at >= $1 AND created_at <= $2';
    let params = [startDate, endDate];

    try {
      const result = await pool.query(query, params);
      res.status(200).json({ count: parseInt(result.rows[0].count) });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getTopUsers: async (req, res) => {
    const query = `
      SELECT pr.user_id, pr.username, 
             COUNT(DISTINCT l.like_id) as like_count, 
             COUNT(DISTINCT c.comment_id) as comment_count,
             COUNT(DISTINCT l.like_id) + COUNT(DISTINCT c.comment_id) as total_interactions
      FROM profiles pr
      LEFT JOIN posts p ON pr.user_id = p.user_id
      LEFT JOIN likes l ON p.post_id = l.post_id
      LEFT JOIN comments c ON p.post_id = c.post_id
      GROUP BY pr.user_id, pr.username
      ORDER BY total_interactions DESC
      LIMIT 250
    `;
  
    try {
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getNewUserSignups: async (req, res) => {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Both startDate and endDate are required' });
    }
  
    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_signups
      FROM 
        profiles
      WHERE 
        created_at >= $1 AND created_at <= $2
      GROUP BY 
        DATE(created_at)
      ORDER BY 
        date ASC
    `;
  
    try {
      const result = await pool.query(query, [startDate, endDate]);
      
      // Calculate total signups
      const totalSignups = result.rows.reduce((sum, row) => sum + parseInt(row.new_signups), 0);
  
      res.status(200).json({
        totalSignups,
        dailySignups: result.rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
}

module.exports = {AnalyticsController}