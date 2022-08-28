const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')

exports.requestFeature = functions.https.onRequest((request, response) => {
  const res = {}

  try {
    if (request.method !== 'POST') {
      throw new Error('Unsupported method')
    }
    const message = `
    Email: ${request.body.email}
    Message Body:
      ${request.body.message}
    `
    //@TODO: Add user's email as reply-to

    var sendMail = async function () {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: 'chrisjwindisch@gmail.com',
        from: 'cjdevbootstrap+from@gmail.com',
        subject: 'Email-avail Feature Request',
        text: message,
      }

      const sgResult = await sgMail.send(msg)
      console.log(sgResult)
    }

    sendMail()

    res.success = true
  } catch (error) {
    res.success = false
    res.error = error
    response.status(400)
  } finally {
    response.json(res)
  }
})
