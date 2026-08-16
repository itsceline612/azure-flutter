// 1. Mở cánh cửa Châu Âu & chuyển mượt mà không chớp màn hình
document.getElementById('btn-enter').addEventListener('click', function() {
    const music = document.getElementById('bg-music');
    const doorContainer = document.getElementById('door-container');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    if (music) {
        music.volume = 0.5;
        music.play().catch(function(error) {
            console.log("Trình duyệt chặn tự động phát nhạc:", error);
        });
    }

    // Bước A: Hiện cánh cửa cung điện che kín màn hình
    if (doorContainer) {
        doorContainer.classList.add('active');
    }

    // Bước B: Ngay khi cửa đã phủ kín, ẩn ngay Intro và hiện Main Content ở sau lưng cửa
    setTimeout(function() {
        if (introScreen) introScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden');
    }, 100);

    // Bước C: Mở toang 2 cánh cửa ra (lộ trực tiếp gian hàng nhân vật)
    setTimeout(function() {
        document.body.classList.add('open-door');
    }, 250);

    // Bước D: Xóa hẳn khung cửa sau khi mở xong để người dùng tương tác thoải mái
    setTimeout(function() {
        if (doorContainer) {
            doorContainer.style.display = 'none';
        }
    }, 2100);
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
