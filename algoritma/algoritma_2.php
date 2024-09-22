<html>
    <h3>ALGORITMA SOAL 2</h3>
    <form action="" method="post">
        KALIMAT : <br><textarea name="input"> </textarea>
        <br>
        <br>
        <button>SUBMIT</button>
    </form>
</html>
<?php
    if (count($_POST) >= 1) {
        $input = $_POST['input'] ;

        $array  = explode(" ",$input) ;
        $islong  = 0;
        $issubj  = '';
        foreach ($array as $key => $value) {
            $strlen = strlen($value) ;
            if($islong <= $strlen ){
                $islong = $strlen ;
                $issubj = $value ;
            }
        } 
        echo $input ."<br><br>";
        echo $issubj.' = '.$islong ; 
    }
?>