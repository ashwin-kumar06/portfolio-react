import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get visitor's IP address
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Get current date and time
    const timestamp = new Date().toISOString();
    
    // Create visitor data object
    const visitorData = {
      ip,
      timestamp,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || 'Direct',
    };

    // Path to your JSON file
    const dataFile = path.join(process.cwd(), 'data', 'visitors.json');
    
    // Read existing data
    let visitors = [];
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf8');
      visitors = JSON.parse(fileContent);
    }

    // Add new visitor data
    visitors.push(visitorData);

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write updated data back to file
    fs.writeFileSync(dataFile, JSON.stringify(visitors, null, 2));

    res.status(200).json({ message: 'Visitor tracked successfully' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Error tracking visitor' });
  }
}