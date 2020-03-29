<h2>Usuarios:</h2>
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

if ($boton != 'Eliminar') {
    $query = "SELECT * FROM usuario as us, persona as per where us.per_id=per.per_id ";
    $result = pg_query($cnx, $query);
    $consult = pg_fetch_array($result);
    ?>

    <form method="POST" action="index.php">
        <table border="5" width="200">

            <?php
            while ($column = pg_fetch_array($result)) {
                $a = $column['per_id'];
                echo '<tr><td><center> <input type="radio" name="per_id" value="' . $a . '"></td>';
                echo '<td>' . strtoupper($column['per_nombre'] . " " . $column['per_apellido']) . '</center></td></tr>';
            }
            ?> 

        </table><br>
        <input type="submit" value="Eliminar" name="btnAction" />
        <input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.php"/>
        <input type="submit" value="Nuevo" name="btnAction" formaction="pagina05.php"/> 
        <input type="submit" value="Permisos" name="btnAction" formaction="pagina06.php"/>
        <p id="demo"></p>
    </form>
    <?php
} else {
    //echo $_REQUEST["id"];
    $query = "DELETE FROM usuario where per_id='{$_REQUEST["per_id"]}'";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script  >window.location='index.php';</script>";
}
?>