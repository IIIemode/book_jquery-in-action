function showPrototypeChain(obj) {
    console.log(obj.__proto__);

    if (obj.__proto__ !== null) {
        showPrototypeChain(obj.__proto__);
    }
}
