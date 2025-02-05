<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mariabonitadb";
$conn = new mysqli($servername, $username, $password, $dbname);

date_default_timezone_set('America/Sao_Paulo');

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $cart = isset($_POST["cart"]) ? json_decode($_POST["cart"], true) : [];

    foreach($cart as $product => $details){
        $nome = $product;
        $preco = $details["preco"];
        $quantidade = $details["quantidade"];
        $data = date("Y-m-d H:i:s");
        $sql = "INSERT INTO vendas (nome, preco, quantidade, data) 
                VALUES ('$nome', '$preco', '$quantidade', '$data')";
        $conn->prepare($sql)->execute();
    }
}
?>