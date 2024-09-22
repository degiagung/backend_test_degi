<html>
    <h3>ALGORITMA SOAL 1</h3>
</html>
<?php
        $negie1 = "NEGIE1" ;
        $one    = preg_replace('/[^0-9.]/','',$negie1) ;
        // CARA SIMPLE FUNGSI PHP
            $geteigen = strrev(preg_replace('/\P{L}+/', '', $negie1 ));
            echo '<pre>REVERSE KALIMAT EIGEN1';
            echo '<pre>HASIL DGN FUNGSI PHP         : '.$geteigen.$one.'<br>';

        // CARA LOGIC ARRAY
            $array  = str_split($negie1) ;
            // preg_match_all('!\d+!', $str, $matches);
            $eigen  = '';
            for ($i=count($array)-2; $i >= 0  ; $i--) { 
                $eigen .= $array[$i];
            };
            $eigen1 = $eigen.$one ;
            echo 'HASIL DGN FUNGSI LOGIC ARRAY : '.$eigen1 ;
?>