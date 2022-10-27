리액트 복습

-----react app 생성--------
cd  원하는 폴더 경로
npx create-react-app ./폴더명(소문자)
cd 생성폴더
npm start  -> reat기본페이지 뜬다

-----생성한 react app 실행-------
생성폴더 작업라인에 열기
index.html, index.js, app.js 정리
컴포넌트 모아둘 폴더 생성
작업 컴포넌트 생성(이름 반드시 대문자)
function-return 폼 작성(반드시 export, default! )

----컴포넌트 만들고 원하는 형대로 정렬-----
컴포넌트 연결(app.js에 모두 불러도 되고, main 컴포넌트 지정하고 그 안에 넣은 후 app.js와 main컴포넌트만 연결해도 됨)
터미널 ctrl c + y (작업폴더로 이동)
라우터 설치 npm install react-router-dom
쿼리스트링 설치 npm install query-string (url을 수기로 넘기거나 쿼리스트링으로 넘기는 방법있음)
(쿼리스트링이란?사용자가 입력 데이터를 전달하는 방법중의 하나로, url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다. 쉽게 말해 URL의 뒤에 입력 데이터를 함께 제공하는 가장 단순한 데이터 전달 방법)

---- 컴포넌트 라우터형태로 변경--------
index.js 에 
import {BrowserRouter}
<app/>을 <BrowserRouter>로 감싸기 (react.strictmode 삭제)

app.js에
import {Routes, Route} 
return( <Routes> 
	<Route path = '/' element = {< 컴포넌트명1/>} /> 
	<Route path = '/path명' element = {< 컴포넌트명2/>} /> 
          </Routes>);

 : '/' === 홈
:  '/path명' => path명은 컴포넌트 이름과 다르게 써도 된다. 마음대로 but 알아보게.
: 패키지가 바뀌면 라우터 적용 형태가 달라질 수 있다. 현재 사용하는건 react-router-dom
: (주의) 라우터 값을 넘겨줄 수 있다.

------오픈 API 끌고오기--------
api 사이트에서원하는 응답예시에서 url 복사해서 원하는 컴포넌트에 붙이기
(1)     const get함수명 =() => {
	let url = " url copy" ;
	}
>> 반드시 https로! 
>> 효과적인 관리를 위해서 .json? 이하 잘라서 관리
ex)    let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + "key=" + "f5eef3421c602c6cb7ea224104795888";
        url = url + "&targetDt=" + '20120101';

------패치(비동기 통신)------
(비동기 통신: 요청을 날린 후 resolve, reject가 아닌 이상 다른 일을 동시에 실행하고있다.
반환이되는걸 promise라고 함. promise 는 .then으로 표시)

1. then..catch구문
fetch(url)
	.then((response )=>{})		// response오면 
	.catch((err) => {err})		// err 나면 catch


2. async 함수(err잡기 위해서 try-catch구문안에 넣어준다.)
 const get함수명 = async () => {
	let url = "..."
	url = url + "key=" + "...";
	url = url + "..." + "...";
	
try{
	const resp = await fetch(url);
	const data = await resp.json();

	console.log(data);
} catch(err) {
	console.log(err)
}

--------hook-----------

import {useEffect} 

//패치 아래 적는다
useEffect(()=>{
	getBoxoffice();	//(첫 랜더링시 api에서 데이터 끌고온다)
}, []) 			//[] 디펜던시 변수를 쓰면 처음 랜더링에만 실행

---------어제날짜 추출------------
const yesterday = new Date(); //yesterday 정의. Date()를 쓰면 default로 날짜형식이 들어오고, 오늘날짜로 설정된다. 페이지 랜더링시 오늘 날짜로 고정
yesterday.setDate(yesterday.getDate()-1); // yesterday에 Date(오늘날짜)로 세팅하고 Date()-1을 get하도록 설정

---------디폴트 날짜 설정----------
 console.log(yesterday.toISOString());     // toISOString() 는 Date 를 ISOString(yyyy-mm-ddThh:mm:ss) 형식의 문자열로  변환해주는 함수
				   // 그런데 이 함수를 사용하면 날짜가 하루 전 날짜가 찍힌다. 이유는 이 함수가 우리나라 Time Zone 이 아니라 UTC 타임존(zero offset) 을 사용하기 때문이다. .>>해결방법 검색 후 추가하기


---------어떤 데이터를 끌고 올지?(패치한 부분의 data를 체인으로 연결해서 원하는 데이터까지 간다.)--------
try {
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data.boxOfficeResult.dailyBoxOfficeList);
        }   catch (err) {
            console.log(err)
        }
    }

---- 날짜 데이터에 '-'삭제하기 ------
---- 첫페이지에'선택날짜: 어제날짜' 를 디폴트로 출력----
(날짜 선택할때마다 바뀌면서 실행해야 하므로) useState Hook 사용
import {useState} 
const [Viewday, setViewday] = useState();  //변수 정의. useState사용할때는 반드시 [변수명, set변수명] 세트로 사용  
(어제 날짜 설정한 useEffect안에, yesterday정의 밑에)  setView(d);  //위에서 d를 날짜로 정의 해 놓았으므로 첫페이지에서는 어제날짜로 나오고, 날짜를 선택하면 선택날짜로 나온다.

----- 선택한 날짜별로 (선택날짜: date) << 바꾸기 ----
(useRef) - useState을 받아서 조회, 수정만. 
 // ref Hook 선언
    const refDateIn = useRef(); //변수명 옆에 기호 아무것도 없다! 

 useEffect(() => {
        (Viewday && setViewday2(Viewday.substring(0,4) + '.' + Viewday.substring(4,6) + '.' + Viewday.substring(6,8)))
        getBoxoffice(Viewday)       //날짜 바뀌고(&&) 
    }, [Viewday])

----- 첫화면에 영화리스트 출력하기-----

state변수 선언
const [mvList, setmvList] = useState([]); //첫화면에서 mvList줄건데 배열로 초기화 시켜

try-catch 사이에
dailyBoxOfficeList 데려옴 
 setmvList(
           dailyBoxOfficeList.map((item)=> <li key = {item.movieCd}> {/* mvList를 useState변수를 사용하여 배열로 선언했기 때문에 map으로 쓸 수 있음. 원하는데이터를 {} 안에 넣는데 유니크한 키값을 지정해줘야 하기 때문에 모든 배열에 공통으로 들어가있는 movieCd를 키값으로 지정. {} 에 넣는 점 유의. item은 배열 이름을 item으로 준 것. */}
                <Link to = {"/mvinfo" + "?mvcd=" + item.movieCd}>   {/* "/mvinfo" 뒤에 "?mvcd=" 등과 같은 파라미터 원하는대로 설정 후 원하는 데이터 붙인다. */}
                    {item.rank}
                    {item.movieNm}
                    {item.rankInten > 0 ? '⬆' : item.rankInten < 0? '⬇' : ''}   {/*map에서는 if조건문 못써서 삼항연산자로 조건걸어준다. rankInten이 0보다 크면 '⬆', 아니면 '⬇', 그 외 나머지는 ''(공백) */}
                    {Math.abs(Number(item.rankInten))} {/* rankInten의 값을 절대값으로 준다.*/}
                    {/**/}
                </Link> {/*  BoxMv 페이지로 연결하는 링크 설정 */}
            </li>)   //li가 여러개니까 각각 key를 줘야함
 

-----영화 상세페이지----
 
ㅜㅜ정리..
