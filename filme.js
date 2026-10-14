"use strict"

const idNaUrl = new URLSearchParams(window.location.search)
const idDoFilme = idNaUrl.get("id")
const semId = document.createElement("span");

semId.textContent = "Filme não possui ID"

console.log(idDoFilme)

if (idDoFilme === null) {
    console.log(semId)
}