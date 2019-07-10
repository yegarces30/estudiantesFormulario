
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

function listarEstudiantes(){
  var estudiantes = obtenerCookie("estudiantes")+"]}";
  var objetoJson = JSON.parse(estudiantes);

  var sTabla ="<table class='table table-striped table-bordered table-hover'><thead>"+
              "<tr><th scope='col'>#</th>"+
              "<th scope='col'>Cod</th>"+
              "<th scope='col'>Nombre</th>"+
              "<th scope='col'>Materia</th>"+
              "<th scope='col'>Nota</th>"+
              "<th scope='col'>Observaciones</th>"+
              "</thead><tbody>";

  for (var i=0;i<objetoJson.estudiantes.length;i++){
    sTabla += "<tr><td>"+(i+1)+"</td><td>"+objetoJson.estudiantes[i].codigo+"</td>" +
              "<td>"+objetoJson.estudiantes[i].nombre+"</td>" +
              "<td>"+objetoJson.estudiantes[i].materia+"</td>"+
              "<td>"+objetoJson.estudiantes[i].nota+"</td>"+
              "<td>"+objetoJson.estudiantes[i].observaciones+"</td>"+
              "<td><button name='"+objetoJson.estudiantes[i].codigo+"' onclick='mostrarRegistro("+objetoJson.estudiantes[i].codigo+")' "+
              "class='modificar btn btn-default btn-xs' >"+
              "<img  src='images/modificar.png' alt=''>  </img> </button></td>"+
              "<td><button name='"+objetoJson.estudiantes[i].codigo+"' onclick='eliminar("+objetoJson.estudiantes[i].codigo+")' "+
              "class='eliminar btn btn-default btn-xs' >"+
              "<img  src='images/eliminar.png' alt=''>  </img> </button></td></tr>";
  }

  sTabla +=  "</tbody></table>";
  sTabla = "<h5>Listado de estudiantes</h5>" + sTabla ;

  document.getElementById('informacion1').innerHTML = sTabla;

  /*
  adicionarListenerBotonesTabla("modificar");
  adicionarListenerBotonesTabla("eliminar");*/
}

function adicionarListenerBotonesTabla(clase){
  var listadoBotones = document.getElementsByClassName(clase);
  for(var i=0;i<listadoBotones.length;i++){
    var codigo = listadoBotones[i].name;
    if(clase == "modificar"){
        listadoBotones[i].addEventListener("click",function(){mostrarRegistro(codigo);})
    }else {
      listadoBotones[i].addEventListener("click",function(){eliminar(codigo);})
    }
  }
}

function limpiarCampos(){
  var codigo        = document.getElementById("codigo");
  var nombre        = document.getElementById("nombre");
  var materia       = document.getElementById("materia");
  var nota          = document.getElementById("nota");
  var observaciones = document.getElementById("observaciones");
  var opcionGuardar = document.getElementById("opcionGuardar");

  codigo.value = "";
  codigo.disabled = false;
  nombre.value = "";
  materia.selectedIndex = "0";
  nota.value = "";
  observaciones.value = "";
  opcionGuardar.value = "1";
  window.scrollTo(0, 0);
}

function modificar(){
  var cantidadEstudiantes = obtenerCookie("cantidadEstudiantes");
  if (cantidadEstudiantes != "" && cantidadEstudiantes != "0"){
    var estudiantes = obtenerCookie("estudiantes")+"]}";
    var objetoJson = JSON.parse(estudiantes);
    var codigo        = document.getElementById("codigo");

    for (var i=0;i<objetoJson.estudiantes.length;i++){
        if(objetoJson.estudiantes[i].codigo == codigo.value){
          var codigo        = document.getElementById("codigo");
          var nombre        = document.getElementById("nombre");
          var materia       = document.getElementById("materia");
          var nota          = document.getElementById("nota");
          var observaciones = document.getElementById("observaciones");
          var opcionGuardar = document.getElementById("opcionGuardar");

          objetoJson.estudiantes[i].codigo = codigo.value;
          objetoJson.estudiantes[i].nombre = nombre.value;
          objetoJson.estudiantes[i].materia = materia.value;
          objetoJson.estudiantes[i].nota = nota.value;
          objetoJson.estudiantes[i].observaciones = observaciones.value;
          break;
        }
    }
    estudiantes = JSON.stringify(objetoJson);
    estudiantes = estudiantes.replace("]}","");
    agregarCookie("estudiantes",estudiantes,30);
    limpiarCampos();
    alert("Registro modificado con éxito.");
  }
}

function mostrarRegistro(codigo){
  var cantidadEstudiantes = obtenerCookie("cantidadEstudiantes");
  if (cantidadEstudiantes != "" && cantidadEstudiantes != "0"){
    var estudiantes = obtenerCookie("estudiantes")+"]}";
    var objetoJson = JSON.parse(estudiantes);

    for (var i=0;i<objetoJson.estudiantes.length;i++){
        if(objetoJson.estudiantes[i].codigo == codigo){
          var codigo        = document.getElementById("codigo");
          var nombre        = document.getElementById("nombre");
          var materia       = document.getElementById("materia");
          var nota          = document.getElementById("nota");
          var observaciones = document.getElementById("observaciones");
          var opcionGuardar = document.getElementById("opcionGuardar");

          codigo.value = objetoJson.estudiantes[i].codigo;
          codigo.disabled = true;
          nombre.value = objetoJson.estudiantes[i].nombre;
          materia.value = objetoJson.estudiantes[i].materia;
          nota.value = objetoJson.estudiantes[i].nota;
          observaciones.value = objetoJson.estudiantes[i].observaciones;
          opcionGuardar.value = "2";
          window.scrollTo(0, 0);
          break;
        }
    }
  }
}

function eliminar(codigo){
  var cantidadEstudiantes = obtenerCookie("cantidadEstudiantes");
  if (cantidadEstudiantes != "" && cantidadEstudiantes != "0"){
    var respuesta= confirm("¿Desea eliminar el registro seleccionado?");
    if (respuesta){
      var estudiantes = obtenerCookie("estudiantes")+"]}";
      var objetoJson = JSON.parse(estudiantes);

      for (var i=0;i<objetoJson.estudiantes.length;i++){
          if(objetoJson.estudiantes[i].codigo == codigo){
              objetoJson.estudiantes.splice(i,i);
            break;
          }
      }

      estudiantes = JSON.stringify(objetoJson);
      estudiantes = estudiantes.replace("]}","");
      agregarCookie("estudiantes",estudiantes,30);
      limpiarCampos();
      listarEstudiantes();

    }
  }
}

function cargarPagina(){
  var cantidadEstudiantes = obtenerCookie("cantidadEstudiantes");
  if (cantidadEstudiantes == "" || cantidadEstudiantes == "0"){
    agregarCookie("estudiantes",'{"estudiantes":[',30);
    agregarCookie("cantidadEstudiantes","0",30);
  }else{
    listarEstudiantes();
  }

  var btnGuardar        = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click",function(){guardar();});

  var btnNuevo        = document.getElementById("btnNuevo");
  btnNuevo.addEventListener("click",limpiarCampos);

}

function guardar(){
  var opcionGuardar = document.getElementById("opcionGuardar");
  if(opcionGuardar.value == "1"){
    adicionarEstudiante();
  }else{
    modificar();
  }
  listarEstudiantes();
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
  estudiantes +='{"codigo":"'+codigo.value.trim()+'",'+
                '"nombre":"'+nombre.value.trim()+'",'+
                '"materia":"'+materia.value.trim()+'",'+
                '"nota":'+nota.value.trim()+','+
                '"observaciones":"'+observaciones.value.trim()+'"}';
  agregarCookie("estudiantes",estudiantes,30);
  alert("Nota del estudiante registrada con éxito.");
  limpiarCampos();
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
