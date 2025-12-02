const moveElement = (array, indiceOrigen, indiceDestino) => {
  // Validar que los índices estén dentro del rango del array
  if (
    indiceOrigen < 0 ||
    indiceOrigen >= array.length ||
    indiceDestino < 0 ||
    indiceDestino >= array.length
  ) {
    return array;
  }

  // Crear una copia del array para no modificar el original
  const nuevoArray = [...array];

  // Remover el elemento de la posición origen
  const elemento = nuevoArray.splice(indiceOrigen, 1)[0];

  // Insertar el elemento en la posición destino
  nuevoArray.splice(indiceDestino, 0, elemento);

  return nuevoArray;
};

export default moveElement;
