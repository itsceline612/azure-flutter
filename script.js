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
