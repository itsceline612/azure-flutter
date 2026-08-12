// 1. Phát nhạc nền & mở cửa khi bấm nút
document.getElementById('btn-enter').addEventListener('click', function() {
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.5;
        music.play().catch(function(error) {
            console.log("Trình duyệt chặn tự động phát nhạc:", error);
        });
    }

    document.body.classList.add('open-door');

    setTimeout(function() {
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 600);
});

// 2. Mở Pop-up & tự đổi tên nút bấm tùy thuộc vào nhân vật UPCOMING hay thường
function openModal(filePlot, tenNhanVat, linkURL, isUpcoming = false) {
    const modal = document.getElementById('plot-modal');
    const plotContainer = document.getElementById('plot-text');
    const modalTitle = document.querySelector('.modal-title');
    const btnChat = document.querySelector('.btn-chat');
    
    if (modalTitle) modalTitle.textContent = tenNhanVat;
    if (btnChat) {
        btnChat.href = linkURL;
        
        // Đổi tên nút dựa vào biến isUpcoming
        if (isUpcoming) {
            btnChat.textContent = "ĐỌC PLOT ➔";
        } else {
            btnChat.textContent = "CHAT VỚI CHỒNG IU ➔";
        }
    }
    
    if (plotContainer) plotContainer.innerHTML = '<p>Đang tải nội dung giới thiệu...</p>';

    modal.classList.add('active');

    // Tải nội dung từ file .txt tương ứng
    fetch(filePlot)
        .then(response => {
            if (!response.ok) throw new Error('Không tìm thấy file plot');
            return response.text();
        })
        .then(data => {
            plotContainer.innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => {
            plotContainer.innerHTML = '<p style="color: #c2185b;">Không thể tải nội dung câu chuyện. Hãy kiểm tra lại file .txt trên GitHub nhé!</p>';
            console.error(error);
        });
}

// 3. Đóng Pop-up
function closeModal() {
    document.getElementById('plot-modal').classList.remove('active');
}
