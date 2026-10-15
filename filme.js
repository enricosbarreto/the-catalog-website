"use strict";

const idNaUrl = new URLSearchParams(window.location.search);
const idDoFilme = idNaUrl.get("id");
const semId = document.querySelector("#sem-id");

buscarDetalhesFilme(idDoFilme);

async function buscarDetalhesFilme(id) {
    if (id === null || id === "") {
        semId.style.display = "block";
        return;
    }

    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + chaveAPI + "&language=pt-BR";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(resposta.status);
        }

        const dados = await resposta.json();

        console.log(dados);
    }
    catch (erro) {
        console.error(erro);
         semId.style.display = "block";
    }
}