"use strict";

const idNaUrl = new URLSearchParams(window.location.search);
const idDoFilme = idNaUrl.get("id");
const semId = document.querySelector("#sem-id");

const tituloFilme = document.querySelector("#titulo");
const descricaoFilme = document.querySelector("#descricao-filme");
const notaFIlme = document.querySelector("#nota-filme");
const urlPosterFixo = "https://image.tmdb.org/t/p/w342";
const posterFilme = document.querySelector("#poster-filme");
const dataLancamento = document.querySelector("#data-lancamento");
const duracaoFilme = document.querySelector("#duracao");


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
        console.log(dados)
        console.log(dados.vote_average)
        mostrarDetalhes(dados)
    }
    catch (erro) {
        console.error(erro);
        semId.style.display = "block";
    }
}

function mostrarDetalhes(filme) {
    
    tituloFilme.textContent = filme.title;
    descricaoFilme.textContent = filme.overview;
    notaFIlme.textContent = filme.vote_average;
    posterFilme.src = urlPosterFixo + filme.poster_path;
    dataLancamento.textContent = filme.release_date;
    duracaoFilme.textContent = filme.runtime + " min";


}