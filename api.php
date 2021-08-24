<?php

function empty_filter($obj) {	// 선택 인자의 값이 없으면("") 제거
    foreach ($obj as $key => $value) {
        if (empty($value)) {
            unset($obj->$key);
        }
    }
    return $obj;
}

// fetch API로 보낸 request_body는 json 형태이므로 파싱 해서 PHP 객체로 사용
$ajax_data = json_decode(file_get_contents('php://input'));

// 위의 필터링 함수를 사용해 불필요한 값 제거
$filtered_params = empty_filter(array($ajax_data->params)[0]);

// http_build_query() 함수로 객체를 QueryString으로 만들어준다.
$query = http_build_query($filtered_params);

// 선택 요청 인자가 존재하는 경우 붙여주기
// 존재하지 않는다면 url은 그대로이다.
$url = $ajax_data->url .= $query ? '?'.$query : '';

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