let pneumaticChart = null; // Переменная для хранения графика

function calculatePneumatic() {
    // Получаем значения из формы
    const diameter = parseFloat(document.getElementById('diameter').value); // Диаметр в мм
    const stroke = parseFloat(document.getElementById('stroke').value); // Ход в мм
    const pressure = parseFloat(document.getElementById('pressure').value); // Давление в бар
    const flow = parseFloat(document.getElementById('flow').value); // Расход в л/мин

    // Конвертируем единицы измерения
    const diameterM = diameter / 1000; // Диаметр в метрах
    const strokeM = stroke / 1000; // Ход в метрах
    const pressurePa = pressure * 100000; // Давление в Паскалях
    const flowM3s = flow / 60000; // Расход в м³/с

    // Рассчитываем площадь поршня
    const area = (Math.PI * Math.pow(diameterM, 2)) / 4; // Площадь в м²

    // Рассчитываем подъемную силу
    const force = pressurePa * area; // Сила в Ньютонах

    // Рассчитываем скорость срабатывания
    const speed = flowM3s / area; // Скорость в м/с

    // Выводим результаты
    const resultsDiv = document.getElementById('pneumaticResults');
    resultsDiv.innerHTML = `
        <p>Подъемная сила: <strong>${force.toFixed(2)} Н</strong></p>
        <p>Скорость срабатывания: <strong>${speed.toFixed(4)} м/с</strong></p>
    `;

    // Строим график зависимости подъемной силы от давления
    const pressureRange = Array.from({ length: 50 }, (_, i) => 1 + (i * (10 - 1) / 49)); // Диапазон давления от 1 до 10 бар
    const forces = pressureRange.map(p => (p * 100000) * area); // Подъемная сила для каждого давления

    const ctx = document.getElementById('pneumaticChart').getContext('2d');

    // Уничтожаем старый график, если он существует
    if (pneumaticChart) {
        pneumaticChart.destroy();
    }

    // Создаем новый график
    pneumaticChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pressureRange.map(p => p.toFixed(1)), // Подписи оси X (давление)
            datasets: [
                {
                    label: 'Подъемная сила (Н)',
                    data: forces,
                    borderColor: 'white',
                    yAxisID: 'y',
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
                        text: 'Давление (бар)',
                        color: 'gray',
                    },
                    ticks: {
                        color: 'gray',
                        stepSize: 1,
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Подъемная сила (Н)',
                        color: 'white',
                    },
                    ticks: {
                        color: 'white',
                    }
                }
            }
        }
    });
}