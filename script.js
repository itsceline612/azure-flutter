document.getElementById('btn-enter').addEventListener('click', function() {
    // 1. Phát nhạc nền
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.5;
        music.play().catch(function(error) {
            console.log("Trình duyệt chặn tự động phát nhạc:", error);
        });
    }

    // 2. Kích hoạt hiệu ứng mở cánh cửa
    document.body.classList.add('open-door');

    // 3. Sau khi cánh cửa mở dần (sau 0.6 giây), hiện màn hình chính
    setTimeout(function() {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 600);
});

// --- XỬ LÝ MỞ / TẮT POP-UP VÀ TẢI PLOT 10K CHỮ ---
function openModal() {
    const modal = document.getElementById('plot-modal');
    const plotContainer = document.getElementById('plot-text');
    
    // Hiện khung Pop-up
    modal.classList.add('active');

    // Tải tự động nội dung từ file louis-plot.txt
    fetch('louis-plot.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không tìm thấy file plot');
            }
            return response.text();
        })
        .then(data => {
            // Giữ nguyên khoảng cách xuống dòng giữa các đoạn văn
            plotContainer.innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => {
            plotContainer.innerHTML = '<p style="color: #c2185b;">Không thể tải nội dung câu chuyện. Hãy kiểm tra lại tên file louis-plot.txt trên GitHub nhé!</p>';
            console.error(error);
        });
}

function closeModal() {
    document.getElementById('plot-modal').classList.remove('active');
}
