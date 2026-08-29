/**
 * Custom order estimate calculator. Fully client-side, no backend — reads
 * price/lead-time data straight off the <option> elements (data-base,
 * data-weeks, data-mult, data-fee) so updating prices means editing the
 * HTML, not this script.
 *
 * Like the checkout flow on the ecommerce examples, this is explicitly a
 * planning estimate, not a binding quote — see the disclaimer in the UI.
 */
(function () {
  "use strict";

  function formatMoney(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function selected(select) {
    return select.options[select.selectedIndex];
  }

  function recalc() {
    var itemType = document.getElementById("item-type");
    var material = document.getElementById("material");
    var engraving = document.getElementById("engraving");
    var quantityEl = document.getElementById("quantity");

    var base = Number(selected(itemType).dataset.base);
    var weeksBase = Number(selected(itemType).dataset.weeks);
    var mult = Number(selected(material).dataset.mult);
    var fee = Number(selected(engraving).dataset.fee);
    var qty = Math.max(1, Math.min(20, Number(quantityEl.value) || 1));
    quantityEl.value = qty;

    var perItem = base * mult + fee;
    var total = perItem * qty;

    // Lead time grows with quantity but with diminishing marginal time per
    // extra unit (batching efficiency), capped at a sane maximum.
    var weeks = Math.min(26, Math.round(weeksBase + (qty - 1) * weeksBase * 0.35));

    document.getElementById("r-base").textContent = formatMoney(base);
    document.getElementById("r-material").textContent = "×" + mult.toFixed(1);
    document.getElementById("r-engraving").textContent = formatMoney(fee);
    document.getElementById("r-qty").textContent = String(qty);
    document.getElementById("r-total").textContent = formatMoney(total);
    document.getElementById("r-weeks").textContent =
      weeks === 1 ? "about 1 week" : "about " + weeks + " weeks";
  }

  document.addEventListener("DOMContentLoaded", function () {
    ["item-type", "material", "engraving", "quantity"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", recalc);
      document.getElementById(id).addEventListener("change", recalc);
    });
    recalc();
  });
})();
