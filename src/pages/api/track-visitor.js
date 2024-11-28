import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const timestamp = new Date().toISOString();
    
    const visitorData = {
      ip,
      timestamp,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || 'Direct',
    };

    const dataFile = path.join(process.cwd(), 'data', 'visitors.json');
    
    let visitors = [];
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf8');
      visitors = JSON.parse(fileContent);
    }

    visitors.push(visitorData);

    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(dataFile, JSON.stringify(visitors, null, 2));

    res.status(200).json({ message: 'Visitor tracked successfully' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Error tracking visitor' });
  }
}