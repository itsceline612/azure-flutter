document.getElementById('btn-enter').addEventListener('click', function() {
    // 1. Tìm và phát nhạc nền (playlist.mp3)
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.5; // Đặt âm lượng vừa phải (50%)
        music.play().catch(function(error) {
            console.log("Trình duyệt chặn tự động phát nhạc:", error);
        });
    }

    // 2. Ẩn màn hình Intro chào mừng
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        introScreen.style.display = 'none';
    }

    // 3. Hiện phần nội dung chính (Gian hàng chồng yêu)
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
    }
});
