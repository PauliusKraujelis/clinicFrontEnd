const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins for demonstration purposes (you might want to restrict this in production)
app.use(cors());

// Other middleware and routes...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

