// ==========================================
// 1. HIỆU ỨNG VỆT BỤI VÀNG THEO CON TRỎ CHUỘT
// ==========================================
document.addEventListener('mousemove', function(e) {
    if (Math.random() < 0.35) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-particle';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 900);
    }
});

// ==========================================
// 2. MỞ CỔNG CUNG ĐIỆN & CHUYỂN CẢNH MƯỢT MÀ
// ==========================================
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

    // Hiện cánh cửa che kín màn hình
    if (doorContainer) {
        doorContainer.classList.add('active');
    }

    // Ẩn Intro và hiện Main Content phía sau
    setTimeout(function() {
        if (introScreen) introScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden');
    }, 100);

    // Mở toang 2 cánh cửa lộ gian hàng
    setTimeout(function() {
        document.body.classList.add('open-door');
    }, 250);

    // Xóa khung cửa sau animation
    setTimeout(function() {
        if (doorContainer) {
            doorContainer.style.display = 'none';
        }
    }, 2100);
});

// ==========================================
// 3. POP-UP PLOT NHÂN VẬT (PHONG THƯ BÍ MẬT)
// ==========================================
function openModal(filePlot, tenNhanVat, linkURL, isUpcoming = false) {
    const modal = document.getElementById('plot-modal');
    const plotContainer = document.getElementById('plot-text');
    const modalTitle = document.querySelector('.modal-title');
    const btnChat = document.querySelector('.btn-chat');
    
    if (modalTitle) modalTitle.textContent = tenNhanVat;
    if (btnChat) {
        btnChat.href = linkURL;
        
        // Cập nhật danh xưng quý tộc cho nút bấm
        if (isUpcoming) {
            btnChat.textContent = "MỞ NIÊM PHONG BÍ MẬT ➔";
        } else {
            btnChat.textContent = "KHIÊU VŨ CÙNG CHÀNG ➔";
        }
    }
    
    if (plotContainer) plotContainer.innerHTML = '<p>Đang mở bức phong thư mật...</p>';

    modal.classList.add('active');

    // Tải nội dung từ file .txt
    fetch(filePlot)
        .then(response => {
            if (!response.ok) throw new Error('Không tìm thấy file plot');
            return response.text();
        })
        .then(data => {
            plotContainer.innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => {
            plotContainer.innerHTML = '<p style="color: #d4af37;">Không thể tải nội dung câu chuyện. Hãy kiểm tra lại file .txt trên GitHub nhé!</p>';
            console.error(error);
        });
}

// ==========================================
// 4. ĐÓNG POP-UP
// ==========================================
function closeModal() {
    document.getElementById('plot-modal').classList.remove('active');
}
// ==========================================
// HÀM CHUYỂN ĐỔI TAB NỘI DUNG
// ==========================================
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-item');
    const tabGallery = document.getElementById('tab-gallery');
    const tabNews = document.getElementById('tab-news');

    tabs.forEach(t => t.classList.remove('active'));

    if (tabGallery) tabGallery.classList.add('hidden-tab');
    if (tabNews) tabNews.classList.add('hidden-tab');

    if (tabName === 'gallery') {
        tabs[0].classList.add('active');
        if (tabGallery) tabGallery.classList.remove('hidden-tab');
    } else if (tabName === 'news') {
        tabs[1].classList.add('active');
        if (tabNews) tabNews.classList.remove('hidden-tab');
    }
}
