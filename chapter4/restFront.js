// 로딩 시 사용자가 가져오는 함수
function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            const list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map((key) => {
                const userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                const edit = document.createElement('button');
                edit.textContent = '수정';
                // 수정 버튼 클릭
                edit.addEventListener('click', () => {
                    const name = prompt('바꿀 이름을 입력하세요.');
                    if (!name) {
                        return alert('이름을 반드시 입력하셔야 합니다.');
                    }
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', `/users/${key}`);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({ name: name }))
                })
                const remove = document.createElement('button');
                remove.textContent = '삭제';
                // 삭제 버튼 클릭
                remove.addEventListener('click', () => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    }
                    xhr.open('DELETE', `/users/${key}`);
                    xhr.send();
                })
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            })
        } else {
            console.error(xhr.responseText);
        }
    }
    xhr.open('GET', '/users');
    xhr.send();
}
// 로딩 시 getUser 호출
window.onload = getUser;

//폼 제출
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('이름을 입력하세요');
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 201) {
            console.log(xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ name: name }));
    e.target.username.value = '';
})