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
    ?>
    <HTML>
        <BODY>          
            <H2>Rigistro en sistema</H2>
            <FORM name="login" action="pagina03.php" method="POST" target="resultado">
                <TABLE border="1">
                    <TR><TD>
                            <TABLE>
                                <TR>
                                    <TD align="right">Id:</TD><TD align="left"><INPUT type="text"  name="rol_id" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text"  name="rol_nombre" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Descripcion:</TD><TD align="left"><INPUT type="text"  name="rol_descripcion" size="25"></TD>
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
    $query = "insert into rol values ('{$_REQUEST["rol_id"]}','{$_REQUEST["rol_nombre"]}','{$_REQUEST["rol_descripcion"]}')";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script>window.location='index.php';</script>";
}
?>
