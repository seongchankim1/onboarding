document.addEventListener('DOMContentLoaded', () => {
    fetch('/test', {
        method: 'GET',
        credentials: 'include' // 쿠키 전송을 위해 추가
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                window.location.href = 'login.html';
            }
        })
        .then(text => {
            // 고양이 사진과 메시지를 표시
            const contentDiv = document.getElementById('content');

            // 메시지 생성
            const message = document.createElement('h2');
            message.innerText = '인증 인가를 성공한 사람만 볼 수 있는 고양이 사진입니다!';

            // 이미지 생성
            const catImage = document.createElement('img');
            catImage.src = '/images/cat.png'; // 이미지 경로는 실제 파일 위치에 맞게 수정하세요.
            catImage.alt = '고양이 사진';
            catImage.classList.add('cat-image'); // 스타일 적용을 위한 클래스 추가

            // 콘텐츠 추가
            contentDiv.appendChild(message);
            contentDiv.appendChild(catImage);
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'login.html';
        });
});
