<html>
    <h3>ALGORITMA SOAL 4</h3>
    <form action="" method="post">
        <p>*Gunakan tanda (,) sbg pemisah , CONTOH FORMAT (1,2,3)</p>
         1 : <input type="text" name="input1"><br>
         2 : <input type="text" name="input2"><br>
         3 : <input type="text" name="input3"><br><br>
        <button>SUBMIT</button>
    </form>
</html>

<?php
    
    if (count($_POST) >= 1) {
        $input1 = $_POST['input1'];
        $input2 = $_POST['input2'];
        $input3 = $_POST['input3'];
    
        if ($input1 && $input2 && $input3) {
            if (count(explode(',',$input1)) < 3) {
                echo "PASTIKAN INPUTAN ADALAH ARRAY DENGAN LENGHT 3";
                return false ;
            }
            if (count(explode(',',$input2)) < 3) {
                echo "PASTIKAN INPUTAN ADALAH ARRAY DENGAN LENGHT 3";
                return false ;
            }
            if (count(explode(',',$input3)) < 3) {
                echo "PASTIKAN INPUTAN ADALAH ARRAY DENGAN LENGHT 3";
                return false ;
            }
            
            $matrix = array(
                explode(',',$input1),
                explode(',',$input2),
                explode(',',$input3),
            );
    
            
            $diag1 = 0;
            $diag2 = 0;
            $strdiag1 = '';
            $strdiag2 = '';
    
            $n = 0 ;
            $ns= 0 ;
            for ($i=0; $i < count($matrix); $i++) { 
                // print_r($matrix[$n++][$i]);
                $diag1 += $matrix[$n++][$i];
                $strdiag1 .= $matrix[$ns++][$i];
                // print_r($matrix[count($matrix)-$n][$i]);
                $diag2 += $matrix[count($matrix)-$n][$i] ;
                $strdiag2 .= $matrix[count($matrix)-$ns][$i] ;
            }
            echo 'Diagonal pertama '. implode("+ ",str_split($strdiag1)) . ' = '.$diag1 ;
            echo '<br>Diagonal Kedua '.implode("+ ",str_split($strdiag2)) . ' = '.$diag2 ;
            echo '<br><br>Maka hasilnya adalah '.$diag1.'-'.$diag2.' = '.$diag1 - $diag2  ;
        }
    }
?>