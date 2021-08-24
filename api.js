const essential_params = {	// 필수 요청 인자들
    keyId: '자신의 API 인증키 입력',
    serviceId: 'I2790',		// 샘플에 나와있음
    dataType: 'json',		// 중요!! 받은 데이터 object로 파싱하기
    startIdx: 1,
    endIdx: 15
};

// 필수 인자들 "/../../.." 형식으로 url에 붙여주기
let url = `http://openapi.foodsafetykorea.go.kr/api/`
for (const key in essential_params) {
    url += `${essential_params[key]}/`
}

// 선택 요청 인자들
const params = {
    DESC_KOR: '',
    RESEARCH_YEAR: '',
    MAKER_NAME: '',
    FOOD_CD: '',
}

// fetch API에서 사용할 request body
// PHP에서 $객체->url, $객체->params 형태로 사용된다.
const request_body = {
    url: url,
    params: params
}

// fetch API에 넣을 init 객체
const init = {
    method: 'POST',
    mode: 'cors',	// 기본값이 cors이다.
    headers: {          // json 형식과 인코딩 명시
        'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request_body),	// json으로 파싱!!
}

fetch('api.php', init)
    .then((res) => res.json()) // json을 돌려주므로 json()을 이용해 객체로 파싱
    .then((data) => {	       // 이 내용은 바로 아래에서 설명
        const res_obj = data.I2790;
        console.log(res_obj.RESULT);
        console.log(res_obj.row);
    });