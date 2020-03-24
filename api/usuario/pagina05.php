<?php

$puser = 'electiva';
$psw = '12345';
$db = 'efi';
$port = 5432;
$host = 'localhost';
$strCnx = "host=$host port=$port dbname=$db user=$puser password=$psw";
$cnx = pg_connect($strCnx) or die("Error de conexion. " . pg_last_error());
if (!$cnx)
    echo "Conexion no establecida, verifique sus datos";

session_start();
$boton = @$_REQUEST['btnAction'];

if ($boton === 'Nuevo') {

    echo("<script type='text/javascript'> var answer = prompt('Identificacion'); window.location='pagina05.php?btnAction=crear&per_id='+answer; </script>");
}
if ($boton == 'crear') {
    $per_id = $_REQUEST["per_id"];
    // Checks if $answer is empty/spaces
    if (!empty($per_id)) {
        $id = $per_id;
        $query = "SELECT * FROM persona where per_id='{$id}'";
        $result = pg_query($cnx, $query);
        $consult = pg_fetch_array($result);
        if ($consult["per_id"] != null) {
            //echo $ids;
            header("location: pagina03.php?per_id={$consult["per_id"]}");
            exit;
        } else {
            echo "<script> alert('No introdujo ID Valido');window.location='pagina04.php?per_id={$per_id}';</script>";
        }
    } else {
        echo "<script> window.location='index.php';</script>";
    }
    exit;
}