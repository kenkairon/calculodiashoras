/*Intalaciones  */
/*npm init -y
npm install express */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const valorHoraLuVi = 7100;
const valorHoraSabado = 12300;

rl.question('FECHA INICIO? ', (fechaInicio) => {
  rl.question('FECHA DE TERMINO? ', (fechaTermino) => {
    rl.question('CANTIDAD HORAS LU-VI? ', (horasLuVi) => {
      rl.question('CANTIDAD HORAS SA? ', (horasSabado) => {

        // Calculo de las horas trabajadas
        const horasTotales = calcularHorasTotales(fechaInicio, fechaTermino, horasLuVi, horasSabado);

        // Cálculo de los subtotales
        const subtotalLuVi = calcularSubtotalLuVi(horasLuVi, valorHoraLuVi);
        const subtotalSabado = calcularSubtotalSabado(horasSabado, valorHoraSabado);

        // Cálculo del total
        const total = subtotalLuVi + subtotalSabado;

        // Impresión de resultados
        console.log(`SUBTOTAL LU-VI: ${subtotalLuVi}`);
        console.log(`SUBTOTAL SA: ${subtotalSabado}`);
        console.log(`TOTAL: ${total}`);

        rl.close();
      });
    });
  });
});

function calcularHorasTotales(fechaInicio, fechaTermino, horasLuVi, horasSabado) {
  // Cálculo de horas trabajadas de lunes a viernes
  const diasLuVi = obtenerDias(fechaInicio, fechaTermino, 'Lunes', 'Viernes');
  const horasLuViTotales = diasLuVi * 8 - diasLuVi; // Se descuenta una hora por almuerzo
  const horasSabadoTotales = horasSabado * 5;

  return horasLuViTotales + horasSabadoTotales;
}

function calcularSubtotalLuVi(horasLuVi, valorHoraLuVi) {
  return horasLuVi * valorHoraLuVi;
}

function calcularSubtotalSabado(horasSabado, valorHoraSabado) {
  return horasSabado * valorHoraSabado;
}

function obtenerDias(fechaInicio, fechaTermino, diaInicio, diaTermino) {
  const fechaInicioTimestamp = new Date(fechaInicio).getTime();
  const fechaTerminoTimestamp = new Date(fechaTermino).getTime();
  const unDiaTimestamp = 24 * 60 * 60 * 1000;
  let dias = 0;

  for (let i = fechaInicioTimestamp; i <= fechaTerminoTimestamp; i += unDiaTimestamp) {
    const fecha = new Date(i);
    const dia = fecha.toLocaleDateString('es-CL', { weekday: 'long' });

    if (dia === diaInicio || dia === diaTermino) {
      dias++;
    }
  }

  return dias;
}
