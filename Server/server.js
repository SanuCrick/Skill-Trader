const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage with initial sample skills
let users = new Set();
let skills = [
  {
    id: '_sample1',
    name: 'Web Development',
    owner: 'John Doe'
  },
  {
    id: '_sample2',
    name: 'Graphic Design',
    owner: 'Jane Smith'
  },
  {
    id: '_sample3',
    name: 'Digital Marketing',
    owner: 'Mike Johnson'
  },
  {
    id: '_sample4',
    name: 'Data Analysis',
    owner: 'Sarah Wilson'
  },
  {
    id: '_sample5',
    name: 'Mobile App Development',
    owner: 'Alex Brown'
  },
  {
    id: '_sample6',
    name: 'UI/UX Design',
    owner: 'Emma Davis'
  },
  {
    id: '_sample7',
    name: 'Python Programming',
    owner: 'David Chen'
  },
  {
    id: '_sample8',
    name: 'Content Writing',
    owner: 'Lisa Anderson'
  },
  {
    id: '_sample9',
    name: 'Video Editing',
    owner: 'Tom Wilson'
  },
  {
    id: '_sample10',
    name: 'Social Media Management',
    owner: 'Rachel Green'
  },
  {
    id: '_sample11',
    name: 'SEO Optimization',
    owner: 'Mark Taylor'
  },
  {
    id: '_sample12',
    name: 'Cloud Computing',
    owner: 'Sophie Martinez'
  }
];
let trades = [];

// Utility function to generate IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'SkillTrader API is running' });
});

// User routes
app.post('/api/login', (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    users.add(username);
    console.log(`User logged in: ${username}`);
    res.json({ username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills routes
app.get('/api/skills', (req, res) => {
  try {
    console.log('Fetching skills:', skills);
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/skills', (req, res) => {
  try {
    const { name, owner } = req.body;
    if (!name || !owner) {
      return res.status(400).json({ error: 'Skill name and owner are required' });
    }

    // Check for duplicate skills
    const duplicate = skills.find(s => 
      s.owner === owner && s.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      return res.status(400).json({ error: 'You already offer this skill' });
    }

    const newSkill = {
      id: generateId(),
      name,
      owner
    };
    skills.push(newSkill);
    console.log('New skill added:', newSkill);
    res.status(201).json(newSkill);
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Trades routes
app.get('/api/trades', (req, res) => {
  try {
    console.log('Fetching trades:', trades);
    res.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/trades', (req, res) => {
  try {
    const { proposer, offerSkill, requestSkill } = req.body;
    if (!proposer || !offerSkill || !requestSkill) {
      return res.status(400).json({ error: 'All trade details are required' });
    }

    const newTrade = {
      id: generateId(),
      proposer,
      offerSkill,
      requestSkill,
      timestamp: new Date().toISOString()
    };
    trades.push(newTrade);
    console.log('New trade proposed:', newTrade);
    res.status(201).json(newTrade);
  } catch (error) {
    console.error('Error proposing trade:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Available routes:');
  console.log('- GET  /');
  console.log('- POST /api/login');
  console.log('- GET  /api/skills');
  console.log('- POST /api/skills');
  console.log('- GET  /api/trades');
  console.log('- POST /api/trades');
}); 