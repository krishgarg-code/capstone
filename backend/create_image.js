const fs = require('fs');
const path = require('path');

// Minimal 1x1 pixel PNG
const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

fs.writeFileSync(path.join(__dirname, 'valid_test.png'), buffer);
console.log('Created valid_test.png');
