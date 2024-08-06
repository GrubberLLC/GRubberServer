const pool = require('../bin/utils/AwsDbConnect'); // Adjust the path as necessary
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USERNAME, // Replace with your email
    pass: process.env.GMAIL_PASSWORD,
  },
});

const ReportController = {
  createReport: async (req, res) => {
    const { reporter_id, reporter_email, reported_id, subject, message, category } = req.body; 
    const query = `
      INSERT INTO Reports
      (reporter_id, reported_id, subject, message, category, created_at)
      VALUES ($1, $2, $3, $4, $5,  NOW())
      RETURNING *;`;
    try {
      const result = await pool.query(query, [reporter_id, reported_id, subject, message, category]);

      const mailOptions = {
        from: 'contact@grubber.io', // sender address
        to: 'report@grubber.io', // list of receivers
        cc: reporter_email, // optional CC
        subject: subject,
        text: message, // plain text body
        html: `<p>${message.replace(/\n/g, '<br>')}</p>` // HTML body
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
      });

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