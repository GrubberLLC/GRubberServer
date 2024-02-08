const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: (req, res) => {
    const { user_id, username, email, phone, 
      location, first_name, last_name, 
      full_name, profile_picture } = req.body; 
    const query = `
      INSERT INTO Profiles 
        (user_id, username, email, phone, location, 
         first_name, last_name, full_name,
         profile_picture, following, followers, 
         created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, NOW(), NOW())`
    connection.query(query, [user_id, username, email, phone, location, first_name, 
      last_name, full_name, profile_picture], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Profile created with ID: ${results.insertId}`)
    });
  },
  getProfileById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Profiles WHERE profile_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(results)
    });
  },
  updateProfileById: (req, res) => {
    const {id} = req.params; 
    const {user_id, username, email, phone, 
      location, first_name, last_name, 
      full_name, profile_picture, public, 
      notification, following, followers} = req.body
    const query = `
    UPDATE Profiles
    SET user_id = ?, username = ?, email = ?, phone = ?, location = ?,
      first_name = ?, last_name = ?, full_name = ?, profile_picture = ?, 
      public = ?, notifications = ?, following = ?, followers = ?
    WHERE profile_id = ?
    `
    connection.query(query, [user_id, username, email, 
      phone, location, first_name, last_name, full_name, 
      profile_picture, public, notification, following, 
      followers, id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Profile successfully updated - ID: ${username} / ${id}`)
    });
  },
  deleteProfileById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Profiles WHERE profile_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          res.status(500).send(err.message);
        } 
        res.status(201).send(`Profile successfully delete`)
    });
  },
}

module.exports = {ProfileController}