// 海上保安庁海洋情報部の資料（PDF：令和3年度 コンピュータ用天体位置計算式）より太陽の位置を求めるための、JavaScriptのライブラリを用意しました。
// 数学的にどのような計算が行われているかは全く理解する必要はありません。
// ライブラリから値を取得し、Vue.jsを使ってHTMLにレンダリングしてください。

const CelestialSphere = {
    // 太陽の視赤経 R.A
    RALISTCONST : {
        //1月0日～5月1日a=  0,b=121  
        0: [
            22.730213,
            3.893954,
            -0.102067,
            0.035185,
            0.006479,
            -0.002315,
            0.000095,
            -0.000018,
            -0.000004,
            -0.00002,
            0.000028,
            0.000062,
            -0.000032,
            -0.000032,
            0.000015,
            0.00001,
            -0.000005,
            -0.000002,
        ],
        //  4月30日－ 9月 1日 a=120,b=244 
        1: [
            6.63306,
            4.135058,
            -0.042582,
            -0.040536,
            0.005404,
            0.003207,
            -0.000451,
            -0.000179,
            0.000073,
            0.000008,
            0.000045,
            0.00002,
            -0.000064,
            -0.000014,
            0.000033,
            0.000004,
            -0.000009,
            -0.000003,
        ],
        //  8月31日－12月32日 a=243,b=366
        2: [
            14.559458,
            4.054623,
            0.151815,
            0.012673,
            -0.013622,
            -0.002093,
            0.000279,
            0.00021,
            0.000057,
            0.000005,
            0.000037,
            -0.000041,
            -0.000047,
            0.000028,
            0.000023,
            -0.000009,
            -0.000006,
            0.000001,
        ]
    },
    // 太陽の視赤緯（Ｄｅｃ．）
    DECLISTCONST : {
        0: [
            -5.71036,
            20.05506,
            1.7011,
            -0.98513,
            0.01305,
            0.0076,
            -0.0037,
            0.00042,
            -0.00001,
            -0.00008,
            0.00016,
            0.00034,
            -0.00006,
            -0.00026,
            0.00001,
            0.00012,
            0.0,
            -0.00002,
        ],
        1: [
            17.15477,
            -3.45722,
            -5.78523,
            0.21847,
            0.15961,
            -0.01074,
            -0.00461,
            0.00075,
            0.00032,
            -0.00031,
            -0.00009,
            0.00002,
            -0.00005,
            0.00012,
            0.00006,
            -0.00008,
            -0.00001,
            0.00004,
        ],
        2: [
            -10.70088,
            -16.77753,
            3.54197,
            0.9723,
            -0.02761,
            -0.02369,
            -0.00513,
            0.00004,
            0.00023,
            0.00016,
            -0.00024,
            0.00017,
            0.00029,
            -0.0002,
            -0.00015,
            0.0001,
            0.00003,
            -0.00004,
        ],
    },
    // 地心距離（Ｄｉｓｔ
    DISTLISTCONST : {
        0: [
            0.993203,
            0.012743,
            0.002245,
            -0.000649,
            -0.000061,
            0.000014,
            -0.000007,
            0.000008,
            0.000006,
            0.000003,
            0.000013,
            -0.000009,
            -0.000013,
            0.000006,
            0.000006,
            -0.000002,
            -0.000002,
            0.0,
        ],
        1: [
            1.012374,
            0.001044,
            -0.004205,
            -0.000044,
            0.000091,
            0.00001,
            -0.000002,
            0.000014,
            0.000003,
            0.000001,
            0.000004,
            -0.000017,
            -0.000005,
            0.000012,
            0.000002,
            -0.000005,
            0.0,
            0.000001,
        ],
        2: [
            0.994618,
            -0.013796,
            0.001848,
            0.000717,
            -0.00003,
            -0.000005,
            0.000004,
            0.000012,
            -0.000005,
            0.000003,
            -0.000009,
            -0.000014,
            0.000011,
            0.00001,
            -0.000005,
            -0.000003,
            0.000001,
            0.000001,
        ]
    },

    DATETIMESTRING : "2021-05-04T06:24",

    DOT : (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n),

    dateString : () => {
        // DATETIMESTRINGからTより前（日付）を取得
        return CelestialSphere.DATETIMESTRING.split("T")[0];
    },

    timeString : () => {
        // DATETIMESTRINGからTより後（時間）を取得
        return CelestialSphere.DATETIMESTRING.split("T")[1];
    },

    yearNumber : () => {
        // "2021-05-04"を - で区切って配列にする 年を取得
        return Number(CelestialSphere.dateString().split("-")[0]);
    },

    monthNumber : () => {
        // "2021-05-04"を - で区切って配列にする 月を取得
        return Number(CelestialSphere.dateString().split("-")[1]);
    },

    dayNumber : () => {
        // "2021-05-04"を - で区切って配列にする 日を取得
      return Number(CelestialSphere.dateString().split("-")[2]);
    },

    hourNumber : () => {
        // "06:24"を : で区切って配列に 時間を取得
        return Number(CelestialSphere.timeString().split(":")[0]);
    },

    minuteNumber : () => {
        // "06:24"を : で区切って配列に 分を取得
        return Number(CelestialSphere.timeString().split(":")[1]);
    },

    capitalP : () => {
        // コンピュータ用天体位置計算式のPを求める計算式
        return Number(CelestialSphere.monthNumber() - 1);
    },

    capitalQ : () => {
        // コンピュータ用天体位置計算式のQを求める計算式
        return Math.floor((CelestialSphere.monthNumber() + 7) / 10);
    },

    capitalY : () => {
        // コンピュータ用天体位置計算式のYを求める計算式
        return Math.floor(
            Number("0." + String(CelestialSphere.yearNumber() / 4).split(".")[1]) + 0.77
        );
    },

    capitalS : () => {
        // コンピュータ用天体位置計算式のSを求める計算式
        return Math.floor(CelestialSphere.capitalP() * 0.55 - 0.33);
    },

    capitalT : () => {
        // コンピュータ用天体位置計算式のTを求める計算式
        return (
            30 * CelestialSphere.capitalP() +
            CelestialSphere.capitalQ() * (CelestialSphere.capitalS() - CelestialSphere.capitalY()) +
            CelestialSphere.capitalP() * (1 - CelestialSphere.capitalQ()) +
            CelestialSphere.dayNumber()
        );
    },

    capitalF : () => {
        // コンピュータ用天体位置計算式のFを求める計算式
        return CelestialSphere.hourNumber() / 24 + CelestialSphere.minuteNumber() / 1440;
    },

    deltaT : () => {
        // コンピュータ用天体位置計算式のΔTを求める計算式 2021年は70秒
        return 70;
    },

    termDays : () => {
        // 2021年1月1日のDateインスタンス
        let date1 = new Date(2021, 1, 1);
        // 入力された日のDateインスタンス
        let thisDay = new Date(CelestialSphere.yearNumber(), CelestialSphere.monthNumber(), CelestialSphere.dayNumber());
        // 入力日のミリ秒から1月1日のミリ秒を引く 何日あるか計算するため
        // T = 30 × P ＋ Q(S－Y) ＋ P（1 － Q） ＋ 日 と同じ
        return (thisDay - date1) / 86400000 + 1;
    },

    t : () => {
        // コンピュータ用天体位置計算式の時刻引数tを求める計算式 
        return CelestialSphere.capitalT() + CelestialSphere.capitalF() + CelestialSphere.deltaT() / 86400;
    },

    betweenAandBType : () => {
        // ライブラリの何番目のリストを使うのかを求める a<=t<=bに合う所
        if (1 <= CelestialSphere.t() && CelestialSphere.t() <= 121) return 0;
        else if (120 <= CelestialSphere.t() && CelestialSphere.t() <= 244) return 1;
        else return 2;
    },

    a : () => {
        // tによって当てはまる a を決める
        const aList = { 0: 1, 1: 120, 2: 243 };
        return aList[CelestialSphere.betweenAandBType()];
    },

    b : () => {
        // tによって当てはまる b を決める
      const bList = { 0: 121, 1: 244, 2: 366 };
      return bList[CelestialSphere.betweenAandBType()];
    },

    theta : () => {
        // a と b と t からθを計算する
      const temp = (2 * CelestialSphere.t() - (CelestialSphere.a() + CelestialSphere.b())) / (CelestialSphere.b() - CelestialSphere.a());
      return Math.acos(temp);
    },

    cosList : () => {
        // 18個の要素 を持つリスト
        return [...Array(18)].map((_, i) => Math.cos(i * CelestialSphere.theta()));
    },

    raList : () => {
        // a, b, t に該当する視赤経のリスト
        return CelestialSphere.RALISTCONST[CelestialSphere.betweenAandBType()];
    },

    decList : () => {
        // a, b, t に該当する視赤緯のリスト
        return CelestialSphere.DECLISTCONST[CelestialSphere.betweenAandBType()];
    },

    distList : () => {
        // a, b, t に該当する地心距離のリスト
        return CelestialSphere.DISTLISTCONST[CelestialSphere.betweenAandBType()];
    },

    rightAscension : () => {
        // 視赤経
        let tempRightAscension = CelestialSphere.DOT(CelestialSphere.raList(), CelestialSphere.cosList());
        // Rが0以下あるいは24以上になった時の処理
        while (tempRightAscension < 0 || tempRightAscension > 24) {
            let adjust = tempRightAscension < 0 ? 24 : -24;
            tempRightAscension += adjust;
        }
        return tempRightAscension;
    },

    declination: () => {
        // 視赤緯
        return CelestialSphere.DOT(CelestialSphere.decList(), CelestialSphere.cosList());
    },
   
    distance : () => {
        // 地心距離
        return CelestialSphere.DOT(CelestialSphere.distList(), CelestialSphere.cosList());
    },
}

console.log(CelestialSphere.DATETIMESTRING);
console.log(CelestialSphere.distance());

var app = new Vue({
    el: '#app',
    data() {
        return {
            datetimeString: "2021-05-04T06:24",
            celestialSphere: CelestialSphere,
        };
    },
    computed: {
        dateString() {
            return this.datetimeString.split("T")[0];
        },
  
        // CelestialSphereライブラリを使って a, b, termDays, P, Q, Y, S, T, t, theta, conList, rightAscension, declination, distanceの値を取得し、それぞれ定義しましょう。
        setDateString() {
            // ライブラリの日時を入力された日時に更新
            this.celestialSphere.DATETIMESTRING = this.datetimeString;
            return this.celestialSphere.DATETIMESTRING;
        },
        getCelestialSphere() {

            return f => this.celestialSphere[f]();
        },

  
    },
  })