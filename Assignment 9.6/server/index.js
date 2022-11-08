const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/', (req, res) => {
    console.log('req:', req.body)

    // {
    //     action: add || sub,
    //     type: day || week,
    //     date: today || custom,
    //     value: x
    // }

    function isLeap(y) {
        if (y % 100 != 0 && y % 4 == 0 || y % 400 == 0) {
            return true;
        }
        return false;
    }

    function remainingDays(d, m, y) {
        let remain_days = d;

        let months_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        for (let i = 0; i < m - 1; i++) {
            remain_days += months_days[i]
        }

        if (isLeap(y) && m > 2) {
            remain_days += 1;
        }
        //console.log('remain_days:', remain_days)

        return remain_days;
    }

    function getResultDate(remain_days, y) {
        let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (isLeap(y)) {
            month[2] = 29;
        }
        let m2;
        for (let i = 0; i < 12; i++) {
            if (remain_days <= month[i]) {
                m2 = i + 1;
                break;
            }

            remain_days = remain_days - month[i];
        }
        d2 = remain_days;
        return d2 + "-" + m2;
    }

    function addDays(d1, m1, y1, x) {
        let cur_days = remainingDays(d1, m1, y1);
        let remDays = isLeap(y1) ? (366 - cur_days) : (365 - cur_days);
        //console.log('remDays:', remDays)
        let y2, nextYearDays = 0;
        if (x <= remDays) {
            y2 = y1;
            nextYearDays = cur_days + x;
        }
        else {
            x = x - remDays;
            y2 = y1 + 1;
            let y2days = isLeap(y2) ? 366 : 365;

            while (x >= y2days) {
                x = x - y2days;
                y2++;
                y2days = isLeap(y2) ? 366 : 365;
            }
            nextYearDays = x;
        }

        console.log(getResultDate(nextYearDays, y2) + "-" + y2);
    }

    function subtractDays(d1, m1, y1, x) {
        let cur_days = remainingDays(d1, m1, y1);

        let y2, nextYearDays = 0;
        if (x <= cur_days) {
            y2 = y1;
            nextYearDays = cur_days - x;
        }
        else {
            x = x - cur_days;
            y2 = y1 - 1;
            let y2days = isLeap(y2) ? 366 : 365;

            while (x >= y2days) {
                x = x - y2days;
                y2--;
                y2days = isLeap(y2) ? 366 : 365;
            }
            y2--;
            y2days = isLeap(y2) ? 366 : 365;
            nextYearDays = y2days - x;
        }

        console.log(getResultDate(nextYearDays, y2) + "-" + y2);
    }
})

app.listen(8080, () => {
    console.log('server started on port 8080');
})