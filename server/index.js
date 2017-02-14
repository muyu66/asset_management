import Koa from 'koa';
import Request from 'request';
import Schedule from 'node-schedule';
import NodeMailer from 'nodemailer';

const App = Koa();

App.use(function *() {

});

// 当前日
// http://fundgz.1234567.com.cn/js/420003.js

// 详细
// http://fund.eastmoney.com/pingzhongdata/420003.js?v=20170211140710

// 历史
// http://webstock.quote.hermes.hexun.com/a/kline?code=sse000001&start=20170210150000&number=-1000&type=5&callback=callback

let rule = new Schedule.RecurrenceRule();
rule.second = 4;

Schedule.scheduleJob('* * * * *', function () {
    console.log("执行任务");
    getData();
});

function getData() {
    let url = 'http://webstock.quote.hermes.hexun.com/a/kline?code=sse000001&start=20170210150000&number=-1000&type=5&callback=callback';
    Request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            eval(body);
        }
    })
}

function callback(datas) {
    datas.Data[0].forEach(function (data) {
        // let array = data.split(",");
        console.log(data[0] / 1000000, data[1] / 100);
        console.log('########');
        sendEmail();
    })
}

function sendEmail() {
    let transporter = NodeMailer.createTransport({
        service: '163',
        auth: {
            user: "zhouyu_66@163.com", // 账号
            pass: "chinach1C" // 密码
        }
    });

    let mailOptions = {
        from: '"Muyu" <zhouyu_66@163.com>',
        to: '460605861@qq.com',
        subject: 'Hello ✔',
        text: 'Hello world ?',
        html: '<b>huhuhuhu</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

App.listen(8081);