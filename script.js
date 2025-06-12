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

document.querySelectorAll('.button-minimize').forEach(btnMin => {
  btnMin.addEventListener('click', (e) => {
    const ventana = btnMin.closest('.window');
    if (ventana) {
      ventana.style.display = 'none';
      const min = document.createElement('div');
      min.className = 'minimized-window';
      min.innerHTML = `<span>${ventana.querySelector('.window-title').textContent}</span>`;
      document.getElementById('taskbar').appendChild(min);
      min.addEventListener('click', () => {
        ventana.style.display = 'block';
        min.remove();
      });
    }
  });
});

function createWindow(app) {
  let windowContent = '';
  switch (app) {
    case 'flyingpolitics':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Flying Politics</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="https://flyingpolitics.netlify.app" width="800" height="600" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
    case 'notepad':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Programs - Notepad</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-settings">
            <div class="settings-text"><span class="underline">F</span>ile</div>
            <div class="settings-text"><span class="underline">E</span>dit</div>
            <div class="settings-text"><span class="underline">S</span>earch</div>
            <div class="settings-text"><span class="underline">H</span>elp</div>
          </div>
          <div class="window-content">
            <textarea placeholder="Escribe aquí..."></textarea>
          </div>
        </div>`;
      break;
    case 'calculator':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Calculadora</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="calculator.html" width="350" height="520" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
    case 'internet':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Internet</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="https://www.dogpile.com/" width="800" height="600" frameborder="0"></iframe>
          </div>
        </div>`;
      break;

        case 'minino':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">MininoGram</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="https://minino-gram.netlify.app/" width="800" height="600" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
    case 'terminal':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Terminal</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="terminal.html" width="580" height="300" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
    case 'explorer':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Mi equipo</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="filemanager.html" width="800" height="378" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
    case 'musica':
      windowContent = `
        <div class="window-module">
          <div class="window-bar">
            <div class="window-title">Música</div>
            <div class="window-controls">
              <div class="window-minimize"><div class="button-minimize"><div class="icon-minimize"></div></div></div>
              <div class="window-maximize"><div class="button-maximize"><div class="icon-maximize"></div></div></div>
              <div class="window-exit"><button class="window-close button-exit">❌</button></div>
            </div>
          </div>
          <div class="window-content" style="padding:0;">
            <iframe src="musica.html" width="580" height="400" frameborder="0"></iframe>
          </div>
        </div>`;
      break;
  }

  if (windowContent) {
    const windowEl = document.createElement('div');
    windowEl.className = 'window draggable';
    windowEl.style.top = '100px';
    windowEl.style.left = '100px';

    if (app === 'calculator') {
      windowEl.innerHTML = windowContent;
    } else {
      windowEl.innerHTML = `<div class="content">${windowContent}</div>`;
    }

    if (app === 'notepad') {
      windowEl.style.width = 'fit-content';
      windowEl.style.height = '500px';
      const contentDiv = windowEl.querySelector('.window-content');
      if (contentDiv) {
        contentDiv.style.height = '400px';
        contentDiv.style.width = '400px';
        contentDiv.style.minHeight = '300px';
      }
    }

    document.getElementById('desktop').appendChild(windowEl);
    makeWindowDraggable(windowEl);

    const closeBtn = windowEl.querySelector('.window-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => windowEl.remove());
    }

    const minBtn = windowEl.querySelector('.button-minimize');
    if (minBtn) {
      minBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
        const min = document.createElement('div');
        min.className = 'minimized-window';
        min.innerHTML = `<span>${windowEl.querySelector('.window-title').textContent}</span>`;
        document.getElementById('taskbar').appendChild(min);
        min.addEventListener('click', () => {
          windowEl.style.display = 'block';
          min.remove();
        });
      });
    }
  }
}

function makeWindowDraggable(win) {
  let isDragging = false, offsetX = 0, offsetY = 0;
  const titleBar = win.querySelector('.window-bar') || win;

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
    document.querySelectorAll('.window').forEach(win => {
      const iframe = win.querySelector('iframe');
      if (iframe && iframe.src.includes('calculator.html')) {
        win.remove();
      }
    });
  }
});

document.getElementById('taskbarmenu').addEventListener('click', function() {
  let taskbar = document.querySelector('.taskbar-open');
  if (!taskbar) {
    taskbar = document.createElement('div');
    taskbar.className = 'taskbar-open';
    taskbar.innerHTML = `
      <div class="start-button">Menú inicio</div>
      <div class="quick-launch">
        <a href="https://davidltportfolio.netlify.app/" target="_blank" class="taskbar-link">Ver más sobre el creador</a>
        <div class="taskbar-credit" id="openCredits">Créditos</div>
        <div class="taskbar-about" id="openAbout">Sobre este proyecto</div>
      </div>
      
    `;
    document.getElementById('desktop').appendChild(taskbar);

    document.getElementById('openCredits').addEventListener('click', () => createWindow('notepad'));
    document.getElementById('openAbout').addEventListener('click', () => createWindow('notepad'));
  } else {
    taskbar.remove();
  }
});

// Ajustar el contenido del notepad al crearse desde taskbarmenu
const originalCreateWindow = createWindow;
createWindow = function(app) {
  const originalContent = originalCreateWindow(app);
  if (app === 'notepad' && document.getElementById('openCredits')?.contains(event.target)) {
    const windowEl = document.querySelector('.window:last-child');
    const textarea = windowEl.querySelector('textarea');
    if (textarea) {
      textarea.value = `Terminal: https://codepen.io/TheOnlyZac/pen/pyxmQZ
notepad: https://codepen.io/sadcry/pen/WGqpKx
calculadora: https://codepen.io/sp4c3junk/pen/YzNbOrd
file manager inspo: https://codepen.io/VoidCode/pen/vpZbNy
reproductor de musica: https://codepen.io/maxew33/pen/XWRvWdY
flying politics by Javi Navarro, un gran compañero, mira su trabajo en: https://portfoliojaviernavarro.netlify.app/`;
      textarea.readOnly = true;
    }
  } else if (app === 'notepad' && document.getElementById('openAbout')?.contains(event.target)) {
    const windowEl = document.querySelector('.window:last-child');
    const textarea = windowEl.querySelector('textarea');
    if (textarea) {
      textarea.value = `¡Hola! Este proyecto ha sido creado con HTML, CSS y JavaScript puro, lo que ha sido un reto divertido porque no usé frameworks. He recopilado distintas funcionalidades de otros usuarios geniales y las he integrado en este escritorio hecho por mí. Incluye gestión de ventanas y funcionalidad de escritorio, todo desde cero. ¡Espero que lo disfrutes!`;
      textarea.readOnly = true;
    }
  }
  return originalContent;
};