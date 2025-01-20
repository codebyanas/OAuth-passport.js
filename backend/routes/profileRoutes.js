require('dotenv').config();
const express = require("express");

const router = express.Router();

router.get("/profile", (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  // User data from the session
  const user = {
    name: req.user.displayName || "Unknown User",
    email: req.user.emails ? req.user.emails[0].value : "No Email Provided",
    photo: req.user.photos ? req.user.photos[0].value : "https://i.postimg.cc/Pqw7Y271/images.jpg", // Fallback photo
  };

  // Render the HTML page
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 text-gray-800">
      <!-- Navbar -->
      <nav class="bg-blue-600 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">OAuth Dashboard</h1>
          <div>
            <a href="/logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</a>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="container mx-auto my-8">
        <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="flex items-center justify-center bg-blue-500 p-4">
            <img 
              src="${user.photo}" 
              alt="Profile Picture" 
              class="w-24 h-24 rounded-full border-4 border-white shadow-md"
            >
          </div>
          <div class="p-6">
            <h2 class="text-center text-2xl font-bold mb-2">${user.name}</h2>
            <p class="text-center text-gray-600 mb-4">${user.email}</p>
            <div class="flex justify-center">
              <a href="/logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
