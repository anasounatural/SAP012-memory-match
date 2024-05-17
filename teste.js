function capitalize(string) {
    let primeiraLetra = string.charAt(0).toUpperCase()

       return primeiraLetra + string.substring (1,4);
}

console.log(capitalize('palavra'));