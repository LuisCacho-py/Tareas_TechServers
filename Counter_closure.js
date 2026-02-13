
///COUNTER CLOSURE

const crearContador = () => {
    let contador= 0;

    function incrementar() {
        contador++;
        return contador;
    }

    function disminuir() {
        contador--;
        return contador;
    }

    function reset() {
        contador = 0;
        return contador;
    }

    return {
        incrementar,
        disminuir,
        reset
    }
}

const contador = crearContador();
console.log(contador.incrementar());
console.log(contador.incrementar());  
console.log(contador.incrementar());
console.log(contador.disminuir());
console.log(contador.reset());

console.log(contador.contador); // No se puede acceder a la variable contador directamente, es privada dentro del closure.

