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

    if (doorContainer) {
        doorContainer.classList.add('active');
    }

    setTimeout(function() {
        if (introScreen) introScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden');
    }, 100);

    setTimeout(function() {
        document.body.classList.add('open-door');
    }, 250);

    setTimeout(function() {
        if (doorContainer) {
            doorContainer.style.display = 'none';
        }
    }, 2100);
});

// ==========================================
// 3. POP-UP PLOT (GÁN LINK CHÍNH XÁC 100%)
// ==========================================
function openModal(filePlot, tenNhanVat, linkURL, isUpcoming = false, isSoloWorld = false) {
    const modal = document.getElementById('plot-modal');
    const plotContainer = document.getElementById('plot-text');
    const modalTitle = document.querySelector('.modal-title');
    const btnChat = document.querySelector('.btn-chat');
    
    if (modalTitle) modalTitle.textContent = tenNhanVat;
    
    if (btnChat) {
        // Gán link chính xác và mở trong tab mới
        btnChat.setAttribute('href', linkURL);
        btnChat.setAttribute('target', '_blank');
        btnChat.setAttribute('rel', 'noopener noreferrer');
        
        // Tự đổi nhãn nút phù hợp với loại thẻ
        if (isUpcoming) {
            btnChat.textContent = "MỞ NIÊM PHONG BÍ MẬT ➔";
        } else if (isSoloWorld) {
            btnChat.textContent = "BƯỚC VÀO THẾ GIỚI ➔";
        } else {
            btnChat.textContent = "KHIÊU VŨ CÙNG CHÀNG ➔";
        }
    }
    
    if (plotContainer) plotContainer.innerHTML = '<p>Đang mở bức phong thư mật...</p>';

    modal.classList.add('active');

    // Đọc nội dung file cốt truyện
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
    const modal = document.getElementById('plot-modal');
    if (modal) modal.classList.remove('active');
}

// Đóng modal khi click ra vùng tối bên ngoài hộp thư
window.addEventListener('click', function(e) {
    const modal = document.getElementById('plot-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// ==========================================
// 5. HÀM CHUYỂN ĐỔI TAB NỘI DUNG
// ==========================================
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-item');
    const tabGallery = document.getElementById('tab-gallery');
    const tabSolo = document.getElementById('tab-solo');
    const tabForum = document.getElementById('tab-forum');
    const tabRequest = document.getElementById('tab-request');
    const tabNews = document.getElementById('tab-news');

    // Tắt trạng thái active của tất cả các nút tab
    tabs.forEach(t => t.classList.remove('active'));

    // Ẩn tất cả các phần nội dung
    if (tabGallery) tabGallery.classList.add('hidden-tab');
    if (tabSolo) tabSolo.classList.add('hidden-tab');
    if (tabForum) tabForum.classList.add('hidden-tab');
    if (tabRequest) tabRequest.classList.add('hidden-tab');
    if (tabNews) tabNews.classList.add('hidden-tab');

    // Hiện tab được bấm tương ứng
    if (tabName === 'gallery') {
        if (tabs[0]) tabs[0].classList.add('active');
        if (tabGallery) tabGallery.classList.remove('hidden-tab');
    } else if (tabName === 'solo') {
        if (tabs[1]) tabs[1].classList.add('active');
        if (tabSolo) tabSolo.classList.remove('hidden-tab');
    } else if (tabName === 'forum') {
        if (tabs[2]) tabs[2].classList.add('active');
        if (tabForum) tabForum.classList.remove('hidden-tab');
    } else if (tabName === 'request') {
        if (tabs[3]) tabs[3].classList.add('active');
        if (tabRequest) tabRequest.classList.remove('hidden-tab');
    } else if (tabName === 'news') {
        // Tự động kích hoạt tab news dù bạn có 4 hay 5 tab
        const newsIndex = tabRequest ? 4 : 3;
        if (tabs[newsIndex]) tabs[newsIndex].classList.add('active');
        if (tabNews) tabNews.classList.remove('hidden-tab');
    }
}
