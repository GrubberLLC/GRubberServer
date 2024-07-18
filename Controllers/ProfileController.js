const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: async (req, res) => {
    const { userId, username, email, phone, location, first_name, 
      last_name, name, bio, nickname, profile_picture, public, notifications } = req.body;
    const query = `
      INSERT INTO Profiles
      (user_id, username, email, phone, location, first_name, last_name, 
        full_name, profile_picture, bio, public, nickname, notifications, following, followers)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 0, 0)
      RETURNING *;`;
    try {
      const result = await pool.query(query, [userId, username, email, phone, location, 
        first_name, last_name, name, profile_picture, bio, public, nickname, notifications]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabProfile: async (req, res) => {
    const { id } = req.params
    const query = `
      SELECT * FROM Profiles
      WHERE user_id = $1`;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  searchProfiles: async (req, res) => {
    const { term } = req.params;
    const query = `
      SELECT * FROM Profiles
      WHERE username ILIKE $1 OR full_name ILIKE $1`;
    try {
      const result = await pool.query(query, [`%${term}%`]);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  grabAllProfile: async (req, res) => {
    const query = `
      SELECT * FROM Profiles`;
    try {
      const result = await pool.query(query);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updateUserProfile: async (req, res) => {
    const { id } = req.params
    const { username, email, phone, location, first_name, 
      last_name, full_name, bio, nickname, profile_picture, public, notifications } = req.body;
    const query = `
      UPDATE Profiles
      SET username = $1, email = $2, phone = $3, location = $4, first_name = $5, 
          last_name = $6, full_name = $7, bio = $8, nickname = $9, profile_picture = $10, 
          public = $11, notifications = $12
      WHERE user_id = $13
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [username, email, phone, location, first_name, 
        last_name, full_name, bio, nickname, profile_picture, public, notifications, id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updateUserFCMToken: async (req, res) => {
    const { id } = req.params
    const { token } = req.body;
    const query = `
      UPDATE Profiles
      SET fcmtoken = $1,
      WHERE user_id = $2
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [token, id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  deleteUserProfile: async (req, res) => {
    const { id } = req.params
    const query = `
      DELETE * FROM Profiles WHERE profile_id = $1`;
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};

module.exports = { ProfileController };
