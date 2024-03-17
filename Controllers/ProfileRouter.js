const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ProfileController = {
  createProfile: (req, res) => {
    const { user_id, username, email, phone, 
      location, first_name, last_name, 
      full_name, bio,  profile_picture } = req.body; 
    const query = `
      INSERT INTO Profiles 
        (user_id, username, email, phone, location, 
         first_name, last_name, full_name,
         profile_picture, bio, following, followers, 
         created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, NOW(), NOW())`
    connection.query(query, [user_id, username, email, phone, location, first_name, 
      last_name, full_name, profile_picture, bio], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile created!`)
    });
  },
  getProfileById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Profiles WHERE user_id = ? LIMIT 1
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getProfileByUsername: (req, res) => {
    const {username} = req.params; 
    const query = `
      SELECT * FROM Profiles WHERE username = ? LIMIT 1
    `
    connection.query(query, [username], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getProfileByEmail: (req, res) => {
    const {email} = req.params; 
    const query = `
      SELECT * FROM Profiles WHERE email = ? LIMIT 1
    `
    connection.query(query, [email], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  searchProfilesByUsername: (req, res) => {
    const { search } = req.params; // Assuming the search term is passed as a query parameter
    const query = `
      SELECT * FROM Profiles WHERE username LIKE ?
    `;
    connection.query(query, [`%${search}%`], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err.message);
      }
      console.log('results: ', results)
      return res.status(200).send(results);
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
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully updated - ID: ${username} / ${id}`)
    });
  },
  updateLoginStatusById: (req, res) => {
    const {id} = req.params; 
    const {status} = req.body; 
    console.log(status)
    const query = `
    UPDATE Profiles
    SET logged_in = ?
    WHERE user_id = ?
    `
    connection.query(query, [status, id], (err, results) => {
        if(err){
          console.log(JSON.stringify(err))
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Updated LoggedIn status to ${status === 1 ? 'logged in' : 'logged out'}`)
    });
  },
  deleteProfileById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Profiles WHERE profile_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully delete`)
    });
  },
}

module.exports = {ProfileController}