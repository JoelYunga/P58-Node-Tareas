const fs = require('fs');
const colors = require("colors");

let tareasPorHacer = [];

const guardarDatos = () => {
    let data = JSON.stringify(tareasPorHacer);
    fs.writeFile('./data/datos.json', data, (err, data) => {
        if (err) throw new Error('No se pudo guardar la data', err);
    });
}

const leerDatos = () => {
    try {
        tareasPorHacer = require('../data/datos.json');
    } catch (error) {
        tareasPorHacer = []
    }
}

const crear = (descripcion) => {

    leerDatos();

    let tarea = {
        descripcion,
        completado: false
    }

    tareasPorHacer.push(tarea);

    guardarDatos();

    return tarea;
}

const listar = () => {

    leerDatos();
    console.log("===================================".blue);
    console.log("======== TAREAS POR HACER =========".blue);
    console.log("===================================".blue);


    for (let k = 0; k < tareasPorHacer.length; k++) {
        if (tareasPorHacer[k].completado == true) {
            console.log("-----------------------------------".brightBlue);
            console.log((`Tarea N° ${k + 1}`).gray);
            console.log((`Tarea Propuesta: ${tareasPorHacer[k].descripcion}`).brightGreen);
            console.log("Estado: Tarea Completa".yellow);
        } else {
            console.log("-----------------------------------".brightBlue);
            console.log((`Tarea N° ${k + 1}`).gray);
            console.log((`Tarea Proppuesta: ${tareasPorHacer[k].descripcion}`).brightGreen);
            console.log("Estado: Tarea Incompleta".red);
        }

    }
}




const actualizar = (descripcion, completado = true) => {
    leerDatos();

    let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        tareasPorHacer[index].completado = completado;
        guardarDatos();
        return true;

    }

    return false;
}

const eliminar = (descripcion) => {
    leerDatos();

    let eli = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (eli >= 0) {
        tareasPorHacer.splice(eli, 1);
        guardarDatos();
        console.log('');
        return 'Tarea eliminada'.red;
    }
    console.log('');
    return 'No existe la tarea que desea eliminar'.red;


}


module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}