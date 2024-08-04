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
    
    const totalQuery = `
      SELECT COUNT(*) as total
      FROM posts 
      WHERE created_at >= $1 AND created_at <= $2
    `;
  
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_posts
      FROM 
        posts
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
  
      const totalPosts = parseInt(totalResult.rows[0].total);
      const dailyPosts = dailyResult.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new_posts: parseInt(row.new_posts)
      }));
  
      res.status(200).json({
        totalPosts,
        dailyPosts
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getLikeCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    
    const totalQuery = `
      SELECT COUNT(*) as total
      FROM likes 
      WHERE created_at >= $1 AND created_at <= $2
    `;
  
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_likes
      FROM 
        likes
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
  
      const totalLikes = parseInt(totalResult.rows[0].total);
      const dailyLikes = dailyResult.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new_likes: parseInt(row.new_likes)
      }));
  
      res.status(200).json({
        totalLikes,
        dailyLikes
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getCommentCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    
    const totalQuery = `
      SELECT COUNT(*) as total
      FROM comments 
      WHERE created_at >= $1 AND created_at <= $2
    `;
  
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_comments
      FROM 
        comments
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
  
      const totalComments = parseInt(totalResult.rows[0].total);
      const dailyComments = dailyResult.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new_comments: parseInt(row.new_comments)
      }));
  
      res.status(200).json({
        totalComments,
        dailyComments
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getListCount: async (req, res) => {
    const { startDate, endDate } = req.query;
    
    const totalQuery = `
      SELECT COUNT(*) as total
      FROM lists 
      WHERE created_at >= $1 AND created_at <= $2
    `;
  
    const dailyQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as new_lists
      FROM 
        lists
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
  
      const totalLists = parseInt(totalResult.rows[0].total);
      const dailyLists = dailyResult.rows.map(row => ({
        date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        new_lists: parseInt(row.new_lists)
      }));
  
      res.status(200).json({
        totalLists,
        dailyLists
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getTopUsers: async (req, res) => {
    const query = `
      SELECT pr.user_id, pr.username, pr.profile_picture
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
  getActivitySummary: async (req, res) => {
    const { startDate, endDate } = req.query;
    
    const query = `
      WITH daily_activity AS (
        SELECT 
          DATE(created_at) as date,
          'post' as activity_type,
          COUNT(*) as count
        FROM 
          posts
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
        
        UNION ALL
        
        SELECT 
          DATE(created_at) as date,
          'like' as activity_type,
          COUNT(*) as count
        FROM 
          likes
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
        
        UNION ALL
        
        SELECT 
          DATE(created_at) as date,
          'list' as activity_type,
          COUNT(*) as count
        FROM 
          lists
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
        
        UNION ALL
        
        SELECT 
          DATE(created_at) as date,
          'favorite' as activity_type,
          COUNT(*) as count
        FROM 
          favorites
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
        
        UNION ALL
        
        SELECT 
          DATE(created_at) as date,
          'place_added_to_list' as activity_type,
          COUNT(*) as count
        FROM 
          placeinlist
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
  
        UNION ALL
        
        SELECT 
          DATE(created_at) as date,
          'comment' as activity_type,
          COUNT(*) as count
        FROM 
          comments
        WHERE 
          created_at >= $1 AND created_at <= $2
        GROUP BY 
          DATE(created_at)
      )
      SELECT 
        date,
        SUM(CASE WHEN activity_type = 'post' THEN count ELSE 0 END) as new_posts,
        SUM(CASE WHEN activity_type = 'like' THEN count ELSE 0 END) as new_likes,
        SUM(CASE WHEN activity_type = 'list' THEN count ELSE 0 END) as new_lists,
        SUM(CASE WHEN activity_type = 'favorite' THEN count ELSE 0 END) as new_favorites,
        SUM(CASE WHEN activity_type = 'place_added_to_list' THEN count ELSE 0 END) as new_places_in_lists,
        SUM(CASE WHEN activity_type = 'comment' THEN count ELSE 0 END) as new_comments,
        SUM(count) as total_activity
      FROM 
        daily_activity
      GROUP BY 
        date
      ORDER BY 
        date ASC
    `;
  
    try {
      const result = await pool.query(query, [startDate, endDate]);
  
      const dailyActivity = result.rows.map(row => ({
        date: row.date.toISOString().split('T')[0],
        new_posts: parseInt(row.new_posts),
        new_likes: parseInt(row.new_likes),
        new_lists: parseInt(row.new_lists),
        new_favorites: parseInt(row.new_favorites),
        new_places_in_lists: parseInt(row.new_places_in_lists),
        new_comments: parseInt(row.new_comments),
        total_activity: parseInt(row.total_activity)
      }));
  
      const totalActivity = dailyActivity.reduce((acc, day) => ({
        new_posts: acc.new_posts + day.new_posts,
        new_likes: acc.new_likes + day.new_likes,
        new_lists: acc.new_lists + day.new_lists,
        new_favorites: acc.new_favorites + day.new_favorites,
        new_places_in_lists: acc.new_places_in_lists + day.new_places_in_lists,
        new_comments: acc.new_comments + day.new_comments,
        total_activity: acc.total_activity + day.total_activity
      }), {
        new_posts: 0,
        new_likes: 0,
        new_lists: 0,
        new_favorites: 0,
        new_places_in_lists: 0,
        new_comments: 0,
        total_activity: 0
      });
  
      res.status(200).json({
        totalActivity,
        dailyActivity
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
}

module.exports = {AnalyticsController}