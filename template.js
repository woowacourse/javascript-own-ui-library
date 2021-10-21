export const counterTemplate = (state) => `
<div id="365kim" class="container">
  <span class="count">${state.count}</span>
  <div class="btn-group">
    <button class="btn-subtract">
      <strong>-</strong>
    </button>
    <button class="btn-reset">
      <strong>RESET</strong>
    </button>
    <button class="btn-add">
      <strong>+</strong>
    </button>
  </div>
</div>`;
