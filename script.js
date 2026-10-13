"use strict";
const barraPesquisa = document.querySelector('#barra-pesquisa');
const urlPosterFixo = "https://image.tmdb.org/t/p/w342";
const listaFilmes = document.querySelector('#lista-filmes');
const semFilme = document.querySelector('#sem-filme');
let timer;


barraPesquisa.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
        buscarFilmes(barraPesquisa.value);
    }, 300);



});


async function buscarFilmes(textoRecebido) {

    if (textoRecebido.trim() === "") {
        listaFilmes.innerHTML = "";
        semFilme.style.display = "none";
        return;
    }

    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + chaveAPI + "&query=" + encodeURIComponent(textoRecebido) + "&language=pt-BR";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(resposta.status);
        }

        const dados = await resposta.json();
        listaFilmes.innerHTML = "";

        if (dados.results.length === 0) {
            semFilme.style.display = "block";
        } else {
            semFilme.style.display = "none";
        }
        mostrarFilmes(dados.results);
    }

    catch (erro) {
        console.error(erro);
    }
}

function mostrarFilmes(filmesRecebidos) {

    filmesRecebidos.forEach(function (filme) {
        const semPoster = document.createElement("span");
        const novoNaLista = document.createElement("li");
        const posterFilme = document.createElement("img");
        const nomeFilme = document.createElement("span");
        const notaFilme = document.createElement("span");




        if (filme.poster_path === null) {
            semPoster.textContent = "Titulo não tem um poster";
            novoNaLista.append(semPoster);
        } else {
            posterFilme.src = urlPosterFixo + filme.poster_path;
            novoNaLista.append(posterFilme);
        }

        posterFilme.className = "classe-poster";
        nomeFilme.className = "classe-nome";
        notaFilme.className = "classe-nota";
        novoNaLista.className = "item-lista";


        nomeFilme.textContent = filme.title;
        notaFilme.textContent = filme.vote_average;
        novoNaLista.append(nomeFilme, notaFilme);
        listaFilmes.append(novoNaLista);

    });
}