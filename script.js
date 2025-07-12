const car = document.getElementById("car");

const controls = { up:false, down:false, left:false, right:false };

// ── KEY MAP ──
//   W → forward      (up)
//   S → reverse      (down)
//   A → turn left
//   D → turn right

document.onkeydown = e => {
  switch (e.key.toLowerCase()) {
    case "w":  controls.up    = true;  break;
    case "s":  controls.down  = true;  break;
    case "a":  controls.left  = true;  break;
    case "d":  controls.right = true;  break;
  }
};

document.onkeyup = e => {
  switch (e.key.toLowerCase()) {
    case "w":  controls.up    = false; break;
    case "s":  controls.down  = false; break;
    case "a":  controls.left  = false; break;
    case "d":  controls.right = false; break;
  }
};

const update = () => {
  const pos = car.object3D.position;
  const rot = car.object3D.rotation;
  const speed = 0.1;

  if (controls.up) {
    pos.z -= Math.cos(rot.y) * speed;
    pos.x -= Math.sin(rot.y) * speed;
  }
  if (controls.down) {
    pos.z += Math.cos(rot.y) * speed;
    pos.x += Math.sin(rot.y) * speed;
  }
  if (controls.left) {
    rot.y += 0.03;
  }
  if (controls.right) {
    rot.y -= 0.03;
  }
};

// 1. Map key codes to the matching <p data-key=""> element
const keyEls = {
  w: document.querySelector('[data-key="w"]'),
  s: document.querySelector('[data-key="s"]'),
  a: document.querySelector('[data-key="a"]'),
  d: document.querySelector('[data-key="d"]')
};

// 2. Helper to toggle the .click class
function highlight(key, active) {
  const el = keyEls[key];
  if (!el) return;
  if (active) el.classList.add("click");
  else el.classList.remove("click");
}

// 3. Extend your existing handlers
document.onkeydown = e => {
  const k = e.key.toLowerCase();
  switch (k) {
    case "w": controls.up    = true;  break;
    case "s": controls.down  = true;  break;
    case "a": controls.left  = true;  break;
    case "d": controls.right = true;  break;
  }
  highlight(k, true);          // ← add glow
};

document.onkeyup = e => {
  const k = e.key.toLowerCase();
  switch (k) {
    case "w": controls.up    = false; break;
    case "s": controls.down  = false; break;
    case "a": controls.left  = false; break;
    case "d": controls.right = false; break;
  }
  highlight(k, false);         // ← remove glow
};

setInterval(update, 10);   