const Mailgun = require('mailgun-js')

const { MG_API_KEY, MG_DOMAIN } = process.env

const sendRegisteredInterestEmail = async ({ email, name }) => {
  return new Promise((resolve, reject) => {
    const mailgun = Mailgun({
      apiKey: MG_API_KEY,
      domain: MG_DOMAIN
    })
    const mail = {
      from: 'Storyscript <will@storyscript.io>',
      to: email,
      subject: 'GitHub Universe: Thank you for your interest',
      text: `
Hey ${name},

Thank you for stopping by our booth at GitHub universe!
We will be in touch after the event to help you continue your Story, so keep an eye out for an email from us.
In the meantime, if you would like to get a feel of how Storyscript works, we’d love for you to read this article.

Cheers,
The Storyscript Team
`
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
    await sendRegisteredInterestEmail(data.payload)

    return {
      stataudCode: 200,
      body: `Email sent to ${data.name} <${data.email}>`
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: e
    }
  }
}
