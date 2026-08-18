const fs = require('fs');

const width = 850;
const height = 663; // match previous card
const padding = 30;

const backgroundColor = "#ffffff";
const borderColor = "#d0d7de";
const titleColor = "#0550ae";
const textColor = "#24292f";
const textMuted = "#57606a";
const blueBadge = "#0969da";

const colors = ["#e34c26", "#f1e05a", "#3178c6", "#3572A5", "#b07219", "#41b883", "#000000", "#dd0031"];

function createSVG() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      .text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .header { font-size: 20px; font-weight: 600; fill: ${titleColor}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .subheader { font-size: 16px; font-weight: 600; fill: ${textColor}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .body { font-size: 13px; fill: ${textMuted}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .title { font-size: 14px; font-weight: 600; fill: ${blueBadge}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .box { fill: ${backgroundColor}; stroke: ${borderColor}; stroke-width: 1px; rx: 6px; ry: 6px; }
      .outerbox { fill: ${backgroundColor}; stroke: ${borderColor}; stroke-width: 1.5px; rx: 12px; ry: 12px; }
    </style>
  </defs>

  <rect class="outerbox" x="1" y="1" width="${width-2}" height="${height-2}" />

  <!-- TECH STACK -->
  <g transform="translate(${padding}, ${padding})">
    <text class="header" x="0" y="20">Tech Stack</text>
    <path d="M0,35 L${width-2*padding},35" stroke="${borderColor}" stroke-width="1" />
    
    <g transform="translate(0, 60)">
      <circle cx="10" cy="0" r="5" fill="${colors[0]}" /><text class="body" x="25" y="4">HTML5/CSS3</text>
      <circle cx="120" cy="0" r="5" fill="${colors[1]}" /><text class="body" x="135" y="4">JavaScript</text>
      <circle cx="230" cy="0" r="5" fill="${colors[2]}" /><text class="body" x="245" y="4">TypeScript</text>
      <circle cx="340" cy="0" r="5" fill="${colors[3]}" /><text class="body" x="355" y="4">Python</text>
      <circle cx="450" cy="0" r="5" fill="${colors[4]}" /><text class="body" x="465" y="4">Java</text>
      
      <circle cx="10" cy="30" r="5" fill="${colors[5]}" /><text class="body" x="25" y="34">Vue/React/Angular</text>
      <circle cx="160" cy="30" r="5" fill="${colors[6]}" /><text class="body" x="175" y="34">Node/Express/Nest</text>
      <circle cx="310" cy="30" r="5" fill="${colors[7]}" /><text class="body" x="325" y="34">PyTorch/TF/ML</text>
      <circle cx="450" cy="30" r="5" fill="#339933" /><text class="body" x="465" y="34">PostgreSQL/Mongo</text>
    </g>
  </g>

  <!-- FEATURED PROJECTS -->
  <g transform="translate(${padding}, ${170})">
    <text class="header" x="0" y="20">Featured Projects</text>
    <path d="M0,35 L${width-2*padding},35" stroke="${borderColor}" stroke-width="1" />
    
    <g transform="translate(0, 50)">
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
      <rect class="box" x="0" y="120" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="15" y="145">🧠 MAD1 Quiz Master</text>
      <text class="body" x="15" y="165">Interactive quiz platform with time-bound</text>
      <text class="body" x="15" y="180">rounds, scoring, and an interactive UI.</text>

      <!-- Project 4 -->
      <rect class="box" x="${(width-2*padding)/2 + 10}" y="120" width="${(width-2*padding)/2 - 10}" height="100" />
      <text class="title" x="${(width-2*padding)/2 + 25}" y="145">📷 QR Code Generator</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="165">Real-time QR code generator supporting</text>
      <text class="body" x="${(width-2*padding)/2 + 25}" y="180">logos and camera input.</text>
    </g>
  </g>

  <!-- CONTACT & VISITOR COUNT -->
  <g transform="translate(${padding}, ${480})">
    <text class="header" x="0" y="20">Contact Me</text>
    <path d="M0,35 L${width-2*padding},35" stroke="${borderColor}" stroke-width="1" />
    
    <g transform="translate(0, 60)">
      <text class="subheader" x="0" y="10">📧 anirudhphophalia@gmail.com</text>
      <text class="subheader" x="0" y="40">💼 linkedin.com/in/anirudh-phophalia</text>
      <text class="subheader" x="0" y="70">💬 Discord: anirudhphophalia</text>
    </g>
  </g>

  <g transform="translate(${width/2 + padding}, ${480})">
    <text class="header" x="0" y="20">Visitor Count</text>
    <path d="M0,35 L${width/2 - 2*padding},35" stroke="${borderColor}" stroke-width="1" />
    <g transform="translate(0, 60)">
      <text class="body" x="0" y="10">Currently viewing profile dynamic stats.</text>
      <text class="body" x="0" y="30">Thank you for visiting!</text>
    </g>
  </g>
  
</svg>`;

  fs.writeFileSync('extra-cards.svg', svg);
  console.log("Created extra-cards.svg");
}

createSVG();
