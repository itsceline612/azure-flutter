// 1. Phát nhạc & mở cửa khi bấm nút
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

// 2. TỰ ĐỘNG TẢI DANH SÁCH NHÂN VẬT TỪ FILE CHARACTERS.JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch('characters.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải file characters.json');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('character-list');
            if (!container) return;

            container.innerHTML = ''; // Làm sạch khung chứa trước khi đổ dữ liệu

            // Lặp qua từng nhân vật trong file JSON để tạo thẻ HTML
            data.forEach(char => {
                const tagsHTML = char.tags.map(tag => `<span>${tag}</span>`).join('');
                
                const cardHTML = `
                    <div class="card" onclick="openModal('${char.plotFile}', '${char.name}', '${char.aiLink}')">
                        <img src="${char.image}" alt="${char.name}" class="card-img">
                        <div class="card-info">
                            <h4><span class="char-link">${char.name}</span></h4>
                            <p class="quote">${char.quote}</p>
                            <div class="tags">${tagsHTML}</div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        })
        .catch(err => {
            console.error("Lỗi tải danh sách nhân vật từ file JSON:", err);
        });
});

// 3. XỬ LÝ MỞ POP-UP VÀ TẢI PLOT VĂN BẢN .TXT TƯƠNG ỨNG
function openModal(filePlot, tenNhanVat, linkChat) {
    const modal = document.getElementById('plot-modal');
    const plotContainer = document.getElementById('plot-text');
    const modalTitle = document.querySelector('.modal-title');
    const btnChat = document.querySelector('.btn-chat');
    
    // Cập nhật Tên và Link Chat cho nhân vật được chọn
    if (modalTitle) modalTitle.textContent = tenNhanVat;
    if (btnChat) btnChat.href = linkChat;
    if (plotContainer) plotContainer.innerHTML = '<p>Đang tải nội dung câu chuyện...</p>';

    // Hiển thị Pop-up
    modal.classList.add('active');

    // Tải nội dung file Plot .txt tương ứng
    fetch(filePlot)
        .then(response => {
            if (!response.ok) {
                throw new Error('Không tìm thấy file plot');
            }
            return response.text();
        })
        .then(data => {
            // Giữ nguyên các đoạn xuống dòng của văn bản
            plotContainer.innerHTML = data.replace(/\n/g, '<br>');
        })
        .catch(error => {
            plotContainer.innerHTML = '<p style="color: #c2185b;">Không thể tải nội dung câu chuyện. Hãy kiểm tra lại file .txt trên GitHub nhé!</p>';
            console.error(error);
        });
}

// 4. XỬ LÝ ĐÓNG POP-UP
function closeModal() {
    document.getElementById('plot-modal').classList.remove('active');
}
