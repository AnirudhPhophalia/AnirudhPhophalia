const fs = require('fs');

let svg = fs.readFileSync('test_insights.svg', 'utf8');

// The safest way is to just hide the group containing "Joined GitHub".
// We can use a regex to match: <g ...> ... Joined GitHub ... </g>
// But instead of matching across tags, let's just insert `display="none"` into the text tag.
// And for the icon next to it, maybe we can hide that too.

const joinedIdx = svg.indexOf('Joined GitHub');
if (joinedIdx !== -1) {
    // find the `<text` tag that contains this
    const textTagIdx = svg.lastIndexOf('<text', joinedIdx);
    
    // We can inject `display="none"` into this text tag.
    svg = svg.slice(0, textTagIdx) + '<text display="none"' + svg.slice(textTagIdx + 5);
    
    // To hide the icon, we can find the <g> right before it
    const gBefore = svg.lastIndexOf('<g', textTagIdx);
    if (gBefore !== -1) {
         svg = svg.slice(0, gBefore) + '<g display="none"' + svg.slice(gBefore + 2);
    }
}

fs.writeFileSync('test_insights_hidden.svg', svg);
