// init 체크
if (!Kakao.isInitialized()) {
    Kakao.init('03ae6d74a4ac2378ea454cfb97f21066');
}

const sendKakao = function() {
    // 메시지 공유 함수
    Kakao.Link.sendScrap({
        requestUrl: 'https://dockidocki.github.io', // 페이지 url
        templateId: 86039, // 메시지템플릿 번호
        templateArgs: {
            PROFILE : '${PROFILE}', // 프로필 이미지 주소 ${PROFILE}
            THUMB: '${THUMB}', // 썸네일 주소 ${THUMB}
            TITLE: '${TITLE}', // 제목 텍스트 ${TITLE}
            DESC: '${DESC}', // 설명 텍스트 ${DESC}
        },
    });

    // Kakao.Link.sendDefault({
    //     objectType: 'feed',
    //     content: {
    //         title: '더치페이 계산 공유',
    //         description: resultText,
    //         imageUrl:
    //             'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeB1Yj7%2Fbtrn8HKdp01%2FlZMtAuvo986os4dCkVoAOk%2Fimg.png',
    //         imageWidth: 1200,
    //         imageHeight: 630,
    //         link: {
    //             mobileWebUrl: 'https://developers.kakao.com',
    //             androidExecutionParams: 'test',
    //         },
    //     },
    //     itemContent: {
    //         profileText: '송송',
    //         profileImageUrl:
    //             'https://tistory1.daumcdn.net/tistory/373748/attach/af0ef0205e234b4f9f09d7bce27dd237',
    //     },
    //     buttons: [
    //         {
    //             title: '블로그 둘러보기',
    //             link: {
    //                 mobileWebUrl: 'https://dockidocki.github.io/dutch-pay-web',
    //                 webUrl: 'https://dockidocki.github.io/dutch-pay-web',
    //             },
    //         },
    //     ],
    // });
};


const shareKakaoBtn = document.getElementById('share-kakao');

shareKakaoBtn.addEventListener('click', sendKakao);
