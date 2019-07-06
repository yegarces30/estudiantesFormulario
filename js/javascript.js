
/*
  Función miJson: Contiene el listado de 10 estudiantes dentro de un texto tipo JSON.
  la funcion convierte el texto JSON en un objeto JSON y lo devuelve.
*/

function obtenerCookie(nombre) {
   var nuevonombre = nombre + "=";
   var verificar = document.cookie.split(';');
   for (var i = 0; i < verificar.length; i++) {
      var v = verificar[i];
      while (v.charAt(0) == ' ') v = v.substring(1);
      if (v.indexOf(nuevonombre) != -1) {
         return v.substring(nuevonombre.length, v.length);
      }
   }
   return "";
}

function agregarCookie(nombre, valor, fecha) {
   var f = new Date();
   f.setTime(f.getTime() + (fecha * 24 * 60 * 60 * 1000));
   var expiracion = "expiracion=" + f.toGMTString();
   document.cookie = nombre + "=" + valor + "; " + expiracion;
}


function cargarPagina(){
  var estudiantes = obtenerCookie("estudiantes");

  if (estudiantes == ""){
    agregarCookie("estudiantes","{'estudiantes':[",30);
    agregarCookie("cantidadEstudiantes","0",30);
  }

  var btnRegistrar        = document.getElementById("btnRegistrar");
  btnRegistrar.addEventListener("click",adicionarEstudiante);
}

function adicionarEstudiante(){
  var codigo        = document.getElementById("codigo");
  var nombre        = document.getElementById("nombre");
  var materia       = document.getElementById("materia");
  var nota          = document.getElementById("nota");
  var observaciones = document.getElementById("observaciones");

  var estudiantes         = obtenerCookie("estudiantes");
  var cantidadEstudiantes = parseInt(obtenerCookie("cantidadEstudiantes"),10);
  var cantidadEstudiantes = obtenerCookie("cantidadEstudiantes");
  console.log(cantidadEstudiantes);
  if(cantidadEstudiantes == 0 || cantidadEstudiantes == NaN){
    agregarCookie("cantidadEstudiantes","1",30);
  }else{
    estudiantes +=",";
  }
  estudiantes +="{'codigo':"+codigo.value+","+
                "'nombre':"+nombre.value+","+
                "'materia':"+materia.value+","+
                "'nota':"+nota.value+","+
                "'observaciones':"+observaciones.value+"}";
  console.log(estudiantes);
  agregarCookie("estudiantes",estudiantes,30);

}

function miJson(){

  var jsonText = '{"estudiantes":[' +
  '{"codigo":"001","nombre":"Juan Jimenez","nota":4.0 },' +
  '{"codigo":"002","nombre":"Pedro Motessi","nota":3.2 },' +
  '{"codigo":"003","nombre":"Angela Aguilar","nota":4.2 },' +
  '{"codigo":"004","nombre":"Camilo Escobar","nota":3.0 },' +
  '{"codigo":"005","nombre":"Andres Palomino","nota":4.9 },' +
  '{"codigo":"006","nombre":"Laura Acuña","nota": 4.1},' +
  '{"codigo":"007","nombre":"Yeison Garcia","nota":5.0 },' +
  '{"codigo":"008","nombre":"Leidy Velez","nota":3.5 },' +
  '{"codigo":"009","nombre":"Alberto Andrade","nota":4.0 },' +
  '{"codigo":"010","nombre":"Lorena Zuñiga","nota":4.3}'  +
  ']}';

  var jsObj = JSON.parse(jsonText);
  return jsObj;
}

/*
  Función leerJson: Esta función hace el llamado a la función miJson para obtener el objeto.
  Luego recorreo el objeto JSON para obtener la información de todos los estudiantes y mostrarla en una tabla.
*/
function leerJson(){
  var objetoJson  = miJson();

  var sTabla ="<table class='table-striped'><thead><tr><th scope='col'>#</th><th scope='col'>Cod</th><th scope='col'>Nombre</th><th scope='col'>Nota</th></thead><tbody>";

  for (var i=0;i<objetoJson.estudiantes.length;i++){
    sTabla += "<tr><td>"+(i+1)+"</td><td>"+objetoJson.estudiantes[i].codigo+"</td>" +
              "<td>"+objetoJson.estudiantes[i].nombre+"</td>" +
              "<td>"+objetoJson.estudiantes[i].nota+"</td></tr>";
  }

  sTabla +=  "</tbody></table>";
  sTabla = "<h5>Listado de estudiantes</h5>" + sTabla ;

  document.getElementById('informacion1').innerHTML = sTabla;
}

/*
Función obtenerOperaciones: Esta función hace el llamado a la función miJson para obtener el objeto.
Luego recorreo el objeto JSON para obtener la información de las notas de los estudiantes y con ello hace una sumatoria, un promedio y un producto de todas las notas  para Luego mostrar la información en una tabla.
*/
function obtenerOperaciones(){
  var objetoJson    = miJson();
  var sumatoria     = 0;
  var promedio      = 0;
  var producto      = 1

  var sTabla = "<table class='table-striped'><thead><tr><th scope='col' colspan='2'>Operaciones</th></thead><tbody>";

  for (var i=0;i<objetoJson.estudiantes.length;i++){
    sumatoria += objetoJson.estudiantes[i].nota;
    producto *= objetoJson.estudiantes[i].nota;
  }

  if(objetoJson.estudiantes.length > 0){
    promedio = sumatoria / objetoJson.estudiantes.length;
  }

  sTabla += "<tr><th>Suma</th><td>"+ sumatoria + "</td></tr>";
  sTabla += "<tr><th>Promedio</th><td>"+ promedio + "</td></tr>";
  sTabla += "<tr><th>Producto</th><td>"+ producto + "</td></tr>";
  sTabla += "</tbody></table>";
  sTabla = "<h5>Operaciones</h5>" + sTabla ;

  document.getElementById('informacion2').innerHTML = sTabla;
}


/*
Función obtenerNota
El parametro opcion recibe el valor de 1 o 2.
En caso de recibir el valor de 1, la función devolverá la información del primer estudiante con mayor nota.
En caso de recibir el valor de 2, la función devolverá la información del primer estudiante con menor nota.
Esta función hace el llamado a la función miJson para obtener el objeto.
Luego recorreo el objeto JSON para obtener la información de las notas dependiendo del parámetro recibido
para Luego mostrar la información en una tabla.
*/
function obtenerNota(opcion){
  var objetoJson  = miJson();

  var sTabla = "<table  class='table-striped'><thead><tr><th scope='col'>#</th><th scope='col'>Cod</th><th  scope='col'>Nombre</th><th scope='col'>Nota</th></thead><tbody>";

  var pos = 0;
  var nota = 0;

  if(objetoJson.estudiantes.length > 0)
  {
    nota = objetoJson.estudiantes[0].nota;
  }

  for (var i=0;i<objetoJson.estudiantes.length;i++){

      if(opcion == 1){
        if(objetoJson.estudiantes[i].nota > nota){
          pos   = i;
          nota  = objetoJson.estudiantes[i].nota;
        }
      }else{
        if(objetoJson.estudiantes[i].nota < nota){
          pos   = i;
          nota  = objetoJson.estudiantes[i].nota;
        }
      }
  }

  if(objetoJson.estudiantes.length > 0){
    sTabla += "<tr><td>"+(i+1)+"</td><td>"+objetoJson.estudiantes[pos].codigo+"</td>" +
              "<td>"+objetoJson.estudiantes[pos].nombre+"</td>" +
              "<td>"+objetoJson.estudiantes[pos].nota+"</td></tr>";
  }

  sTabla +=  "</tbody></table>";

  if(opcion == 1){
      sTabla = "<h5>Mayor nota</h5>" + sTabla ;

      document.getElementById('informacion3').innerHTML = sTabla;
  }else{
    sTabla = "<h5>Menor nota</h5>" + sTabla ;

    document.getElementById('informacion4').innerHTML = sTabla;
  }
}
