// API anahtarı (gerçek uygulamada güvenli bir şekilde saklanmalı)
// Not: Bu demo için rate limit düşük olacaktır
const GITHUB_API_BASE = 'https://api.github.com';

// DOM elementleri
const repoUrlInput = document.getElementById('repo-url');
const analyzeBtn = document.getElementById('analyze-btn');
const loadingElement = document.getElementById('loading');
const resultsElement = document.getElementById('results');
const errorElement = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const exampleRepos = document.querySelectorAll('.example-repo');
const exportPdfBtn = document.getElementById('export-pdf');
const exportJsonBtn = document.getElementById('export-json');

// Chart nesneleri
let languagesChart = null;
let activityChart = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Event listener'ları ekle
    analyzeBtn.addEventListener('click', analyzeRepository);
    repoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeRepository();
        }
    });
    
    // Örnek repolara tıklama
    exampleRepos.forEach(repo => {
        repo.addEventListener('click', function() {
            const repoName = this.getAttribute('data-repo');
            repoUrlInput.value = `https://github.com/${repoName}`;
            analyzeRepository();
        });
    });
    
    // Export butonları
    exportPdfBtn.addEventListener('click', exportToPdf);
    exportJsonBtn.addEventListener('click', exportToJson);
});

// Depo analiz etme fonksiyonu
async function analyzeRepository() {
    const repoUrl = repoUrlInput.value.trim();
    
    if (!repoUrl) {
        showError('Lütfen bir GitHub depo URL\'si girin.');
        return;
    }
    
    // URL'den kullanıcı adı ve repo adını çıkar
    const repoPath = extractRepoPath(repoUrl);
    if (!repoPath) {
        showError('Geçersiz GitHub depo URL\'si. Örnek: https://github.com/facebook/react');
        return;
    }
    
    // UI durumunu güncelle
    setLoadingState(true);
    hideError();
    hideResults();
    
    try {
        // GitHub API'den verileri al
        const repoData = await fetchRepoData(repoPath);
        const languagesData = await fetchRepoLanguages(repoPath);
        const contributorsData = await fetchRepoContributors(repoPath);
        const commitsData = await fetchRepoCommits(repoPath);
        const forksData = await fetchRepoForks(repoPath);
        const releasesData = await fetchRepoReleases(repoPath);
        
        // UI'yi güncelle
        updateUI(repoData, languagesData, contributorsData, commitsData, forksData, releasesData);
        
        // Chart'ları oluştur
        createLanguagesChart(languagesData);
        createActivityChart(commitsData);
        
        // Sonuçları göster
        setLoadingState(false);
        showResults();
        
    } catch (error) {
        console.error('Hata:', error);
        showError('Depo bilgileri alınırken bir hata oluştu: ' + error.message);
        setLoadingState(false);
    }
}

// URL'den repo yolunu çıkarma
function extractRepoPath(url) {
    const match = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
    return match ? match[1] : null;
}

// GitHub API'den repo verilerini alma
async function fetchRepoData(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}`);
    if (!response.ok) {
        throw new Error(`Depo bulunamadı: ${response.status}`);
    }
    return await response.json();
}

// Repo dillerini alma
async function fetchRepoLanguages(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/languages`);
    if (!response.ok) {
        throw new Error(`Diller alınamadı: ${response.status}`);
    }
    return await response.json();
}

// Katkıda bulunanları alma
async function fetchRepoContributors(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/contributors?per_page=10`);
    if (!response.ok) {
        throw new Error(`Katkıda bulunanlar alınamadı: ${response.status}`);
    }
    return await response.json();
}

// Commit'leri alma
async function fetchRepoCommits(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/commits?per_page=100`);
    if (!response.ok) {
        throw new Error(`Commit'ler alınamadı: ${response.status}`);
    }
    return await response.json();
}

// Fork'ları alma
async function fetchRepoForks(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/forks?sort=stargazers&per_page=5`);
    if (!response.ok) {
        throw new Error(`Fork'lar alınamadı: ${response.status}`);
    }
    return await response.json();
}

// Release'leri alma
async function fetchRepoReleases(repoPath) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoPath}/releases?per_page=5`);
    if (!response.ok) {
        throw new Error(`Release'ler alınamadı: ${response.status}`);
    }
    return await response.json();
}

// UI'yi güncelleme
function updateUI(repoData, languagesData, contributorsData, commitsData, forksData, releasesData) {
    // Temel bilgiler
    document.getElementById('repo-name').textContent = repoData.full_name;
    document.getElementById('repo-description').textContent = repoData.description || 'Açıklama yok';
    document.getElementById('avatar').src = repoData.owner.avatar_url;
    
    // Meta bilgiler
    document.getElementById('stars').textContent = formatNumber(repoData.stargazers_count);
    document.getElementById('forks').textContent = formatNumber(repoData.forks_count);
    document.getElementById('watchers').textContent = formatNumber(repoData.watchers_count);
    document.getElementById('issues').textContent = formatNumber(repoData.open_issues_count);
    
    // Genel istatistikler
    document.getElementById('created-at').textContent = formatDate(repoData.created_at);
    document.getElementById('updated-at').textContent = formatDate(repoData.updated_at);
    document.getElementById('size').textContent = formatSize(repoData.size);
    document.getElementById('language').textContent = repoData.language || 'Belirtilmemiş';
    document.getElementById('license').textContent = repoData.license ? repoData.license.name : 'Lisans yok';
    
    // Katkı istatistikleri
    document.getElementById('contributors-count').textContent = contributorsData.length;
    document.getElementById('last-commit').textContent = commitsData.length > 0 ? formatDate(commitsData[0].commit.author.date) : 'Bilinmiyor';
    document.getElementById('commits-count').textContent = formatNumber(repoData.network_count || commitsData.length);
    document.getElementById('pr-count').textContent = formatNumber(repoData.open_issues_count); // Basit yaklaşım
    document.getElementById('releases-count').textContent = releasesData.length;
    
    // Popüler fork'lar
    const forksList = document.getElementById('popular-forks');
    forksList.innerHTML = '';
    
    if (forksData.length > 0) {
        forksData.forEach(fork => {
            const forkItem = document.createElement('div');
            forkItem.className = 'fork-item';
            forkItem.innerHTML = `
                <h4>${fork.full_name}</h4>
                <p><i class="fas fa-star"></i> ${formatNumber(fork.stargazers_count)} | <i class="fas fa-code-branch"></i> ${formatNumber(fork.forks_count)}</p>
            `;
            forksList.appendChild(forkItem);
        });
    } else {
        forksList.innerHTML = '<p>Henüz fork yapılmamış.</p>';
    }
    
    // Son release'ler
    const releasesList = document.getElementById('releases');
    releasesList.innerHTML = '';
    
    if (releasesData.length > 0) {
        releasesData.forEach(release => {
            const releaseItem = document.createElement('div');
            releaseItem.className = 'release-item';
            releaseItem.innerHTML = `
                <h4>${release.name || release.tag_name}</h4>
                <p>${formatDate(release.published_at)}</p>
            `;
            releasesList.appendChild(releaseItem);
        });
    } else {
        releasesList.innerHTML = '<p>Henüz release yayınlanmamış.</p>';
    }
}

// Dil dağılımı chart'ını oluşturma
function createLanguagesChart(languagesData) {
    const ctx = document.getElementById('languages-canvas').getContext('2d');
    
    // Eski chart'ı temizle
    if (languagesChart) {
        languagesChart.destroy();
    }
    
    const labels = Object.keys(languagesData);
    const data = Object.values(languagesData);
    const total = data.reduce((sum, value) => sum + value, 0);
    const percentages = data.map(value => ((value / total) * 100).toFixed(1));
    
    // Renk paleti
    const colors = [
        '#3182ce', '#e53e3e', '#38a169', '#d69e2e', 
        '#805ad5', '#dd6b20', '#319795', '#d53f8c'
    ];
    
    languagesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map((label, i) => `${label} (${percentages[i]}%)`),
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// Aktivite chart'ını oluşturma
function createActivityChart(commitsData) {
    const ctx = document.getElementById('activity-canvas').getContext('2d');
    
    // Eski chart'ı temizle
    if (activityChart) {
        activityChart.destroy();
    }
    
    // Commit'leri tarihe göre grupla
    const commitCounts = {};
    commitsData.forEach(commit => {
        const date = new Date(commit.commit.author.date).toLocaleDateString('tr-TR');
        commitCounts[date] = (commitCounts[date] || 0) + 1;
    });
    
    const dates = Object.keys(commitCounts).slice(-10); // Son 10 gün
    const counts = dates.map(date => commitCounts[date]);
    
    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Günlük Commit Sayısı',
                data: counts,
                borderColor: '#3182ce',
                backgroundColor: 'rgba(49, 130, 206, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Yardımcı fonksiyonlar
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

function formatSize(sizeInKB) {
    if (sizeInKB >= 1024) {
        return (sizeInKB / 1024).toFixed(1) + ' MB';
    }
    return sizeInKB + ' KB';
}

// UI durum yönetimi
function setLoadingState(isLoading) {
    loadingElement.style.display = isLoading ? 'block' : 'none';
}

function showResults() {
    resultsElement.style.display = 'block';
}

function hideResults() {
    resultsElement.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    errorElement.style.display = 'none';
}

// Export işlevleri
function exportToPdf() {
    // Basit bir PDF export uyarısı
    alert('PDF export özelliği premium sürümde mevcut!');
    // Gerçek uygulamada jsPDF kullanılabilir
}

function exportToJson() {
    // JSON export işlevi
    const repoData = {
        name: document.getElementById('repo-name').textContent,
        description: document.getElementById('repo-description').textContent,
        stars: document.getElementById('stars').textContent,
        forks: document.getElementById('forks').textContent,
        // Diğer veriler...
    };
    
    const dataStr = JSON.stringify(repoData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'repo-analysis.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}