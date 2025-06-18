// Fechas ocupadas con mensajes personalizados
const fechasOcupadas = {
  "01-01": "Año Nuevo (feriado nacional)",
  "01-15": "Inicio académico de verano",
  "03-08": "Día Internacional de la Mujer (actividad institucional)",
  "03-21": "Bienvenida nuevos estudiantes DUOC UC",
  "04-18": "Seminario interno de innovación DUOC UC",
  "04-29": "Día del Carabinero (feriado nacional no irrenunciable)",
  "05-01": "Día del Trabajador (feriado nacional)",
  "05-14": "Jornada de desarrollo docente DUOC UC",
  "06-21": "Día Nacional de los Pueblos Indígenas (feriado nacional)",
  "06-25": "Feria de empleabilidad DUOC UC",
  "07-16": "Virgen del Carmen (feriado nacional)",
  "08-15": "Asunción de la Virgen (feriado nacional)",
  "08-22": "Feria estudiantil DUOC UC",
  "09-18": "Fiestas Patrias (feriado nacional irrenunciable)",
  "09-19": "Día de las Glorias del Ejército (feriado nacional)",
  "10-10": "Jornada académica interdisciplinaria",
  "10-31": "Día de las Iglesias Evangélicas (feriado nacional)",
  "11-01": "Día de Todos los Santos (feriado nacional)",
  "11-30": "Ensayo final de semestre DUOC UC",
  "12-08": "Inmaculada Concepción (feriado nacional)",
  "12-24": "Cierre por fiestas de fin de año",
  "12-25": "Navidad (feriado nacional)",
  "12-31": "Cierre administrativo anual"
};

const horariosPorDia = {
  lunes: [
    "08:00 - 10:00",
    "10:30 - 12:30"
  ],
  martes: [
    "08:00 - 10:00",
    "13:30 - 15:30",
    "16:00 - 18:00"
  ],
  miercoles: [
    "10:30 - 12:30",
    "18:30 - 20:30"
  ],
  jueves: [
    "08:00 - 10:00",
    "16:00 - 18:00"
  ],
  viernes: [
    "13:30 - 15:30",
    "16:00 - 18:00",
    "18:30 - 20:30"
  ],
  sabado: [
    "10:30 - 12:30"
  ],
  domingo: [] // sin disponibilidad
};

const materialesPorLugar = {
  auditorio: [
    'Micrófono inalámbrico',
    'Proyector multimedia Full HD',
    'Pantalla retráctil de 150 pulgadas',
    'Sistema de sonido profesional',
    'Podio con micrófono',
    'Conexión HDMI y VGA',
    'Luces regulables'
  ],
  coliseo: [
    'Escenario desmontable de 8x6 metros',
    'Iluminación teatral LED',
    'Sistema de sonido de alta potencia',
    'Cámaras para streaming en vivo',
    'Sillas plegables para 300 personas',
    'Pantallas laterales LED',
    'Generador eléctrico de respaldo'
  ],
  hall: [
    'Mesas plegables para exhibiciones',
    'Pantalla LED de 65 pulgadas',
    'Sillas apilables',
    'Equipo de sonido básico',
    'Conexión WiFi de alta velocidad',
    'Banners y soportes para señalética'
  ],
  biblioteca: [
    'Pizarras blancas móviles',
    'Proyector portátil',
    'Conexión WiFi estable y segura',
    'Sillas ergonómicas para estudio',
    'Mesas modulares para grupos',
    'Iluminación regulable para lectura'
  ]
};


const calendarDiv = document.getElementById('calendar');
const horarioSelect = document.getElementById('horario');
const lugarSelect = document.getElementById('lugar');
const materialesDiv = document.getElementById('materiales');

let fechaSeleccionada = null;

function crearCalendarioAnual() {
  calendarDiv.innerHTML = "";

  const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                       "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  for (let mes = 0; mes < 12; mes++) {
    const mesDiv = document.createElement('div');
    mesDiv.className = 'mes-calendario';

    const tituloMes = document.createElement('h3');
    tituloMes.textContent = nombreMeses[mes];
    mesDiv.appendChild(tituloMes);

    const diasMesDiv = document.createElement('div');
    diasMesDiv.className = 'dias-mes';

    const diasEnMes = new Date(2025, mes + 1, 0).getDate();

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const diaBtn = document.createElement('button');
      diaBtn.className = 'dia-calendario';
      diaBtn.textContent = dia;

      const mesStr = (mes + 1).toString().padStart(2, '0');
      const diaStr = dia.toString().padStart(2, '0');
      const fechaStr = `${mesStr}-${diaStr}`;

      if (fechasOcupadas[fechaStr]) {
        diaBtn.disabled = true;
        diaBtn.classList.add('ocupado');
        diaBtn.title = fechasOcupadas[fechaStr];
      }

      diaBtn.addEventListener('click', () => {
        seleccionarFecha(fechaStr, mes, dia);
      });

      diasMesDiv.appendChild(diaBtn);
    }

    mesDiv.appendChild(diasMesDiv);
    calendarDiv.appendChild(mesDiv);
  }
}

function obtenerDiaSemana(fechaStr) {
  const [mes, dia] = fechaStr.split('-').map(Number);
  const fecha = new Date(2025, mes - 1, dia);
  const dias = ["lunes", "martes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  return dias[fecha.getDay()];
}

function seleccionarFecha(fechaStr, mes, dia) {
  fechaSeleccionada = fechaStr;

  document.querySelectorAll('.dia-calendario.seleccionado')
    .forEach(btn => btn.classList.remove('seleccionado'));

  const mesDiv = calendarDiv.children[mes];
  const botonesDias = mesDiv.querySelectorAll('.dia-calendario');
  botonesDias.forEach(btn => {
    if (btn.textContent == dia) {
      btn.classList.add('seleccionado');
    }
  });

  const diaSemana = obtenerDiaSemana(fechaStr);

  const horariosDisponibles = horariosPorDia[diaSemana] || [];

  horarioSelect.innerHTML = `<option value="">Seleccione horario</option>`;
  horariosDisponibles.forEach(horario => {
    const option = document.createElement('option');
    option.value = horario;
    option.textContent = horario;
    horarioSelect.appendChild(option);
  });

  horarioSelect.disabled = horariosDisponibles.length === 0;
  lugarSelect.innerHTML = `<option value="">Primero seleccione un horario</option>`;
  lugarSelect.disabled = true;
  materialesDiv.innerHTML = "";
}

horarioSelect.addEventListener('change', () => {
  if (horarioSelect.value) {
    lugarSelect.disabled = false;
    lugarSelect.innerHTML = `
      <option value="">Seleccione lugar</option>
      <option value="auditorio">Auditorio</option>
      <option value="coliseo">Coliseo</option>
      <option value="hall">Hall</option>
      <option value="biblioteca">Biblioteca</option>
    `;
  } else {
    lugarSelect.value = "";
    lugarSelect.disabled = true;
  }
  materialesDiv.innerHTML = "";
});

lugarSelect.addEventListener('change', () => {
  materialesDiv.innerHTML = "";

  const lugar = lugarSelect.value;
  if (!lugar) return;

  const materiales = materialesPorLugar[lugar];
  if (!materiales) return;

  const titulo = document.createElement('h3');
  titulo.textContent = "Seleccione materiales necesarios:";
  materialesDiv.appendChild(titulo);

  materiales.forEach(mat => {
    const label = document.createElement('label');
    label.className = 'material-label';
    label.style.display = 'block';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = mat;
    checkbox.name = 'materiales';

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + mat));
    materialesDiv.appendChild(label);
  });

  const tituloComentario = document.createElement('h3');
  tituloComentario.textContent = "¿Necesita algo más? Descríbalo aquí:";
  tituloComentario.style.marginTop = "20px";
  materialesDiv.appendChild(tituloComentario);

  const textarea = document.createElement('textarea');
  textarea.id = 'comentariosAdicionales';
  textarea.name = 'comentariosAdicionales';
  textarea.rows = 4;
  textarea.cols = 40;
  textarea.placeholder = 'Escriba aquí cualquier requerimiento adicional...';
  materialesDiv.appendChild(textarea);

  const botonEnviar = document.createElement('button');
  botonEnviar.textContent = 'Enviar solicitud';
  botonEnviar.type = 'submit';
  botonEnviar.className = 'btn-enviar';
  botonEnviar.style.marginTop = '20px';
  materialesDiv.appendChild(botonEnviar);

  botonEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Solicitud enviada correctamente");
    // Aquí puedes agregar lógica para enviar los datos al servidor
  });
});

// Inicializar calendario al cargar la página
crearCalendarioAnual();
