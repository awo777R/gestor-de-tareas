let tareas = [];

function crearTarea(){
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const fecha = document.getElementById("fecha").value;

  if(!titulo || !descripcion || !fecha){
    alert("Completa todos los datos");
    return;
  }

  const tarea = {
    id: Date.now(),
    titulo,
    descripcion,
    fecha,
    estado: "En ejecución"
  };

  tareas.push(tarea);
  renderTareas();

  document.getElementById("formTarea").reset();
}

function renderTareas(){
  const contenedor = document.getElementById("listaTareas");
  contenedor.innerHTML = "";

  tareas.forEach(t => {
    let div = document.createElement("div");
    div.className = "tarea";
    if(t.estado === "Finalizada") div.classList.add("finalizada");

    div.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descripcion}</p>
      <small>Fecha límite: ${t.fecha}</small>
      <div class="estado">Estado: ${t.estado}</div>
      <div class="acciones">
        ${t.estado === "En ejecución" ? `<button class="btn-success" onclick="finalizarTarea(${t.id})">Finalizar</button>` : ""}
        <button class="btn-danger" onclick="eliminarTarea(${t.id})">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

function finalizarTarea(id){
  let tarea = tareas.find(t => t.id === id);
  if(tarea) tarea.estado = "Finalizada";
  renderTareas();
}

function eliminarTarea(id){
  tareas = tareas.filter(t => t.id !== id);
  renderTareas();
}
