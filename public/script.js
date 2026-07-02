const modalCadastro = document.querySelector("#modalCadastro");





//Listar os produtos em forma de cards
fetch("/produtos")
.then(function(resposta){
    return resposta.json();
})

.then(function(produtos){
    const divProdutos = document.querySelector("#produtos");
    produtos.forEach(function(produto){
        divProdutos.innerHTML += `
        <div class="card">
        
        <h3>${produto.nome}</h3>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Preço:</strong> ${produto.preco}</p>
        <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
        <p><strong>Unidade:</strong> ${produto.unidade}</p>
        </div>`;
    });
})

.catch(function(){
    alert("Erro ao carregar os produtos!")
});

const btnCadastrar = document.querySelector("#btnCadastrar");

const btnCancelar = document.querySelector(".btnCancelar");

btnCadastrar.addEventListener("click",function(){
    modalCadastro.style.display = "flex";
});



const botoesCancelar = document.querySelectorAll(".btnCancelar");

botoesCancelar.forEach(function(botao){

    botao.addEventListener("click",function(){

        modalCadastro.style.display="none";    

    });

});




const btnSalvar = document.querySelector("#btnSalvar");

btnSalvar.addEventListener("click", cadastrarProduto);
function cadastrarProduto(){
    const produto = {
        nome: document.querySelector("#nome").value,
        categoria: document.querySelector("#categoria").value,
        preco: document.querySelector("#preco").value,
        quantidade: document.querySelector("#quantidade").value,
        unidade: document.querySelector("#unidade").value,
    };
    fetch("/produtos",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(produto)
    })

    .then(resposta=>resposta.json())
    .then(function(){
        alert("Produto cadastrado com Sucesso!");
        modalCadastro.style.display="none";
        location.reload();
    });
    }