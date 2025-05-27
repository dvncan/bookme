// import emailjs from "@emailjs/browser";

// // Initialize EmailJS
// emailjs.init("YOUR_PUBLIC_KEY   ");

// // Example email data
// const templateParams = {
//   to_name: "Albert Doe",
//   from_name: "John Doe",
//   message: "Hello, this is a test email from TypeScript!",
// };

// // Function to send email
// const sendEmail = async () => {
//   try {
//     const response = await emailjs.send(
//       ":6cac47116cddbf",
//       "66830fd3ff08e1800734a50cc698c66a",
//       templateParams
//     );

//     console.log("✅ Email sent successfully!", response);
//   } catch (error) {
//     console.error("❌ Failed to send email:", error);
//   }
// };

// // Run the function
// sendEmail();

// Looking to send emails in production? Check out our Email API/SMTP product!
// import { MailtrapClient } from "mailtrap";

// const TOKEN = "66830fd3ff08e1800734a50cc698c66a";

// const client = new MailtrapClient({
//   token: TOKEN,
//   testInboxId: 3727253,
// });

// const sender = {
//   email: "dundalbrown@gmail.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "duncan@source.network",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
