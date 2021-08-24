# Simple API test example

with `HTML`, `JavaScript`, `PHP`

___

## Use API

### [API - 식품영양성분DB(NEW)](https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=656&show_cnt=10&start_idx=1&svc_no=I2790)

### returned data

```JSON
{
    "I2790": {
        "RESULT": {
            "MSG": "정상처리되었습니다.",
            "CODE": "INFO-000"
        },
        "total_count": "59886",
        "row": [
            {
                "NUTR_CONT3": "33.5",
                "NUTR_CONT2": "39.7",
                "NUTR_CONT1": "368.8",
                "SERVING_SIZE": "500",
                "MAKER_NAME": "",
                "NUTR_CONT9": "0.1",
                "NUTR_CONT8": "1.9",
                "FOOD_CD": "D000006",
                "NUTR_CONT7": "106.18",
                "NUTR_CONT6": "1264.31",
                "NUTR_CONT5": "16.9",
                "NUTR_CONT4": "8.5",
                "DESC_KOR": "꿩불고기",
                "SAMPLING_MONTH_NAME": "평균",
                "SUB_REF_NAME": "식약처('16) 제4권",
                "SAMPLING_REGION_NAME": "충주",
                "GROUP_NAME": "",
                "RESEARCH_YEAR": "2019",
                "SAMPLING_REGION_CD": "94",
                "SAMPLING_MONTH_CD": "AVG",
                "NUM": "1"
            },
          ...
```

___

## JavaScript - Ajax

### [api.js](api.js)
```javascript
fetch('api.php', init)
    .then((res) => res.json()) // json을 돌려주므로 json()을 이용해 객체로 파싱
    .then((data) => {	       
        const res_obj = data.I2790;     // keyId
        console.log(res_obj.RESULT);
        console.log(res_obj.row);
    });
```

___

## PHP - cURL

### [api.php](api.php)
```PHP
// curl에 적용할 옵션들을 저장
$options = array(
    CURLOPT_URL => $url,	// 최종 url도 이때 넣어준다.
    CURLOPT_RETURNTRANSFER => true,  // 반환된 값을 string으로 변환해 저장
    CURLOPT_SSL_VERIFYPEER => false, // true인 경우 https 통신이 불가한 경우 발생
);

// curl 세션 초기화
$ch = curl_init();

// 이것도 유용한 함수 array를 받아서 한번에 옵션을 지정
curl_setopt_array($ch, $options);

// 실행 -> API 서버에서 반환한 데이터를 $response 변수에 저장한다.
$response = curl_exec($ch);	

// 세션 종료
curl_close($ch);

echo $response;	// JSON 형태이므로 JavaScript에서 json()을 통해 파싱
```