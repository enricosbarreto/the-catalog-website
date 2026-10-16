"use strict";

const idNaUrl = new URLSearchParams(window.location.search);
const idDoFilme = idNaUrl.get("id");
const semId = document.querySelector("#sem-id");

const tituloFilme = document.querySelector("#titulo");
const descricaoFilme = document.querySelector("#descricao-filme");
const notaFilme = document.querySelector("#nota-filme");
const urlPosterFixo = "https://image.tmdb.org/t/p/w342";
const posterFilme = document.querySelector("#poster-filme");
const dataLancamento = document.querySelector("#data-lancamento");
const duracaoFilme = document.querySelector("#duracao");
const generosFilme = document.querySelector("#genero-filme");


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
        mostrarDetalhes(dados);
        console.log(dados)
    }
    catch (erro) {
        console.error(erro);
        semId.style.display = "block";
    }
}

function mostrarDetalhes(filme) {
    
    tituloFilme.textContent = filme.title;
    descricaoFilme.textContent = filme.overview;
    notaFilme.textContent = "Nota: ⭐" + filme.vote_average.toFixed(1);
    posterFilme.src = urlPosterFixo + filme.poster_path;
    dataLancamento.textContent = "Data de lançamento: " + filme.release_date;
    duracaoFilme.textContent = "Duração do filme: " + filme.runtime + " min";
    generosFilme.textContent = filme.genres.map((filme) => filme.name).join(", ");


}