let weekSelect;
let displayFrame;
let settlements = [];

function setup() {
  // 建立全螢幕畫布作為展覽背景區
  createCanvas(windowWidth, windowHeight);
  
  // 1. 建立標題文字
  let title = createElement('h1', '時光記憶圖譜：水底生態展覽');
  title.position(30, 15);
  title.style('color', '#e0f7fa');
  title.style('font-family', '微軟正黑體, sans-serif');
  title.style('text-shadow', '2px 2px 4px rgba(0,0,0,0.5)');

  // 2. 建立週次選擇選單 (Menu)
  weekSelect = createSelect();
  weekSelect.position(30, 90);
  weekSelect.style('padding', '8px 15px');
  weekSelect.style('border-radius', '20px');
  weekSelect.style('background', 'rgba(255,255,255,0.8)');
  weekSelect.style('cursor', 'pointer');
  
  // 設定選項：每一週的作品視為一個水底的「生態聚落」
  weekSelect.option('-- 選擇週次作品 --', '');
  weekSelect.option('第一週', '060310/index.html'); // 已更新為 0613 資料夾路徑
  weekSelect.option('第二週', '060317/index.html'); // 確保這裡的路徑與實際資料夾名稱一致
   weekSelect.option('第三週', '0324/index.html'); // 確保這裡的路徑與實際資料夾名稱一致
  weekSelect.changed(onWeekChange);

  // 3. 建立 iframe 顯示區域
  displayFrame = createElement('iframe');
  updateElementLayout();
  displayFrame.style('border', 'none');
  displayFrame.style('background', '#fff');
  displayFrame.style('box-shadow', '0 10px 30px rgba(0,0,0,0.5)');
  displayFrame.style('border-radius', '15px');
  displayFrame.attribute('src', ''); 

  // 4. 初始化「生態聚落」背景物件 (海草)
  for (let i = 0; i < 12; i++) {
    settlements.push(new SeaweedSettlement(random(width * 0.25), height, random(100, 300)));
  }
}

function onWeekChange() {
  let url = weekSelect.value();
  if (url !== '') {
    displayFrame.attribute('src', url);
  }
}

function updateElementLayout() {
  // 將 iframe 放置於畫面右側約 65% 的空間，左側保留給選單與動態海草背景
  displayFrame.position(width * 0.3, 100);
  displayFrame.size(width * 0.65, height - 150);
}

function draw() {
  // 繪製水底深處的漸層背景
  let c1 = color(10, 45, 80); // 淺處深藍
  let c2 = color(5, 20, 35);  // 深處暗藍
  for (let y = 0; y <= height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // 繪製代表「記憶聚落」的海草
  for (let s of settlements) {
    s.update();
    s.show();
  }

  // 隨機產生上升的裝飾氣泡
  if (frameCount % 40 === 0) {
    noStroke();
    fill(255, 255, 255, 30);
    circle(random(width * 0.28), height + 10, random(5, 15));
  }
}

class SeaweedSettlement {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.noiseOffset = random(1000);
    this.clr = color(random(50, 100), random(180, 255), random(100, 150), 150);
  }
  update() {
    this.sway = map(noise(this.noiseOffset + frameCount * 0.01), 0, 1, -25, 25);
  }
  show() {
    stroke(this.clr);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x + this.sway, this.y - this.h * 0.4, this.x - this.sway, this.y - this.h * 0.7, this.x, this.y - this.h);
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateElementLayout();
}
