const GRID_WIDTH = 80 + 8;  // 80px icono + 8px margin-right
const GRID_HEIGHT = 90 + 8; // 90px icono + 8px margin-bottom
const DESKTOP_PADDING_LEFT = 16; // padding-left de #desktop
const DESKTOP_PADDING_TOP = 16;  // padding-top de #desktop
let current = null, clone = null, offsetX = 0, offsetY = 0;

document.querySelectorAll('.draggable').forEach(icon => {
    icon.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        current = icon;

        // Crea un clon visual
        clone = icon.cloneNode(true);
        document.body.appendChild(clone);

        // Posición inicial del clon
        const rect = icon.getBoundingClientRect();
        clone.style.position = 'absolute';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.zIndex = 1000;
        clone.style.pointerEvents = 'none';
        clone.style.opacity = '0.8';

        // Oculta el original
        icon.style.opacity = '0.3';

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
        e.preventDefault();
    });
});

function mouseMove(e) {
    if (!clone) return;
    clone.style.left = (e.clientX - offsetX) + 'px';
    clone.style.top = (e.clientY - offsetY) + 'px';
}

function mouseUp(e) {
    if (clone && current) {
        // Calcula la celda más cercana
        const desktopRect = document.getElementById('desktop').getBoundingClientRect();
        let left = e.clientX - desktopRect.left - offsetX;
        let top = e.clientY - desktopRect.top - offsetY;

        // Ajusta a la cuadrícula
        const GRID_WIDTH = 80 + 16;
        const GRID_HEIGHT = 90 + 16;
        let snappedLeft = Math.round(left / GRID_WIDTH) * GRID_WIDTH;
        let snappedTop = Math.round(top / GRID_HEIGHT) * GRID_HEIGHT;

        // Mueve el icono original en el grid usando CSS Grid properties
        current.style.gridColumnStart = (snappedLeft / GRID_WIDTH) + 1;
        current.style.gridRowStart = (snappedTop / GRID_HEIGHT) + 1;

        // Restaura el original y elimina el clon
        current.style.opacity = '';
        clone.remove();
    }
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    current = null;
    clone = null;
}

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const app = icon.getAttribute('data-app');
    createWindow(app);
  });
});

function createWindow(app) {
  let windowContent = '';
  switch (app) {
    case 'flyingpolitics':
      windowContent = `
        <div class="notepad-module">
          <div class="notepad-bar">
            <div class="notepad-title">Flying Politics</div>
            <div class="notepad-controls">
              <div class="notepad-minimize">
                <div class="button-minimize"><div class="icon-minimize"></div></div>
              </div>
              <div class="notepad-maximize">
                <div class="button-maximize"><div class="icon-maximize"></div></div>
              </div>
              <div class="notepad-exit">
                <button class="window-close button-exit">❌</button>
              </div>
            </div>
          </div>
          <div class="notepad-content" style="padding:0;">
            <iframe src="https://flyingpolitics.netlify.app/" width="800" height="600" frameborder="0"></iframe>
          </div>
        </div>
      `;
      break;

      case 'cs16':
      windowContent = `
        <iframe src="https://play-cs.com/es/" width="800" height="600" frameborder="0"></iframe>
      `;
      break;

      case 'notepad':
      windowContent = `
        <div class="notepad-module">
          <div class="notepad-bar">
            <div class="notepad-title">Programs - Notepad</div>
            <div class="notepad-controls">
              <div class="notepad-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="notepad-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="notepad-exit">
                <button class="window-close button-exit">❌</button>
              </div>
            </div>
          </div>
          <div class="notepad-settings">
            <div class="settings-text"><span class="underline">F</span>ile</div>
            <div class="settings-text"><span class="underline">E</span>dit</div>
            <div class="settings-text"><span class="underline">S</span>earch</div>
            <div class="settings-text"><span class="underline">H</span>elp</div>
          </div>
          <div class="notepad-content">
            <textarea placeholder="Escribe aquí..."></textarea>
          </div>
        </div>
      `;
      break;

      case 'calculator':
       windowContent = `
        <div class="notepad-module">
          <div class="notepad-bar">
            <div class="notepad-title">Calculadora</div>
            <div class="notepad-controls">
              <div class="notepad-minimize">
                <div class="button-minimize"><div class="icon-minimize"></div></div>
              </div>
              <div class="notepad-maximize">
                <div class="button-maximize"><div class="icon-maximize"></div></div>
              </div>
              <div class="notepad-exit">
                <button class="window-close button-exit">❌</button>
              </div>
            </div>
          </div>
          <div class="notepad-content" style="padding:0;">
            <iframe src="calculator.html" width="350" height="520" frameborder="0"></iframe>
          </div>
        </div>
      `;
      break;

      case 'internet':
        windowContent = `
          <div class="notepad-module">
            <div class="notepad-bar">
              <div class="notepad-title">Internet Explorer</div>
              <div class="notepad-controls">
                <div class="notepad-minimize">
                  <div class="button-minimize"><div class="icon-minimize"></div></div>
                </div>
                <div class="notepad-maximize">
                  <div class="button-maximize"><div class="icon-maximize"></div></div>
                </div>
                <div class="notepad-exit">
                  <button class="window-close button-exit">❌</button>
                </div>
              </div>
            </div>
            <div class="notepad-content" style="padding:0;">
              <iframe 
                src="https://web.archive.org/web/20050316155511/http://www.google.com/webhp?hl=en&tab=iw&ie=UTF-8" 
                width="800" height="600" frameborder="0"></iframe>
            </div>
          </div>
        `;
        break;
  }

  if (windowContent) {
    const window = document.createElement('div');
    window.className = 'window draggable';
    window.style.top = '100px';
    window.style.left = '100px';

    // Si es la calculadora, no envuelvas en <div class="content">
    if (app === 'calculator') {
        window.innerHTML = windowContent;
    } else {
        window.innerHTML = `<div class="content">${windowContent}</div>`;
    }

    document.getElementById('desktop').appendChild(window);
    makeWindowDraggable(window);

    // Botón cerrar funcional para cualquier ventana con .window-close
    const closeBtn = window.querySelector('.window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => window.remove());
    }
  }
}

function makeWindowDraggable(win) {
    let isDragging = false, offsetX = 0, offsetY = 0;
    const titleBar = win.querySelector('.notepad-bar') || win; // Solo barra si existe

    titleBar.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        function moveAt(ev) {
            if (!isDragging) return;
            win.style.position = 'absolute';
            win.style.left = (ev.clientX - offsetX) + 'px';
            win.style.top = (ev.clientY - offsetY) + 'px';
            win.style.zIndex = 2000;
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', stopDrag);
        }

        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', stopDrag);
        e.preventDefault();
    });
}

window.addEventListener('message', function(event) {
    if (event.data === 'close-calculator') {
        // Busca la ventana que contiene el iframe de la calculadora y ciérrala
        document.querySelectorAll('.window').forEach(win => {
            const iframe = win.querySelector('iframe');
            if (iframe && iframe.src.includes('calculator.html')) {
                win.remove();
            }
        });
    }
});