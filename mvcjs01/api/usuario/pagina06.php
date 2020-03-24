<html>
    <head>
        <title>Roles Usuario</title>
    </head>
    <body>
        <?php
        $per_id = $_REQUEST["per_id"];
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
        try {
            $query = "select * from persona as pe, usuario as us where us.per_id=pe.per_id and pe.per_id='{$per_id}' ";

            $result = pg_query($cnx, $query);
            $consult = pg_fetch_array($result);
            ?>
            <h3> Codigo: <?php echo $consult['per_id']; ?>&nbsp;&nbsp;&nbsp;&nbsp;
                Nombre: <?php echo $consult['per_nombre']; ?>&nbsp;&nbsp;&nbsp;&nbsp;
                Apellido: <?php echo $consult['per_apellido']; ?>
            </h3>
            <?php
        } catch (Exception $e) {
            echo $e;
        }
        $boton = @$_REQUEST['btnAction'];
        if ($boton == 'Quitar') {
            $elim = "delete from usuarioxrol where usu_login='{$consult["usu_login"]}' "
                    . "and rol_id='{$_REQUEST["sel_izq"]}' ";
            $result6 = pg_query($cnx, $elim);
            echo "<script>window.location='pagina06.php?per_id={$per_id}';</script>";
        }
        if ($boton == 'Asignar') {
            $asignar = "insert into usuarioxrol values ('{$_REQUEST["sel_der"]}','{$consult["usu_login"]}') ";
            $result5 = pg_query($cnx, $asignar);
            echo "<script>window.location='pagina06.php?per_id={$per_id}';</script>";
        }
        ?>
        <form action="pagina06.php" method="POST" name="form_permisos">
            <input type="hidden" name="per_id" value="<?php echo $per_id; ?>">
            <?php
            try {
                $sql1 = "select * from usuarioxrol as ur, rol as ro, usuario as us where ro.rol_id=ur.rol_id "
                        . "and ur.usu_login=us.usu_login and us.per_id='{$per_id}' ";
                $result1 = pg_query($cnx, $sql1);

                $sql2 = "select ro.rol_id,ro.rol_nombre from rol as ro "
                        . "except "
                        . "select ro.rol_id,ro.rol_nombre from usuarioxrol as ur, rol as ro, usuario as us "
                        . "where ro.rol_id=ur.rol_id and us.usu_login=ur.usu_login and us.per_id='{$per_id}' ";
                $result2 = pg_query($cnx, $sql2);
                ?>
                <table>
                    <tr>
                        <th>
                            <select name="sel_izq" size="4">
                                <?php
                                while ($column = pg_fetch_array($result1)) {
                                    ?>
                                    <option value="<?php echo $column['rol_id']; ?>"><?php echo $column['rol_nombre']; ?></option>
                                    <?php
                                }
                                ?>
                            </select>
                        </th>
                        <th>
                            <div>

                                <input type="submit" name="btnAction" value="Asignar">
                            </div>
                            <br>
                            <div>
                                <input type="submit" name="btnAction" value="Quitar">
                            </div>
                        </th>
                        <th>
                            <select name="sel_der" size="4">
                                <?php
                                while ($column = pg_fetch_array($result2)) {
                                    ?>
                                    <option value="<?php echo $column['rol_id']; ?>"><?php echo $column['rol_nombre']; ?></option>
                                    <?php
                                }
                                ?>
                            </select>
                        </th>
                    </tr>
                </table>
                <?php
            } catch (Exception $e) {
                out . print($e);
            }
            ?>
        </form>
    </body>
</html>
