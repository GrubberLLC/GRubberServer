const admin = require('../bin/utils/firebaseAdmin');

const NotificationController = {
  sendNotification: async (req, res) => {
    const { fcmtoken, title, body, imageUrl } = req.body;

    if (!fcmtoken || !title || !body) {
      return res.status(400).json({ error: 'FCM token, title, and body are required' });
    }

    try {
      const message = {
        notification: {
          title: title,
          body: body,
          imageUrl: imageUrl,
        },
        token: fcmtoken,
      };

      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);

      res.status(200).json({ message: 'Notification sent successfully', response });
    } catch (err) {
      console.error('Error sending notification:', err);
      res.status(500).json({ error: 'Failed to send notification', details: err.message });
    }
  }
}

module.exports = { NotificationController };
