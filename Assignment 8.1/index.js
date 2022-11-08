/*
Time complexity of this code,
Best case = O(n);
Worst case = O(n^2);

space complexity of this code is O(n)
*/
let finalResult = [];

const checkPrime = (number) => {
    let startTime = Date.now();
    let count = 0;
    let time;
    let data;
    if (number == 1 || number == 0) {
        time = Date.now() - startTime;
        data = {
            number: number,
            time: time,
            result: "Not Prime"
        }
        return data;
    }
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            count++;
        }
        if (count >= 1) {
            time = Date.now() - startTime;
            data = {
                number: number,
                time: time,
                result: "Not Prime"
            }
            return data;
        }
    }
    time = Date.now() - startTime;
    //console.log('time:', Date.now())
    data = {
        number: number,
        time: time,
        result: "Prime"
    }
    return data;
}

const getPrimesInRange = () => {
    let startTime = Date.now();
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    if (+start > +end) {
        let totalTime = document.getElementById("totalTime")
        totalTime.innerHTML = '';
        let avgTimeForAll = document.getElementById("avgTimeForAll")
        avgTimeForAll.innerHTML = '';
        let avgTimeForPrime = document.getElementById("avgTimeForPrime")
        avgTimeForPrime.innerHTML = '';
        finalResult = [];
        alert("Please enter valid range!!");
        return;
    }

    finalResult = [];
    for (let i = start; i <= end; i++) {
        finalResult.push(checkPrime(i));
    }
    console.log("finalResult:", finalResult);

    time = Date.now() - startTime;
    let totalTime = document.getElementById("totalTime")
    totalTime.innerHTML = '';
    totalTime.append(`Total Time: ${time} ms`)

    let total = 0;
    let primeTotal = 0;
    let primeCount = 0;
    for (let i = 0; i < finalResult.length; i++) {
        total += +finalResult[i].time
        if (finalResult[i].result === "Prime") {
            primeTotal += finalResult[i].time;
            primeCount++;
        }
    }

    let avg = total / finalResult.length;
    avg = avg.toFixed(3);
    let avgTimeForAll = document.getElementById("avgTimeForAll")
    avgTimeForAll.innerHTML = '';
    avgTimeForAll.append(`Average Time of all numbers in the range: ${avg} ms`);

    let avgPrime
    if (primeCount === 0) {
        avgPrime = 0;
    }
    else {
        avgPrime = primeTotal / primeCount;
        avgPrime = avgPrime;
    }

    let avgTimeForPrime = document.getElementById("avgTimeForPrime")
    avgTimeForPrime.innerHTML = '';
    avgTimeForPrime.append(`Average Time of Prime numbers in the range: ${avgPrime} ms`);

}

let modal = document.getElementById("myModal");
let btn = document.getElementById("details");
let span = document.querySelector(".close");

// When the user clicks the details button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";

    let tableForAll = document.querySelector("#tbodyForAll");
    tableForAll.innerHTML = "";

    let tableForPrime = document.querySelector("#tbodyForPrime");
    tableForPrime.innerHTML = "";

    finalResult.map((e) => {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let p1 = document.createElement("p");
        p1.innerText = e.number;
        td1.append(p1);

        let td2 = document.createElement("td");
        let p2 = document.createElement("p");
        p2.innerText = e.result;
        td2.append(p2);

        let td3 = document.createElement("td");
        let p3 = document.createElement("p");
        p3.innerText = e.time;
        td3.append(p3);

        tr.append(td1, td2, td3)

        tableForAll.append(tr);

        if (e.result === "Prime") {
            let trPrime = document.createElement("tr");

            let td4 = document.createElement("td");
            let p4 = document.createElement("p");
            p4.innerText = e.number;
            td4.append(p4);

            let td5 = document.createElement("td");
            let p5 = document.createElement("p");
            p5.innerText = e.time;
            td5.append(p5);

            trPrime.append(td4, td5)

            tableForPrime.append(trPrime);
        }
    })
}
// When the user clicks (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
