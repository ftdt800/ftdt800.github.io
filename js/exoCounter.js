// Удаляем или комментируем весь старый код с google.load и google.setOnLoadCallback

// Новый код для Chart.js
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент
    const container = document.getElementById('exo-chart-container');
    if (!container) {
        console.error('Элемент exo-chart-container не найден');
        return;
    }
    
    // Создаем canvas внутри контейнера
    const canvas = document.createElement('canvas');
    canvas.id = 'exo-chart-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    // Данные для графика
    const exoData = {
        labels: ['Июн', 'Июл', 'Авг', 'Сен', 'Окт', 
                 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар'],
        datasets: [{
            data: [3, 5, 5, 8, 9, 10, 11, 11, 15, 18],
            borderColor: '#baa98f',
            backgroundColor: 'rgba(186, 169, 143, 0.1)',
            borderWidth: 6,
            pointBackgroundColor: '#baa98f',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            fill: false
        }]
    };

    // Настройки графика
    const exoOptions = {

        maintainAspectRatio: false,
        backgroundColor: '#191919',
        plugins: {
            legend: {
                display: false,  
                labels: {
                    color: '#ffffff',
                    font: { size: 11 }
                },
                position: 'top',
                align: 'center'
            },
            tooltip: {
                backgroundColor: '#333333',
                titleColor: '#b3b3b3',
                bodyColor: '#b3b3b3',
                borderColor: '#baa98f',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#222222' },
                ticks: { 
                    color: '#5c5c5c',
                    stepSize: 5,
                    callback: function(value) {
                        return value;
                    }
                }
            },
            x: {
                grid: { color: '#222222' },
                ticks: { 
                    color: '#5c5c5c',
                    maxRotation: 30,
                    minRotation: 30
                }
            }
        },
        layout: {
            padding: { left: -10, right: 10, top: 10, bottom: 10 }
        }
    };

    try {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: exoData,
            options: exoOptions
        });
        console.log('График успешно создан');
    } catch (error) {
        console.error('Ошибка при создании графика:', error);
    }
});