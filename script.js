document.addEventListener('DOMContentLoaded', () => {
    // CD 플레이어 드래그 앤 드롭 기능
    const cdPlayer = document.getElementById('cd-player');
    const cdHeader = document.getElementById('cd-player-header');

    let isDragging = false;
    let offsetX, offsetY;

// === 🎵 오디오 플레이어 기능 🎵 ===
    const audio = document.getElementById('bgm-audio');
    const btnPlay = document.getElementById('btn-play');
    const btnStop = document.getElementById('btn-stop');
    const slider = document.getElementById('audio-slider');
    
    // 돌고래 말풍선 텍스트 요소 찾기
    const dolphinText = document.querySelector('.search-box p');
    const originalDolphinText = dolphinText.innerHTML; // 원래 대사(何について調べますか？) 저장

    // ★ 음악 재생을 실행하는 함수
    const playMusic = () => {
        audio.play().then(() => {
            btnPlay.textContent = '⏸'; 
            // 음악이 켜지면 돌고래 대사를 원래대로 되돌림
            dolphinText.innerHTML = originalDolphinText; 
        }).catch((error) => {
            // 브라우저가 자동 재생을 막았을 때 돌고래가 안내함!
            dolphinText.innerHTML = "화면 아무 곳이나<br>클릭하면 BGM이 나와요! 🎵";
            dolphinText.style.color = "#000080"; // 글씨를 파란색으로 강조
        });
    };

    // 1. 페이지 접속 시 바로 자동 재생 시도 (이전 페이지에서 넘어왔기 때문에 켜질 수도 있음!)
    playMusic();

    // 2. 만약 차단되어서 돌고래가 안내 중일 때, 화면 아무 곳이나 클릭하면 음악 켜기
    document.body.addEventListener('click', () => {
        if (audio.paused && audio.currentTime === 0) {
            playMusic();
        }
    }, { once: true });

    // 3. 재생/일시정지 버튼 클릭 시
    btnPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            playMusic();
        } else {
            audio.pause();
            btnPlay.textContent = '▶';
        }
    });

    // 4. 정지 버튼 클릭 시
    btnStop.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.pause();
        audio.currentTime = 0;
        btnPlay.textContent = '▶';
        slider.value = 0;
    });

    // 5. 슬라이더 바 자동 이동
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            slider.value = progress;
        }
    });

    // 6. 슬라이더 바 수동 조작
    slider.addEventListener('input', () => {
        if (audio.duration) {
            const seekTime = (slider.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        }
    });
    
    cdHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        // 마우스 클릭 위치와 요소의 좌상단 모서리 간의 차이 계산
        offsetX = e.clientX - cdPlayer.offsetLeft;
        offsetY = e.clientY - cdPlayer.offsetTop;
        
        // 드래그 중 커서 모양 변경
        cdHeader.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // 새 위치 계산 적용
        cdPlayer.style.left = `${e.clientX - offsetX}px`;
        cdPlayer.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        cdHeader.style.cursor = 'grab';
    });
});
// === 탭(페이지) 전환 기능 ===
function showPage(pageId, event) {
    // 1. 모든 섹션 숨기기
    const sections = document.querySelectorAll('.main-paper section');
    sections.forEach(s => s.style.display = 'none');
    
    // 2. 모든 네비게이션 버튼 active(활성화) 스타일 제거
    const navLinks = document.querySelectorAll('.retro-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // 3. 선택된 페이지만 보여주기
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }

    // 4. 클릭한 버튼에 active 스타일 추가
    if (event) {
        event.currentTarget.classList.add('active');
        event.preventDefault(); // 링크 클릭 시 스크롤이 위로 튀는 현상 방지
    }
}

// === CG 앨범 확대 모달 기능 ===
function openAlbum(src) {
    const modal = document.getElementById('album-modal');
    const modalImg = document.getElementById('modal-img');
    
    modalImg.src = src;
    modal.style.display = 'flex'; // 모달 보이기
}

function closeAlbum() {
    document.getElementById('album-modal').style.display = 'none'; // 모달 숨기기
}
