<h2>Roles:</h2>
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

    $sql = "SELECT * FROM rol ";
    $rs = pg_query($cnx, $sql);
    $consult = pg_fetch_array($rs);
    $result = pg_query($sql) or die('Query failed: ' . pg_last_error());
    $rows = pg_numrows($result);
    ?>

    <form method="POST" action="index.php">
        <table border="5" width="200">

            <?php
            while ($consult = pg_fetch_array($result)) {
                $a = $consult['rol_id'];
                echo '<tr><td><center> <input type="radio" name="rol_id" value="' . $a . '"></td>';
                echo '<td>' . strtoupper($consult['rol_nombre']) . '</center></td></tr>';
            }
            ?>
        </table><br>
        <input type="submit" value="Eliminar" name="btnAction" />
        <input type="submit" value="Actualizar" name="btnAction" formaction="pagina02.php"/>
        <input type="submit" value="Nuevo" name="btnAction" formaction="pagina03.php"/>
        <input type="submit" value="Permiso" name="btnAction" formaction="pagina04.php"/>
        <p id="demo"></p>
    </form>
    <?php
} else {
    //echo $_REQUEST["id"];
    $query = "DELETE FROM rol where rol_id='{$_REQUEST["rol_id"]}'";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script>window.location='index.php';</script>";
}
/* if (isset($_REQUEST['btn1'])) {
  header("location: pagina02.php?id={$_REQUEST["id"]}");
  exit;
  }
  if (isset($_REQUEST['btn2'])) {

  header("location: pagina03.php");
  exit;
  }
  if (isset($_REQUEST['btn3'])) {
  header("location: pagina04.php?id={$_REQUEST["id"]}");
  exit;
  } */
?>