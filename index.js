const fs = require('fs')
const readline = require('readline');

const parentChildMap = new Map();
const childParentMap = new Map();
const usedParentMap = new Map();

async function readLine(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    processLine(line);
  }

  console.log('parentChild', parentChildMap);
}

function addChildParentItem(child, parent) {
  if (!childParentMap.has(child)) {
    childParentMap.set(child, new Set());
  }
  childParentMap.get(child).add(parent);
}

function resolveComponents(tokens) {
  const set = new Set();
  for (const token of tokens) {
    set.add(token);
    if (parentChildMap.has(token)) {
      const x = parentChildMap.get(token);
      parentChildMap.delete(token);
      usedParentMap.set(token, x);
    }
    if (usedParentMap.has(token)) {
      const usedSet = usedParentMap.get(token);
      for (const s of usedSet) {
        set.add(s);
      }
    }
  }
  return set;
}

function processLine(line) {
  const tokens = line.split(',').filter((d) => !!d.trim());
  if (tokens.length > 0) {
    const material = tokens[0];
    tokens.splice(0, 1);
    const resolved = resolveComponents(tokens);
    if (childParentMap.has(material)) {
      const parents = childParentMap.get(material);
      for (const parent of parents) {
        const set = parentChildMap.get(parent) || usedParentMap.get(parent);
        for (const token of resolved) {
          set.add(token);
          addChildParentItem(token, parent);
        }
      }
    } else {
      for (const token of resolved) {
        addChildParentItem(token, material);
      }
      parentChildMap.set(material, resolved);
    }
  }
}

// readLine('Data-Test-BOM-2.csv');
readLine('foo.csv');
