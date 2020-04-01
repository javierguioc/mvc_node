<?php
$puser = 'postgres';
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
    $query = "SELECT * FROM persona where per_id='{$_REQUEST["per_id"]}'";
    $result = pg_query($cnx, $query);
    $consult = pg_fetch_array($result);
    ?>
    <HTML>
        <BODY>          
            <H2>Rigistro en sistema</H2>
            <FORM name="login" action="pagina03.php" method="POST" target="resultado">
                <TABLE border="1">
                    <TR><TD>
                            <TABLE>
                                <TR>
                                    <TD align="right">Usuario:</TD><TD align="left"><INPUT type="text" value="<?php echo $consult["per_nombre"]; ?>" name="usu_login" size="25" placeholder="Usuario"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Contraseña:</TD><TD align="left"><INPUT type="password" value="" name="usu_clave" size="8" maxlength="10" placeholder="Contraseña" ></TD>
                                </TR>
                                <TR>
                                    <TD align="left"><INPUT type="hidden" name="per_id" value="<?php echo $consult["per_id"]; ?>" ></TD>
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
    $query = "insert into usuario values ('{$_REQUEST["usu_login"]}','{$_REQUEST["usu_clave"]}','{$_REQUEST["per_id"]}')";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script  >window.location='index.php';</script>";
}
?>
