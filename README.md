# vue-CelestialSphere

Recursion Vueコースの課題です。
海上保安庁海洋情報部のコンピュータによる天体の位置計算式を参照し、指定の日時（世界標準時）における地球からの太陽の位置を計算します。

- 指定出来る日時は 2021 年 1 月 1 日 〜 2021 年 12 月 31 日で、その範囲の日付と時刻（秒は除く）を input 要素から入力できるようにします（秒は切り捨て）
- その指定した日時から、地球を中心とした天球（celestial sphere）から見える太陽の位置座標を算出するライブラリを import して、算出した位置を画面上に出力します。
