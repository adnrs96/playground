const Mailgun = require('mailgun-js')

const { MG_API_KEY, MG_DOMAIN } = process.env

const sendRegisteredInterestEmail = async (email, name) => {
  return new Promise((resolve, reject) => {
    const mailgun = Mailgun({
      apiKey: MG_API_KEY,
      domain: MG_DOMAIN
    })
    const mail = {
      from: 'Steve at Storyscript <steve@storyscript.io>',
      to: email,
      subject: 'Thank you for your interest',
      text: `Thank you for your interest ${name}!`
    }

    mailgun.messages().send(mail, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body)
    console.log(data)
    const { email, name } = data
    console.log(email, name)
    await sendRegisteredInterestEmail(email, name)

    return {
      stataudCode: 200,
      body: `Email sent to ${name} <${email}>`
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: e
    }
  }
}
