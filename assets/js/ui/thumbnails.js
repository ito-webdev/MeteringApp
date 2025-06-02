import { meters, WARNING_THRESHOLD } from '../meters.js';
import { drawUsageChart } from './chart.js';

export function onReadingInput(e) {
  const meterId = parseInt(e.target.dataset.id, 10);
  const meter = meters.find(x => x.id === meterId);
  if (!meter) return;

  const val = parseInt(e.target.value, 10);
  const usageCell = e.target.closest('.card-body').querySelector('.usageCell');
  if (!isNaN(val)) {
    meter.currentReading = val;
    let usage = val - meter.lastMonthReading;
    usageCell.textContent = usage >= 0 ? usage : '-';
    usageCell.classList.toggle('usage-warning', usage > 0 && (
      Math.abs(usage - meter.lastMonthUsage) / meter.lastMonthUsage > WARNING_THRESHOLD ||
      Math.abs(usage - meter.lastYearUsage) / meter.lastYearUsage > WARNING_THRESHOLD));
  } else {
    meter.currentReading = null;
    usageCell.textContent = '';
    usageCell.classList.remove('usage-warning');
  }
}

export function onShowDetail(e) {
  const meterId = parseInt(e.target.dataset.id, 10);
  const meter = meters.find(x => x.id === meterId);
  if (!meter) return;

  const historyUl = document.getElementById('historyList');
  historyUl.innerHTML = meter.history.map(h =>
    `<li class="list-group-item d-flex justify-content-between">
      <span>${h.month}</span>
      <span>${h.value} (使用量:${h.usage})</span>
    </li>`).join('');

  let usageData = meter.history.map(h => h.usage);
  let labels = meter.history.map(h => h.month);
  drawUsageChart(labels, usageData, Math.max(...usageData));

  new bootstrap.Modal(document.getElementById('detailModal')).show();
}

export function onPhotoCapture(e) {
  const btn = e.currentTarget;
  const meterId = parseInt(btn.dataset.id, 10);
  const meter = meters.find(x => x.id === meterId);
  if (!meter) return;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;
  if (btn.dataset.mode === "camera") input.capture = 'environment';
  input.click();

  input.onchange = () => {
    for (let f of input.files) meter.images.push(URL.createObjectURL(f));
    renderThumbnails(meterId);
  };
}

export function renderThumbnails(meterId) {
  const meter = meters.find(x => x.id === meterId);
  const thumbsDiv = document.getElementById(`thumbs-${meterId}`);
  thumbsDiv.innerHTML = meter.images.map((imgUrl, i) =>
    `<img src="${imgUrl}" class="img-thumb" data-idx="${i}">`).join('');

  thumbsDiv.closest('.card-body').querySelector('.badge').textContent = meter.images.length;
  thumbsDiv.querySelectorAll('.img-thumb').forEach(img => img.addEventListener('click', e => onThumbClick(e, meterId)));
}

export function onThumbClick(e, meterId) {
  const meter = meters.find(x => x.id === meterId);
  if (!meter) return;

  const cardBody = e.target.closest('.card-body');
  const delConfirmBtn = cardBody.querySelector('.deleteConfirmBtn');
  const isDeleteMode = !delConfirmBtn.classList.contains('d-none');

  const imgElm = e.target;
  const idx = parseInt(imgElm.dataset.idx, 10);

  if (isDeleteMode) {
    imgElm.classList.toggle('delete-select');
  } else {
    const zoomModal = new bootstrap.Modal(document.getElementById('photoZoomModal'));
    const zoomedPhoto = document.getElementById('zoomedPhoto');
    zoomedPhoto.src = meter.images[idx];
    zoomModal.show();
  }
}

export function onToggleDeleteMode(e) {
  const cardBody = e.target.closest('.card-body');
  const delConfirmBtn = cardBody.querySelector('.deleteConfirmBtn');
  const delCancelBtn = cardBody.querySelector('.deleteCancelBtn');

  if (delConfirmBtn.classList.contains('d-none')) {
    delConfirmBtn.classList.remove('d-none');
    delCancelBtn.classList.remove('d-none');
  } else {
    delConfirmBtn.classList.add('d-none');
    delCancelBtn.classList.add('d-none');
    cardBody.querySelectorAll('.img-thumb.delete-select')
      .forEach(img => img.classList.remove('delete-select'));
  }
}

export function onDeleteConfirmed(e) {
  const meterId = parseInt(e.target.dataset.id, 10);
  const meter = meters.find(x => x.id === meterId);
  if (!meter) return;

  const cardBody = e.target.closest('.card-body');
  const selectedImgs = cardBody.querySelectorAll('.img-thumb.delete-select');
  const srcs = Array.from(selectedImgs).map(img => img.src);

  meter.images = meter.images.filter(url => !srcs.includes(url));

  onToggleDeleteMode(e);
  renderThumbnails(meterId);
}

export function onDeleteCancel(e) {
  onToggleDeleteMode(e);
}
