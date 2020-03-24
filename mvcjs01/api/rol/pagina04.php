<html>
    <head>
        <title>modulos Rol</title>
    </head>
    <body>
        <?php
        $rol_id = $_REQUEST["rol_id"];
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
            $query = "select * from rol as ro where ro.rol_id='{$rol_id}' ";
            $result = pg_query($cnx, $query);
            $consult = pg_fetch_array($result);
            ?>
            <h3> Codigo: <?php echo $consult['rol_id']; ?>&nbsp;&nbsp;&nbsp;&nbsp;
                Nombre: <?php echo $consult['rol_nombre']; ?>&nbsp;&nbsp;&nbsp;&nbsp;
                Descripcion: <?php echo $consult['rol_descripcion']; ?>
            </h3>
            <?php
        } catch (Exception $e) {
            echo $e;
        }
        $boton = @$_REQUEST['btnAction'];
        if ($boton == 'Quitar') {
            $elim = "delete from rolxfuncionalidad where rol_id='{$consult["rol_id"]}' "
                    . "and fun_id='{$_REQUEST["sel_izq"]}' ";
            $result6 = pg_query($cnx, $elim);
            echo "<script>window.location='pagina04.php?rol_id={$rol_id}';</script>";
        }
        if ($boton == 'Asignar') {
            $asignar = "insert into rolxfuncionalidad values ('{$consult["rol_id"]}','{$_REQUEST["sel_der"]}') ";
            $result5 = pg_query($cnx, $asignar);
            echo "<script>window.location='pagina04.php?rol_id={$rol_id}';</script>";
        }
        ?>
        <form action="pagina04.php" method="POST" name="form_permisos">
            <input type="hidden" name="rol_id" value="<?php echo $rol_id; ?>">
            <?php
            try {
                $sql1 = "select * from rolxfuncionalidad as rf, funcionalidad as fu "
                        . "where fu.fun_id=rf.fun_id and rf.rol_id='{$rol_id}' ";
                $result1 = pg_query($cnx, $sql1);

                $sql2 = "select fu.fun_id, fu.fun_nombre from funcionalidad as fu "
                        . "except "
                        . "select fu.fun_id, fu.fun_nombre from rolxfuncionalidad as rf, funcionalidad as fu "
                        . "where fu.fun_id=rf.fun_id and rf.rol_id='{$rol_id}' ";
                $result2 = pg_query($cnx, $sql2);
                ?>
                <table>
                    <tr>
                        <th>
                            <select name="sel_izq" size="4">
                                <?php
                                while ($column = pg_fetch_array($result1)) {
                                    ?>
                                    <option value="<?php echo $column['fun_id']; ?>"><?php echo $column['fun_nombre']; ?></option>
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
                                    <option value="<?php echo $column['fun_id']; ?>"><?php echo $column['fun_nombre']; ?></option>
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
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            <input type="submit" value="Volver" name="btnAction" formaction="../rol/index.php" />
        </form>
    </body>
</html>
