<?php
    include("conecta.php");

    $requisicao = $pdo->prepare("SELECT * FROM cadastro");
    $requisicao->execute();

    $dados = $requisicao->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($dados);
?>
