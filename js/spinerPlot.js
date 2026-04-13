let myChart = null; // Инициализируем переменную для хранения графика

        function calculateGearRatioAndSpeed(J, n_m, P, t) {
            const omega_m = n_m * 2 * Math.PI / 60;
            const i = Math.sqrt(J * Math.pow(omega_m, 2) / (P * t));
            const omega_w = omega_m / i;
            const n_w = omega_w * 60 / (2 * Math.PI);
            return { i, omega_w, n_w };
        }

        function plotGraph() {
            const J = parseFloat(document.getElementById('J').value);
            const n_m = parseFloat(document.getElementById('n_m').value);
            const P = parseFloat(document.getElementById('P').value);
            const t = parseFloat(document.getElementById('t').value);

            const tRange = Array.from({ length: 50 }, (_, i) => 1 + (i * (60 - 1) / 49));
            const speedsRad = [];
            const speedsRpm = [];

            tRange.forEach(t => {
                const { omega_w, n_w } = calculateGearRatioAndSpeed(J, n_m, P, t);
                speedsRad.push(omega_w);
                speedsRpm.push(n_w);
            });

            // Выполняем расчеты
    const { i, omega_w, n_w } = calculateGearRatioAndSpeed(J, n_m, P, t);

    // Выводим результаты расчетов
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Необходимое передаточное число редуктора: <strong>${i.toFixed(2)}</strong></p>
        <p>Максимальная скорость маховика: <strong>${omega_w.toFixed(2)} рад/с (${n_w.toFixed(2)} об/мин)</strong></p>
    `;

            const ctx = document.getElementById('myChart').getContext('2d');

            // Если график уже существует, уничтожаем его
            if (myChart) {
                myChart.destroy();
            }

            // Создаем новый график
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: tRange,
                    datasets: [
                        {
                            label: 'Угловая скорость (рад/с)',
                            data: speedsRad,
                            borderColor: 'gray',
                            yAxisID: 'y',
                        },
                        {
                            label: 'Скорость (об/мин)',
                            data: speedsRpm,
                            borderColor: 'white',
                            yAxisID: 'y1',
                        }
                    ]
                },
options: {
    scales: {
    x: {
            type: 'linear',
            display: true,
            title: {
                display: true,
                text: 'Время разгона (с)',
                color: 'white', // Цвет подписи оси X
            },
            ticks: {

                stepSize: 1, // Цена деления (шаг) оси X
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Угловая скорость (рад/с)',
                color: 'gray',
            },
            ticks: {
                color: 'gray',

            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Скорость (об/мин)',
                color: 'white',
            },
            ticks: {
                color: 'white',

            },
            grid: {
                drawOnChartArea: false,
            }
        }
    }
}
            });
        }