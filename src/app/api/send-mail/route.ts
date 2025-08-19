import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, phone, guests, attend, message } = await req.json();

  if (!name || !phone || !guests || !attend) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `${name} Xác nhận tham dự đám cưới`,
      text: `Name: ${name}\nPhone: ${phone}\nGuests: ${guests}\nAttend: ${attend}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Attend:</strong> ${attend}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}