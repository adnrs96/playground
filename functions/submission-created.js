const Mailgun = require('mailgun-js')
const MailComposer = require('nodemailer/lib/mail-composer')

const { MG_API_KEY, MG_DOMAIN } = process.env

const sendRegisteredInterestEmail = async ({ email, name }) => {
  return new Promise((resolve, reject) => {
    const mailgun = Mailgun({
      apiKey: MG_API_KEY,
      domain: MG_DOMAIN
    })
    const mailOpts = {
      from: 'Storyscript <will@storyscript.io>',
      to: email,
      subject: 'GitHub Universe: Thank you for your interest',
      html: `
      <p>Hey ${name},</p>
      <br>
      <p>Thank you for stopping by our booth at GitHub universe!</p>
      <br>
      <p>We will be in touch after the event to help you continue your Story, so keep an eye out for an email from us.</p>
      <br>
      <p>In the meantime, if you would like to get a feel of how Storyscript works, we’d love for you to read <a href="https://docs.storyscript.io/storyscript/writing">this article</a>.</p>
      <br>
      <br>
      <p>Cheers,<br>
      The Storyscript Team</p>
      `
    }

    const mail = new MailComposer(mailOpts)

    mail.compile().build((err, message) => {
      const data = {
        to: email,
        message: message.toString('ascii')
      }
      if (err) {
        reject(err)
        return
      }

      mailgun.messages().sendMime(data, (err, body) => {
        if (err) {
          reject(err)
          return
        }
        resolve(body)
      })
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
