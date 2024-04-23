const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: async (req, res) => {
    const { user_id, username, email, phone, location, first_name, 
      last_name, full_name, bio, profile_picture } = req.body;
    const query = `
      INSERT INTO Profiles
      (user_id, username, email, phone, location, first_name, last_name, 
        full_name, profile_picture, bio, following, followers, created_at, last_login)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0, 0, NOW(), NOW())
      RETURNING *;`;

    try {
      const result = await pool.query(query, [user_id, username, email, phone, location, 
        first_name, last_name, full_name, profile_picture, bio]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};

module.exports = { ProfileController };
