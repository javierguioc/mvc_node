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
            <FORM name="login" action="pagina04.php" method="POST" target="resultado">
                <TABLE border="1">
                    <TR><TD>
                            <TABLE>
                                <TR>
                                    <TD align="right">ID:</TD><TD align="left"><INPUT type="text" value="<?php echo $_REQUEST["per_id"]; ?>" name="per_id" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Nombre:</TD><TD align="left"><INPUT type="text" value="" name="per_nombre" size="8" maxlength="10" ></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Apellido:</TD><TD align="left"><INPUT type="text" value="" name="per_apellido" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Fecha Nacimiento:</TD><TD align="left"><INPUT type="date" value="" name="per_fecha_nacimiento" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Direccion:</TD><TD align="left"><INPUT type="text" value="" name="per_direccion" size="25"></TD>
                                </TR>
                                <TR>
                                    <TD align="right">Correo:</TD><TD align="left"><INPUT type="text" value="" name="per_correo" size="25"></TD>
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
    $query = "insert into persona values ('{$_REQUEST["per_id"]}','{$_REQUEST["per_nombre"]}','{$_REQUEST["per_apellido"]}','{$_REQUEST["per_fecha_nacimiento"]}','{$_REQUEST["per_direccion"]}','{$_REQUEST["per_correo"]}')";
    $result = pg_query($cnx, $query);
    if (!$result) {
        printf("ERROR");
        exit;
    }
    echo "<script>window.location='pagina03.php?btnAction=Nuevo&per_id={$_REQUEST["per_id"]}';</script>";
}
?>
