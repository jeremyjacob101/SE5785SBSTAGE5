window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("deals-container");
  dealsData.forEach((d) => {
    const card = document.createElement("div");
    card.className = "merch-card";
    card.innerHTML = `
        <div class="percent-off">-${d.percent}%</div>
        <div class="item-name">${d.item}</div>
        <div class="original-price">$${d.original.toFixed(2)}</div>
        <div class="deal-price">$${d.deal.toFixed(2)}</div>
      `;
    container.appendChild(card);
  });
});

// ─────────────────────────────────────────────────
// Inline deals data (no fetch, so it works via file://)
// ─────────────────────────────────────────────────
const dealsData = [
  { item: "Team Jersey", original: 49.99, deal: 39.99, percent: 20 },
  { item: "Baseball Cap", original: 24.99, deal: 19.99, percent: 20 },
  { item: "Team Hoodie", original: 69.99, deal: 54.99, percent: 21 },
  { item: "Coffee Mug", original: 12.99, deal: 9.99, percent: 23 },
  { item: "Poster", original: 9.99, deal: 7.99, percent: 20 },
  { item: "Snapback Hat", original: 29.99, deal: 22.49, percent: 25 },
  { item: "Scarf", original: 19.99, deal: 14.99, percent: 25 },
  { item: "Water Bottle", original: 14.99, deal: 11.24, percent: 25 },
  { item: "Phone Case", original: 17.99, deal: 13.49, percent: 25 },
  { item: "Backpack", original: 59.99, deal: 44.99, percent: 25 },
  { item: "Keychain", original: 5.99, deal: 4.49, percent: 25 },
  { item: "Wristband", original: 7.99, deal: 5.99, percent: 25 },
  { item: "Sticker Pack", original: 4.99, deal: 3.74, percent: 25 },
  { item: "Beanie", original: 24.99, deal: 18.74, percent: 25 },
  { item: "Team Socks", original: 12.99, deal: 9.74, percent: 25 },
];
