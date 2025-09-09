 let charts = {};
        
        // Tema değiştirme işlevi
        document.getElementById('themeToggle').addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            
            // Grafikleri yeniden oluştur (tema değişikliğine uyum sağlamaları için)
            createCharts();
        });

        // Navbar işlevselliği
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                // Tüm nav-item'lardan active sınıfını kaldır
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Tıklanan öğeye active sınıfı ekle
                this.classList.add('active');
                
                // Sayfa değiştirme simülasyonu
                const page = this.getAttribute('data-page');
                showNotification(`${page.charAt(0).toUpperCase() + page.slice(1)} sayfasına yönlendiriliyor...`);
            });
        });

        // Filtre uygulama işlevi
        document.getElementById('applyFilters').addEventListener('click', function() {
            const dateRange = document.getElementById('dateRange').value;
            const dataType = document.getElementById('dataType').value;
            const chartType = document.getElementById('chartType').value;
            
            // Yükleniyor durumunu göster
            const originalText = this.innerHTML;
            this.innerHTML = '<span>Yükleniyor...</span>';
            this.disabled = true;
            
            // Simüle edilmiş yükleme süresi
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Grafikleri yeniden oluştur
                createCharts();
                
                // Bildirim göster
                showNotification('Filtreler başarıyla uygulandı!');
            }, 1000);
        });

        // Bildirim gösterme işlevi
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            // 3 saniye sonra bildirimi gizle
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Rastgele veri üretme işlevi
        function generateRandomData(length, min, max) {
            return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        }

        // Grafikleri oluşturma işlevi
        function createCharts() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const textColor = isDarkMode ? '#f8f9fa' : '#333333';
            const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            const chartType = document.getElementById('chartType').value;
            
            // Satış grafiği
            const salesCtx = document.getElementById('salesChart').getContext('2d');
            if (charts.salesChart) {
                charts.salesChart.destroy();
            }
            charts.salesChart = new Chart(salesCtx, {
                type: chartType === 'pie' || chartType === 'doughnut' ? 'line' : chartType,
                data: {
                    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                    datasets: [{
                        label: 'Satışlar',
                        data: generateRandomData(7, 15000, 25000),
                        borderColor: '#4361ee',
                        backgroundColor: chartType === 'bar' ? 'rgba(67, 97, 238, 0.7)' : 'rgba(67, 97, 238, 0.1)',
                        tension: 0.4,
                        fill: chartType === 'line',
                        pointBackgroundColor: '#4361ee',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: chartType !== 'pie' && chartType !== 'doughnut'
                            },
                            ticks: {
                                color: textColor
                            },
                            display: chartType !== 'pie' && chartType !== 'doughnut'
                        },
                        y: {
                            display: chartType !== 'pie' && chartType !== 'doughnut',
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Kullanıcı grafiği
            const usersCtx = document.getElementById('usersChart').getContext('2d');
            if (charts.usersChart) {
                charts.usersChart.destroy();
            }
            charts.usersChart = new Chart(usersCtx, {
                type: chartType === 'pie' || chartType === 'doughnut' ? 'bar' : chartType,
                data: {
                    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                    datasets: [{
                        label: 'Kullanıcılar',
                        data: generateRandomData(7, 300, 800),
                        backgroundColor: 'rgba(76, 201, 240, 0.7)',
                        borderColor: '#4cc9f0',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: chartType !== 'pie' && chartType !== 'doughnut'
                            },
                            ticks: {
                                color: textColor
                            },
                            display: chartType !== 'pie' && chartType !== 'doughnut'
                        },
                        y: {
                            display: chartType !== 'pie' && chartType !== 'doughnut',
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Performans grafiği
            const performanceCtx = document.getElementById('performanceChart').getContext('2d');
            if (charts.performanceChart) {
                charts.performanceChart.destroy();
            }
            charts.performanceChart = new Chart(performanceCtx, {
                type: chartType === 'pie' || chartType === 'doughnut' ? 'line' : chartType,
                data: {
                    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
                    datasets: [{
                        label: 'Performans',
                        data: generateRandomData(7, 80, 100),
                        borderColor: '#f8961e',
                        backgroundColor: chartType === 'bar' ? 'rgba(248, 150, 30, 0.7)' : 'rgba(248, 150, 30, 0.1)',
                        tension: 0.4,
                        fill: chartType === 'line',
                        pointBackgroundColor: '#f8961e',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: chartType !== 'pie' && chartType !== 'doughnut'
                            },
                            ticks: {
                                color: textColor
                            },
                            display: chartType !== 'pie' && chartType !== 'doughnut'
                        },
                        y: {
                            display: chartType !== 'pie' && chartType !== 'doughnut',
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Detaylı grafik
            const detailedCtx = document.getElementById('detailedChart').getContext('2d');
            if (charts.detailedChart) {
                charts.detailedChart.destroy();
            }
            charts.detailedChart = new Chart(detailedCtx, {
                type: chartType === 'pie' || chartType === 'doughnut' ? 'line' : chartType,
                data: {
                    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                    datasets: [
                        {
                            label: 'Satışlar',
                            data: generateRandomData(12, 15000, 30000),
                            borderColor: '#4361ee',
                            backgroundColor: chartType === 'bar' ? 'rgba(67, 97, 238, 0.7)' : 'rgba(67, 97, 238, 0.1)',
                            tension: 0.4,
                            fill: chartType === 'line',
                            yAxisID: 'y'
                        },
                        {
                            label: 'Kullanıcılar',
                            data: generateRandomData(12, 500, 2500),
                            borderColor: '#4cc9f0',
                            backgroundColor: chartType === 'bar' ? 'rgba(76, 201, 240, 0.7)' : 'rgba(76, 201, 240, 0.1)',
                            tension: 0.4,
                            fill: chartType === 'line',
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        x: {
                            grid: {
                                color: gridColor,
                                display: chartType !== 'pie' && chartType !== 'doughnut'
                            },
                            ticks: {
                                color: textColor
                            },
                            display: chartType !== 'pie' && chartType !== 'doughnut'
                        },
                        y: {
                            type: 'linear',
                            display: chartType !== 'pie' && chartType !== 'doughnut',
                            position: 'left',
                            grid: {
                                color: gridColor
                            },
                            ticks: {
                                color: textColor
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: chartType !== 'pie' && chartType !== 'doughnut',
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                color: textColor
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    }
                }
            });
            
            // Pasta grafiği
            const pieCtx = document.getElementById('pieChart').getContext('2d');
            if (charts.pieChart) {
                charts.pieChart.destroy();
            }
            charts.pieChart = new Chart(pieCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Elektronik', 'Giyim', 'Ev & Yaşam', 'Kitap', 'Spor'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            '#4361ee',
                            '#4cc9f0',
                            '#f8961e',
                            '#10b981',
                            '#f72585'
                        ],
                        borderWidth: 0,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColor,
                                font: {
                                    size: 13
                                },
                                padding: 20
                            }
                        }
                    }
                }
            });
        }

        // Sayfa yüklendiğinde grafikleri oluştur
        document.addEventListener('DOMContentLoaded', function() {
            createCharts();
        });