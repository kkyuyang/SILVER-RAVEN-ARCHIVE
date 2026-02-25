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

    // ★ 음악 재생을 실행하는 함수 (버튼 모양도 같이 바꿔줌)
    const playMusic = () => {
        audio.play().then(() => {
            btnPlay.textContent = '⏸'; // 재생 성공 시 일시정지 아이콘으로 변경
        }).catch((error) => {
            console.log("자동 재생이 브라우저에 의해 차단되었습니다. 클릭을 기다립니다.");
        });
    };

    // ★ 1. 페이지 접속 시 바로 자동 재생 시도
    playMusic();

    // ★ 2. 브라우저가 차단했을 경우, 화면 아무 곳이나 처음 클릭할 때 재생되도록 설정
    document.body.addEventListener('click', () => {
        if (audio.paused && audio.currentTime === 0) {
            playMusic();
        }
    }, { once: true }); // once: true를 넣으면 이 이벤트는 딱 한 번만 실행됩니다.

    // 3. 재생/일시정지 버튼 클릭 시
    btnPlay.addEventListener('click', (e) => {
        e.stopPropagation(); // 배경 클릭 이벤트와 겹치지 않게 방지
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
