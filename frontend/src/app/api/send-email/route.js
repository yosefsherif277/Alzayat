import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message, userId } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Ensure environment variables are loaded (Next.js handles this for API routes)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'yasherif92@gmail.com'; // Allow recipient to be configured

    if (!emailUser || !emailPass) {
      console.error('Email credentials (EMAIL_USER, EMAIL_PASS) are not set in environment variables.');
      return Response.json({ message: 'Server configuration error for sending email.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email provider
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: recipientEmail, // Use configured recipient
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}
Email: ${email}
Message: ${message}
User ID: ${userId || 'Not logged in'}`,
    };

    await transporter.sendMail(mailOptions);
    return Response.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    // Try to provide a more specific error message if possible
    let errorMessage = 'Failed to send message';
    if (error.code === 'EENVELOPE') { // Example: Invalid recipient or sender
         errorMessage = 'Failed to send message due to email address issue.';
    } else if (error.code === 'EAUTH') { // Example: Authentication failure
         errorMessage = 'Failed to send message due to mail server authentication issue.';
    }
    return Response.json({ message: errorMessage, error: error.message }, { status: 500 });
  }
}
