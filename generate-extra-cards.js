const fs = require('fs');
const https = require('https');

const width = 850;
const padding = 30;

const backgroundColor = "#ffffff";
const borderColor = "#e4e2e2"; // matched from insights.svg
const titleColor = "#0550ae";
const textColor = "#24292f";
const textMuted = "#57606a";
const blueBadge = "#0969da";

const stack = [
  { name: "Python", color: "#3776AB" },
  { name: "C", color: "#00599C" },
  { name: "C++", color: "#00599C" },
  { name: "Java", color: "#ED8B00" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "R", color: "#276DC3" },
  { name: "MATLAB", color: "#FF6F00" },
  { name: "Node.js", color: "#339933" },
  { name: "Express.js", color: "#000000" },
  { name: "NestJS", color: "#E0234E" },
  { name: "Flask", color: "#000000" },
  { name: "Celery", color: "#37814A" },
  { name: "Angular", color: "#DD0031" },
  { name: "React", color: "#20232a" },
  { name: "Vue.js", color: "#4FC08D" },
  { name: "HTML5", color: "#E34F26" },
  { name: "CSS3", color: "#1572B6" },
  { name: "Bootstrap", color: "#7952B3" },
  { name: "TailwindCSS", color: "#38B2AC" },
  { name: "Swagger", color: "#85EA2D" },
  { name: "Pandas", color: "#150458" },
  { name: "NumPy", color: "#013243" },
  { name: "Matplotlib", color: "#11557C" },
  { name: "Seaborn", color: "#4B8BBE" },
  { name: "Scikit-Learn", color: "#F7931E" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "PyTorch", color: "#EE4C2C" },
  { name: "OpenCV", color: "#5C3EE8" },
  { name: "Hugging Face", color: "#FFD21E" },
  { name: "Anaconda", color: "#44A833" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "MongoDB", color: "#47A248" },
  { name: "MySQL", color: "#4479A1" },
  { name: "SQLite", color: "#003B57" },
  { name: "Redis", color: "#DC382D" },
  { name: "AWS", color: "#232F3E" },
  { name: "Docker", color: "#0db7ed" },
  { name: "Vercel", color: "#000000" },
  { name: "Cloudinary", color: "#3448C5" },
  { name: "Linux", color: "#FCC624" },
  { name: "Kali Linux", color: "#557C94" },
  { name: "Postman", color: "#FF6C37" },
  { name: "Git", color: "#F05032" },
  { name: "GitHub", color: "#181717" },
  { name: "Bitbucket", color: "#0052CC" },
  { name: "Jira", color: "#0052CC" }
];

async function fetchVisitorCount() {
    return new Promise((resolve, reject) => {
        https.get('https://komarev.com/ghpvc/?username=AnirudhPhophalia', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/>([\d,]+)<\/text>/);
                if (match) resolve(match[1]);
                else resolve('Unknown');
            });
        }).on('error', err => resolve('Unknown'));
    });
}

function createSVG(visitorCount) {
  // calculate height for tech stack
  // 6 items per row -> math.ceil(47 / 6) = 8 rows
  const itemsPerRow = 5;
  const numRows = Math.ceil(stack.length / itemsPerRow);
  const rowHeight = 25;
  const colWidth = (width - 2 * padding) / itemsPerRow;
  const stackHeight = numRows * rowHeight;
  
  const projectsY = padding + 60 + stackHeight + 40;
  const projectsHeight = 260; // enough for 2 rows of 2 projects
  const contactY = projectsY + projectsHeight + 40;
  const contactHeight = 100;
  
  const height = contactY + contactHeight + padding;

  let stackHtml = '';
  for (let i = 0; i < stack.length; i++) {
      const row = Math.floor(i / itemsPerRow);
      const col = i % itemsPerRow;
      const x = col * colWidth;
      const y = row * rowHeight;
      // We will draw a colored circle and text
      stackHtml += `<circle cx="${x + 10}" cy="${y - 4}" r="5" fill="${stack[i].color}" />`;
      stackHtml += `<text class="body" x="${x + 22}" y="${y}">${stack[i].name}</text>\n`;
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style type="text/css">
      <![CDATA[
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .text { font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
        .header { font-size: 20px; font-weight: 600; fill: ${titleColor}; font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; letter-spacing: 0.5px; }
        .subheader { font-size: 16px; font-weight: 600; fill: ${textColor}; font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; letter-spacing: 0.3px; }
        .body { font-size: 13px; fill: ${textMuted}; font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
        .title { font-size: 14px; font-weight: 600; fill: ${titleColor}; font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
        .box { fill: ${backgroundColor}; stroke: ${borderColor}; stroke-width: 1px; rx: 6px; ry: 6px; }
      ]]>
    </style>
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0550ae" />
      <stop offset="50%" style="stop-color:#1a7f37" />
      <stop offset="100%" style="stop-color:#0550ae" />
    </linearGradient>
  </defs>

  <!-- BACKGROUND RECTANGLE -->
  <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="#f6f8fa" />
  <rect x="1" y="1" width="${width-2}" height="${height-2}" rx="15" fill="none" stroke="url(#borderGradient)" stroke-width="2" />

  <!-- TECH STACK -->
  <g transform="translate(${padding}, ${padding})">
    <text class="header" x="0" y="20">Tech Stack</text>
    <g transform="translate(0, 60)">
      ${stackHtml}
    </g>
  </g>

  <!-- FEATURED PROJECTS -->
  <g transform="translate(${padding}, ${projectsY})">
    <text class="header" x="0" y="20">Featured Projects</text>
    
    <g transform="translate(0, 40)">
      <!-- Project 1 -->
      <rect class="box" x="0" y="0" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="15" y="25">⛵ USV-Segmentation</text>
      <text class="body" x="15" y="45">Semantic segmentation framework built</text>
      <text class="body" x="15" y="60">on MMSegmentation for Unmanned Surface</text>
      <text class="body" x="15" y="75">Vehicle perception.</text>

      <!-- Project 2 -->
      <rect class="box" x="${(width-2*padding)/2 + 10}" y="0" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="${(width-2*padding)/2 + 25}" y="25">🧾 InvoiceSnap</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="45">AI-powered invoice processing and</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="60">management platform for automation and</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="75">analytics.</text>

      <!-- Project 3 -->
      <rect class="box" x="0" y="115" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="15" y="140">🧠 MAD1 Quiz Master</text>
      <text class="body" x="15" y="160">Interactive quiz platform with time-bound</text>
      <text class="body" x="15" y="175">rounds, scoring, and an interactive UI.</text>

      <!-- Project 4 -->
      <rect class="box" x="${(width-2*padding)/2 + 10}" y="115" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="${(width-2*padding)/2 + 25}" y="140">📷 QR Code Generator</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="160">Real-time QR code generator supporting</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="175">logos and camera input.</text>
    </g>
  </g>

  <!-- CONTACT & VISITOR COUNT -->
  <g transform="translate(${padding}, ${contactY})">
    <text class="header" x="0" y="20">Contact Me</text>
    
    <g transform="translate(0, 50)">
      <text class="subheader" x="0" y="10">📧 anirudhphophalia@gmail.com</text>
      <text class="subheader" x="0" y="35">💼 linkedin.com/in/anirudh-phophalia</text>
      <text class="subheader" x="0" y="60">💬 Discord: anirudhphophalia</text>
    </g>
  </g>

  <g transform="translate(${width/2 + padding}, ${contactY})">
    <text class="header" x="0" y="20">Visitor Count</text>
    <g transform="translate(0, 50)">
      <rect rx="6" ry="6" x="0" y="-12" width="100" height="28" fill="${blueBadge}" />
      <text class="subheader" x="10" y="7" fill="#ffffff" font-size="13px">Profile Views</text>
      <rect rx="6" ry="6" x="100" y="-12" width="80" height="28" fill="#57606a" />
      <text class="subheader" x="110" y="7" fill="#ffffff" font-size="13px">${visitorCount}</text>
    </g>
  </g>
  
</svg>`;

  fs.writeFileSync('extra-cards.svg', svg);
  console.log("Created extra-cards.svg with " + stack.length + " stack items and visitor count " + visitorCount);
}

async function main() {
    const visitorCount = await fetchVisitorCount();
    createSVG(visitorCount);
}

main();
