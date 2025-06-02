import { renderMeters } from './ui/renderMeters.js';

document.addEventListener('DOMContentLoaded', () => {
  renderMeters();
});

// サーバ送信(ダミー)
document.getElementById('sendBtn').addEventListener('click', () => {
  const out = document.getElementById('sendOutput');
  out.innerHTML = '';

  import('./meters.js').then(({ meters }) => {
    meters.forEach(m => {
      let usage = null;
      if (m.currentReading !== null && m.currentReading >= m.lastMonthReading) {
        usage = m.currentReading - m.lastMonthReading;
      }
      let wrap = document.createElement('div');
      wrap.className = 'border rounded p-2 mb-3';

      let info = document.createElement('div');
      info.innerHTML = `
        <strong>${m.name}</strong><br>
        前月値: ${m.lastMonthReading}, 現在値: ${m.currentReading ?? '-'}, 使用量: ${usage ?? '-'}
      `;
      wrap.appendChild(info);

      if (m.images.length > 0) {
        let thumbsDiv = document.createElement('div');
        thumbsDiv.className = 'd-flex flex-wrap mt-2';
        m.images.forEach((imgUrl) => {
          let img = document.createElement('img');
          img.src = imgUrl;
          img.className = 'img-thumb me-2';
          img.style.width = '50px';
          img.style.height = '50px';
          img.onclick = () => {
            const zoomModal = new bootstrap.Modal(document.getElementById('photoZoomModal'));
            const zoomedPhoto = document.getElementById('zoomedPhoto');
            zoomedPhoto.src = imgUrl;
            zoomModal.show();
          };
          thumbsDiv.appendChild(img);
        });
        wrap.appendChild(thumbsDiv);
      } else {
        let noimg = document.createElement('div');
        noimg.className = 'text-muted small mt-2';
        noimg.textContent = '(写真なし)';
        wrap.appendChild(noimg);
      }
      out.appendChild(wrap);
    });
  });

  new bootstrap.Modal(document.getElementById('sendResultModal')).show();
});