const essential_params = {
    keyId: '자신의 API 키 저장',
    serviceId: 'I2790',
    dataType: 'json',
    startIdx: 1,
    endIdx: 15
};

let url = `http://openapi.foodsafetykorea.go.kr/api/`
for (const key in essential_params) {
    url += `${essential_params[key]}/`
}

const params = {
    DESC_KOR: '',
    RESEARCH_YEAR: '',
    MAKER_NAME: '',
    FOOD_CD: '',
}

const request_body = {
    url: url,
    params: params
}

const init = {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request_body),
}

fetch('api.php', init)
    .then((res) => res.json())
    .then((data) => {
        const res_obj = data.I2790;
        console.log(res_obj.RESULT);
        console.log(res_obj.row);
    });