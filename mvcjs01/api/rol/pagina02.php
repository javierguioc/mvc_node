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
if ($boton != 'Enviar Nuevo') {

    $query = "SELECT * FROM rol where rol_id='{$_REQUEST["rol_id"]}'";
    $result = pg_query($cnx, $query);
    $consult = pg_fetch_array($result);
    ?>
    <HTML>
        <BODY>          
            <H2>Rigistro en sistema</H2>
            <FORM name="login" action="pagina02.php" method="POST" target="resultado">
                <INPUT type="hidden" value="<?php echo $consult["rol_id"]; ?>" name="id" size="25">
                <TABLE border="1">
                    <TR><TD>
                            <TABLE>
                                <TR>
                                    <TD align="right">Id:</TD><TD align="left"><INPUT type="text" value="<?php echo $consult["rol_id"]; ?>" name="rol_id" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="<?php echo $consult["rol_nombre"]; ?>" name="rol_nombre" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text" value="<?php echo $consult["rol_descripcion"]; ?>" name="rol_descripcion" size="25"></TD>
                                </TR>
                                <TR >
                                    <TD colspan="2" align="center"><INPUT name="btnAction" type="submit" value="Enviar Nuevo">&nbsp;&nbsp;&nbsp;<INPUT type="reset" value="Borrar"></TD>
                                </TR>
                            </TABLE>
                        </TD></TR>
                </TABLE>

            </FORM>
        </BODY>
    </HTML>
    <?php
    exit;
} else {
    $query = "UPDATE rol SET rol_id='{$_REQUEST["rol_id"]}', rol_nombre='{$_REQUEST["rol_nombre"]}', rol_descripcion='{$_REQUEST["rol_descripcion"]}' where rol_id='{$_REQUEST["id"]}'";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script>window.location='index.php';</script>";
}
?>
