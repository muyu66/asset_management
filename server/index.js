import Koa from 'koa';
import Request from 'request';
import Schedule from 'node-schedule';

const App = Koa();

App.use(function *() {

});

// 当前日
// http://fundgz.1234567.com.cn/js/420003.js

// 详细
// http://fund.eastmoney.com/pingzhongdata/420003.js?v=20170211140710

let rule = new Schedule.RecurrenceRule();
rule.second = 4;

Schedule.scheduleJob('* * * * *', function () {
    console.log("执行任务");
    getData();
});

function getData() {
    let url = 'http://nufm3.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=0000011,3990012&sty=E1OQ&st=z&sr=&p=&ps=&cb=&js=getDapan({quotation:[%28x%29]})&token=8a36403b92724d5d1dd36dc40534aec5&1456378242846';
    Request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            eval(body);
        }
    })
}

function getDapan(datas) {
    datas.quotation.forEach(function (data) {
        let array = data.split(",");
        console.log(array[1], array[2]);
    })
}

App.listen(8081);