/**
 * Autor: Sergio Iturra
 * 
 * Algoritmo cálculo de sesiones activas
 * 
 * Entrada: Array de los registros de la bd que estén dentro de un rango de fechas
 * Salida: Array con el número de sesiones activas por día
**/

// Ejemplo datos de entrada:
 "registros": [
    {
        "CID": 1,
        "Date": "2017-02-23T19:41:21.397+0000",
        "Method": "GET@1",
        "Time": 38,
        "UID": 1,
        "_id": "5ccaff75b3ed08c5ff1b4537",
        "src": "web"
    },
    {
        "CID": 1,
        "Date": "2017-02-23T19:41:22.019+0000",
        "Method": "GET@2",
        "Time": 52,
        "UID": 1,
        "_id": "5ccaff75b3ed08c5ff1b4538",
        "src": "web"
    }
]

// Ejemplo datos de salida:
"dataOut": [
	{
		"dia": "2017-02-23",
		"sesiones": 4
	},
	{
		"dia": "2017-02-24",
		"sesiones": 20
	}
]

//Supuestos:
// 1. Ya que se buscan llamadas diarias, a las 00:00 se corta el conteo de sesiones activas.
// Una sesión activa que pase de esta hora, pasa a ser dos sesiones distintas (antes y después de las 00:00).

//Definiciones:
// sesion_activa: Llamadas para un usuario que estén separadas por menos que intervalo_activo
// duracion_sesion: Minutos entre primera y última sesión


//Constantes:
//intervalo activo
var INT_ACT = 15;

//Funciones:

//calcular la diferencia entre dos tiempos
//Entrada: dos tiempos en formato moments
//Salida: (int) diferencia entre tiempos en minutos 
function diferencia_minutos(hora_registro, hora_acual){
	return moments(hora_registro) - moments(hora_acual);
}

//Recorrer cada día en busca de sesiones activas
//Entrada: registros diarios [(UID,hora)]
//Salida: numero de sesiones activas por día
function sesionesActivasDiarias(reg_dia[]){
	if (reg_dia === null) {
		return 0;
	}
	//N sesiones totales
	var sesiones = 1;
	//registro usuarios
	var UIDs = [reg_dia[0].UID];
	//registro ultima hora visitada para cada usuario
	var ultima_hora = [reg_dia[0].hora];
	var hora_acual = moment(reg_dia[0].hora);
	var hora_registro = moment(reg_dia[0].hora);
	var posicion_usuario = 0;

	reg_dia.forEach(function(regAux){
		//Si UID no está registrado en UIDs aun, registrar en UIDs & ultima_hora. sesiones++
		if (!UIDs.includes(regAux.UID)){
			UIDs.push(regAux.UID);
			ultima_hora.push(regAux.hora);
			sesiones++;
		}
		//Si está UID, verificar que tiempo de diferencia es menor que intervalo activo (INT_ACT). Actualizar registro
		else{
			posicion_usuario = UIDs.indexOf(regAux.UID);
			hora_registro = moment(ultima_hora[posicion_usuario]);
			hora_acual = moment(regAux.hora);
			if(diferencia_minutos(hora_registro, hora_acual) >= minutos(INT_ACT)){
				sesiones++;
			}
			else{
				// Registro es parte de sesion activa, do nothing.
			}
			//Actualizar registro: cambiar última hora visitada para este usuario
			ultima_hora[posicion_usuario] = regAux.hora;
		}
	});
	return sesiones;
}

//MAIN:

//A partir de la entrada "registros", crear Array con todos los registros de cada usuario por día
//(Sólo basta con verificar el UserId (UID) ya que es único por usuario según diagrama y archivo entregados)
//Se puede omitir este paso pero queda más ordenado

"UID_Dia": [
	{
		"dia": "2017-02-23",
		"registros_diarios": [
			{
				"UID": 1,
				"hora": "19:41:21.396+0000"
			},
			{
				"UID": 1,
				"hora": "19:41:21.397+0000"
			},
			{
				"UID": 2,
				"hora": "19:41:22.019+0000"
			},
			{
				"UID": 2,
				"hora": "19:41:22.215+0000"
			}
		]
	},
	{
		"dia": "2017-02-24",
		"registros_diarios": [
			{
				"UID": 52,
				"hora": "00:03:53.621+0000"
			},
			{
				"UID": 1,
				"hora": "03:53.991+0000"
			},
			{
				"UID": 52,
				"hora": "00:34:34.832+0000"
			},
			{
				"UID": 1,
				"hora": "00:34:34.973+0000"
			}
		]
	}
]

//Recorrer cada día, agregando a dataOut {dia,numero de sesiones activas}
var dataOut = [];
//aux para guardar en dataOut
var sesiones_dia = {"dia": "02-23-2017", "sesiones": 0};

UID_Dia.forEach(function(reg_dia){
	//almacenar día en aux
	sesiones_dia.dia = reg_dia.dia;
	//almacenar numero de sesiones en aux
	sesiones_dia.sesiones = sesionesActivasDiarias(reg_dia.registros_diarios);
	//guardar aux en dataOut
	dataOut.push(sesiones_dia);
});

retornar(dataOut);
