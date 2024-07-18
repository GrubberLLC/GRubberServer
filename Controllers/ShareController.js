const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const ShareController = {
  createPlace: async (req, res) => {
    const { name, phone, price, rating, review_count, closed, address_street, address_city, 
      address_state, address_zip_code, address_formatted, yelp_url, yelp_id, 
      image, longitude, latitude } = req.body; 
    const query = `
      INSERT INTO Places
      (name, phone, price, rating, review_count, closed, address_street, address_city, address_state, 
        address_zip_code, address_formatted, yelp_url, yelp_id, image, longitude, latitude, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [name, phone, price, rating, review_count, closed, 
        address_street, address_city, address_state, address_zip_code, address_formatted, yelp_url, yelp_id, 
        image, longitude, latitude]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPlaceById: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Places WHERE place_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  getPlaceByYelpId: async (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Places WHERE yelp_id = $1
    `
    try {
      const result = await pool.query(query, [id]);
      res.status(201).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
  updatePlaceById: (req, res) => {
    const {id} = req.params; 
    const {name, phone, address_street, address_city, address_state, address_zipcode,
      address_formatted, rating, review_count, picture, price, categories, 
      yelp_id, yelp_url} = req.body
    const query = `
    UPDATE Places
    SET name = ?, phone = ?, address_street = ?, address_city = ?, address_state = ?,
    address_zipcode = ?, address_formatted = ?, rating = ?, review_count = ?, 
    picture = ?, price = ?, categories = ?, yelp_id = ?, yelp_url = ?
    WHERE place_id = ?
    `
    connection.query(query, [name, phone, address_street, address_city, address_state, address_zipcode,
      address_formatted, rating, review_count, picture, price, categories, 
      yelp_id, yelp_url, id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully updated - ID: ${id}`)
    });
  },
  deletePlaceById: (req, res) => {
    const {id} = req.params; 
    const query = `
    DELETE FROM Places WHERE place_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(`Profile successfully delete`)
    });
  },
}

module.exports = {ShareController}