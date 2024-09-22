<html>
    <h3>ALGORITMA SOAL </h3>
    <form action="" method="post">
        <p>*Gunakan tanda (,) sbg pemisah , CONTOH FORMAT (aa,bb,cc,asdsd,dst)</p>
         INPUT : <input type="text" name="input"><br>
         QUERY : <input type="text" name="query"><br><br>
        <button>SUBMIT</button>
    </form>
</html>

<?php
    if (count($_POST) >= 1) {
        $input  = $_POST['input'];
        $query  = $_POST['query'];
        if ($input && $query) {
            $input = explode(',',$input) ;
            $query = explode(',',$query) ;
            if (count($input) < 1) {
                echo "PASTIKAN INPUTAN ADALAH ARRAY DENGAN LENGHT 1";
                return false ;
            }
            if (count($query) < 1) {
                echo "PASTIKAN QUERY ADALAH ARRAY DENGAN LENGHT 1";
                return false ;
            }
            
            $hasil  = '';
            $hasil1 = '';
            for ($i=0; $i < count($query); $i++) { 
                $count = count( array_keys( $input, $query[$i] )).' ' ;
                $hasil .= $count ;
                if($count >= 1){
                    $hasil1 .= " kata <b>'$query[$i]'</b> terdapat <b>$count</b> pada INPUT," ;
                }else{
                    $hasil1 .= " kata <b>'$query[$i]'</b> tidak terdapat pada INPUT," ;
                }
                // print_r(array_keys( $input, $query[$i] ));
            }
            echo '<br>INPUT : ['.implode(',',$input).']';
            echo '<br>QUERY : ['.implode(',',$query).']';
            echo '<br><br>';
            echo 'OUTPUT : ['.implode(',',explode(' ',trim($hasil))).']<br>';
            echo '  Karena'.substr($hasil1,0, -1);
            
        }
    }
?>