// init 체크
if (!Kakao.isInitialized()) {
    Kakao.init('03ae6d74a4ac2378ea454cfb97f21066');
}

const sendKakao = function() {
    // 메시지 공유 함수
    Kakao.Link.sendScrap({
        requestUrl: 'https://dockidocki.github.io/dutch-pay-web', // 페이지 url
        templateId: 12345, // 메시지템플릿 번호
        templateArgs: {
            PROFILE : '프로필 이미지 주소', // 프로필 이미지 주소 ${PROFILE}
            THUMB: '썸네일 주소', // 썸네일 주소 ${THUMB}
            TITLE: '제목 텍스트입니다', // 제목 텍스트 ${TITLE}
            DESC: '설명 텍스트입니다', // 설명 텍스트 ${DESC}
        },
    });
};

const shareKakaoBtn = document.getElementById('share-kakao');

shareKakaoBtn.addEventListener('click', sendKakao);
