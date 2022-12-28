# vue-CelestialSphere

Recursion Vueコースの課題です。

指定の日時（世界標準時）から地球からの太陽の位置を計算してみます。指定出来る日時は 2021 年 1 月 1 日 〜 2021 年 12 月 31 日で、その範囲の日付と時刻（秒は除く）を input 要素から入力できるようにします（今回の計算では秒は切り落として計算します）


今回はその指定した日時から、地球を中心とした天球（celestial sphere）から見える太陽の位置座標を算出するライブラリを import して、算出した位置を画面上に出力します。計算方法は理解していなくても全く問題ありません。


今回の計算では以下の参考資料に沿って計算しています。このプロジェクトでは計算は省略していますが、以下の計算式に基づいて自力でその計算を実装することも可能です。


（参考）海上保安庁海洋情報部のコンピュータによる天体の位置計算式
