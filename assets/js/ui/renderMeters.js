import { meters } from '../meters.js';
import { onReadingInput, onShowDetail, onPhotoCapture, onToggleDeleteMode, onDeleteConfirmed, onDeleteCancel, renderThumbnails } from './thumbnails.js';

export function renderMeters() {
  const rowEl = document.getElementById('metersRow');
  rowEl.innerHTML = '';

  meters.forEach(m => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-12', 'col-md-6', 'col-lg-4');

    const card = document.createElement('div');
    card.className = 'card card-meter shadow-sm mb-3';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.textContent = m.name;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    cardBody.innerHTML = `
      <div><label>前月値:</label><span class="ms-2">${m.lastMonthReading}</span></div>
      <div class="mt-2">
        <label>現在値:</label>
        <input type="number" class="form-control form-control-sm d-inline-block ms-2 currentReading" style="width:120px;" data-id="${m.id}" placeholder="現在値">
      </div>
      <div class="mt-2"><label>使用量:</label><span class="ms-2 usageCell"></span></div>
      <div class="mt-2"><small class="text-muted">前年同月: ${m.lastYearUsage} / 前月: ${m.lastMonthUsage}</small></div>
      <button class="btn btn-outline-secondary btn-sm me-2 mt-3 detailBtn" data-id="${m.id}">詳細</button>
      <button class="btn btn-sm btn-outline-success me-2 mt-3 photoBtn" data-id="${m.id}" data-mode="camera"><i class="bi bi-camera"></i></button>
      <button class="btn btn-sm btn-outline-primary me-2 mt-3 photoBtn" data-id="${m.id}" data-mode="file"><i class="bi bi-image"></i></button>
      <span class="badge bg-secondary align-text-bottom">${m.images.length}</span>
      <div id="thumbs-${m.id}" class="img-thumbs"></div>
      <button class="btn btn-sm btn-danger mt-2 me-2 toggleDeleteBtn" data-id="${m.id}">削除モード</button>
      <button class="btn btn-sm btn-outline-danger mt-2 me-2 deleteConfirmBtn d-none" data-id="${m.id}">選択削除</button>
      <button class="btn btn-sm btn-secondary mt-2 deleteCancelBtn d-none" data-id="${m.id}">キャンセル</button>
    `;

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    colDiv.appendChild(card);
    rowEl.appendChild(colDiv);

    renderThumbnails(m.id);
  });

  document.querySelectorAll('.currentReading').forEach(el => el.addEventListener('input', onReadingInput));
  document.querySelectorAll('.detailBtn').forEach(el => el.addEventListener('click', onShowDetail));
  document.querySelectorAll('.photoBtn').forEach(el => el.addEventListener('click', onPhotoCapture));
  document.querySelectorAll('.toggleDeleteBtn').forEach(el => el.addEventListener('click', onToggleDeleteMode));
  document.querySelectorAll('.deleteConfirmBtn').forEach(el => el.addEventListener('click', onDeleteConfirmed));
  document.querySelectorAll('.deleteCancelBtn').forEach(el => el.addEventListener('click', onDeleteCancel));
}
