document.addEventListener('DOMContentLoaded', () => {
    // CD 플레이어 드래그 앤 드롭 기능
    const cdPlayer = document.getElementById('cd-player');
    const cdHeader = document.getElementById('cd-player-header');

    let isDragging = false;
    let offsetX, offsetY;

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
