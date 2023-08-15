const express = require('express');
const router = express.Router();

// Landing page route
router.get('/Landing', (req, res) => {
  // You can render an HTML file for the landing page or send a JSON response
  const landingPageContent = `
    <div>
      <h1>Welcome to BattleBoat</h1>
      <div>
        <a href="/Login">Login</a>
        <a href="/Signup">Sign Up</a>
      </div>
    </div>
  `;

  // Send the landing page content as an HTML response
  res.send(landingPageContent);
});

module.exports = router;
