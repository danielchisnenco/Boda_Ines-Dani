let companionCount = 0;

function addCompanion() {
  const container = document.getElementById('companions-container');
  companionCount = container.querySelectorAll('.companion-entry').length + 1;
  const lang = currentLang || 'es';
  const dict = formTranslations[lang];

  const div = document.createElement('div');
  div.className = 'companion-entry';
  div.id = `companion-${companionCount}`;
  div.innerHTML = `
    <div class="companion-header">
      <span>#${companionCount}</span>
      <button type="button" class="remove-companion" onclick="removeCompanion(${companionCount})">×</button>
    </div>
    <div class="form-group">
      <input type="text" name="companion_name_${companionCount}" placeholder="${dict.field_companion_name}" required>
    </div>
    <div class="form-group">
      <select name="companion_menu_${companionCount}">
        <option value="adult">${dict.menu_adult}</option>
        <option value="child">${dict.menu_child}</option>
      </select>
    </div>
    <div class="form-group">
      <select name="companion_allergy_${companionCount}">
        <option value="none">${dict.allergy_none}</option>
        <option value="celiac">${dict.allergy_celiac}</option>
        <option value="vegetarian">${dict.allergy_vegetarian}</option>
        <option value="lactose">${dict.allergy_lactose}</option>
        <option value="other">${dict.allergy_other}</option>
      </select>
    </div>
    <div class="form-group">
      <input type="text" name="companion_other_${companionCount}" placeholder="${dict.field_companion_other}">
    </div>
  `;
  container.appendChild(div);
}

function removeCompanion(id) {
  const el = document.getElementById(`companion-${id}`);
  if (el) el.remove();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const raw = Object.fromEntries(formData.entries());

  const companions = [];
  const container = document.getElementById('companions-container');
  const entries = container.querySelectorAll('.companion-entry');
  entries.forEach((entry, i) => {
    const name = entry.querySelector(`input[name^="companion_name"]`);
    const menu = entry.querySelector(`select[name^="companion_menu"]`);
    const allergy = entry.querySelector(`select[name^="companion_allergy"]`);
    const other = entry.querySelector(`input[name^="companion_other"]`);
    if (name && name.value) {
      companions.push(`${name.value} (${menu ? menu.value : ''}, ${allergy ? allergy.value : ''}, ${other ? other.value : ''})`);
    }
  });

  const data = {
    nombre: raw.nombre || '',
    apellidos: raw.apellidos || '',
    asistencia: raw.asistencia || '',
    alergia: raw.alergia || '',
    alergia_detalle: raw.alergia_detalle || '',
    acompanantes: companions.join(' | '),
    bus: raw.bus || '',
    parada_vuelta: raw.parada_vuelta || '',
    comentarios: raw.comentarios || '',
    cancion: raw.cancion || ''
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const messageEl = document.getElementById('form-message');
  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  // Google Sheets endpoint (to be configured)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTG1u53QMNBl-4GwIfwDv2dCctrpzt7kQDVJkOnJ9l0mgGva-CAAoeSqtr0vZyOV1f/exec';

  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    const lang = currentLang || 'es';
    messageEl.textContent = formTranslations[lang].submit_success;
    messageEl.className = 'form-message success';
    messageEl.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = formTranslations[lang].submit;
    console.log('Form data (backend not configured):', data);
    return;
  }

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    const lang = currentLang || 'es';
    messageEl.textContent = formTranslations[lang].submit_success;
    messageEl.className = 'form-message success';
    messageEl.style.display = 'block';
    form.reset();
    // TODO: Activar cuando se termine de testear
    // localStorage.setItem('wedding-form-sent', 'true');
  })
  .catch(() => {
    const lang = currentLang || 'es';
    messageEl.textContent = formTranslations[lang].submit_error;
    messageEl.className = 'form-message error';
    messageEl.style.display = 'block';
  })
  .finally(() => {
    const lang = currentLang || 'es';
    submitBtn.disabled = false;
    submitBtn.textContent = formTranslations[lang].submit;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');

  // TODO: Activar cuando se termine de testear
  // if (form && localStorage.getItem('wedding-form-sent')) {
  //   form.style.display = 'none';
  //   const msg = document.createElement('div');
  //   msg.className = 'form-message success';
  //   msg.style.display = 'block';
  //   msg.textContent = formTranslations[currentLang || 'es'].already_sent;
  //   form.parentNode.insertBefore(msg, form);
  //   return;
  // }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  const addBtn = document.getElementById('add-companion-btn');
  if (addBtn) {
    addBtn.addEventListener('click', addCompanion);
  }

  const attendanceRadios = document.querySelectorAll('input[name="asistencia"]');
  const attendingSections = document.getElementById('attending-sections');
  const songSection = document.getElementById('song-section');
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'no') {
        attendingSections.style.display = 'none';
        songSection.style.display = 'none';
        attendingSections.querySelectorAll('[required]').forEach(el => el.removeAttribute('required'));
      } else {
        attendingSections.style.display = 'block';
        songSection.style.display = 'block';
        attendingSections.querySelector('select[name="alergia"]').setAttribute('required', '');
        attendingSections.querySelector('input[name="bus"][value="Ida y vuelta"]').setAttribute('required', '');
      }
    });
  });

  const busRadios = document.querySelectorAll('input[name="bus"]');
  const returnStopSection = document.getElementById('return-stop-section');
  const paradaRadios = returnStopSection.querySelectorAll('input[name="parada_vuelta"]');
  busRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const val = radio.value;
      if (val === 'Ida y vuelta' || val === 'Solo vuelta') {
        returnStopSection.style.display = 'block';
        paradaRadios.forEach(r => r.required = true);
      } else {
        returnStopSection.style.display = 'none';
        paradaRadios.forEach(r => r.required = false);
      }
    });
  });
});
