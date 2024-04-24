const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: async (req, res) => {
    const { userId, username, email, phone, location, first_name, 
      last_name, name, bio, profile_picture } = req.body;
    const data = {
      userId,
      username, 
      email,
      phone, 
      location, 
      first_name,
      last_name,
      name,
      bio,
      profile_picture
    }
    console.log(data)
    const query = `
      INSERT INTO Profiles
      (userId, username, email, phone, location, first_name, last_name, 
        full_name, profile_picture, bio, following, followers)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0, 0)
      RETURNING *;`;

    try {
      const result = await pool.query(query, [userId, username, email, phone, location, 
        first_name, last_name, name, profile_picture, bio]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
};

module.exports = { ProfileController };
