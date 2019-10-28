const Mailgun = require('mailgun-js')

const { MG_API_KEY, MG_DOMAIN } = process.env

const sendRegisteredInterestEmail = async (to: string, name: string) => {
  return new Promise((resolve, reject) => {
    const mailgun = Mailgun({
      apiKey: MG_API_KEY,
      domain: MG_DOMAIN
    })
    const mail: IEmail = {
      from: 'Steve at Storyscript <steve@storyscript.io>',
      to,
      subject: 'Thank you for your interest',
      text: `Thank you ${name}!`
    }

    mailgun.messages().send(mail, (err: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

exports.handler = async (event: any) => {
  try {
    const data = JSON.parse(event.body)
    const { email, name } = data
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
