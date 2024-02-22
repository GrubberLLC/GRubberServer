const connection = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary

const PlaceController = {
  createPlace: (req, res) => {
    const { name, phone, address_street, address_city, address_state, address_zipcode,
            address_formatted, rating, review_count, picture, price, categories, 
            yelp_id, yelp_url } = req.body; 
    const query = `
      INSERT INTO Places 
        (name, phone, address_street, address_city, address_state, address_zipcode,
          address_formatted, rating, review_count, picture, price, categories, 
          yelp_id, yelp_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
    connection.query(query, [name, phone, address_street, address_city, 
      address_state, address_zipcode, address_formatted, rating,
      review_count, picture, price, categories, yelp_id, yelp_url], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        console.log(JSON.stringify(results))
        return res.status(201).send({id: results.insertId})
    });
  },
  getPlaceById: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Places WHERE place_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
  },
  getPlaceByYelpId: (req, res) => {
    const {id} = req.params; 
    const query = `
      SELECT * FROM Places WHERE yelp_id = ?
    `
    connection.query(query, [id], (err, results) => {
        if(err){
          console.log(err)
          return res.status(500).send(err.message);
        } 
        return res.status(201).send(results)
    });
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

module.exports = {PlaceController}