document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const signupModal = document.getElementById('signup-modal');
    const closeModal = document.getElementById('close-modal');
    const signupSubmit = document.getElementById('signup-submit');

    // 로그인 버튼 클릭 이벤트
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.ok) {
                    const token = response.headers.get('Authorization');
                    localStorage.setItem('token', token);
                    window.location.href = 'index.html';
                } else {
                    alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // 회원가입 버튼 클릭 이벤트
    signupButton.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    // 모달 닫기 버튼
    closeModal.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // 회원가입 완료 버튼 클릭 이벤트
    signupSubmit.addEventListener('click', () => {
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const nickname = document.getElementById('signup-nickname').value;

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, nickname })
        })
            .then(response => {
                if (response.ok) {
                    alert('회원가입이 완료되었습니다. 로그인 해주세요.');
                    signupModal.style.display = 'none';
                } else {
                    alert('회원가입 실패: 입력 정보를 확인하세요.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
