### firebase hosting 주소: https://project7-boxoffice1.web.app
### PWA 생성 완료 

# 리액트 총정리

## 1. react app 생성
	1. 터미널: cd  원하는 폴더 경로	=> 해당 폴더로 진입해서 작업파일 생성가능
	2. npx create-react-app ./폴더명(소문자)	=> 리액트 작업환경 생성
	3. cd 생성폴더	=> 작업 폴더로 진입
	4. npm start	=> 브라우저에 reat기본페이지 뜬다

## 2. 생성한 react app 작업
	1. 생성 폴더 작업라인에 열기
	2. index.html, index.js, app.js 정리
	3. 컴포넌트 모아둘 폴더 생성
	4. 작업 컴포넌트 생성(이름 반드시 대문자)
	5. function-return 폼 작성(반드시 export, default!)

## 3. 컴포넌트 정렬 & 라우터, 쿼리스트링 설치
	1. 컴포넌트 연결 (app.js에 모두 불러도 되고, main 컴포넌트 지정하고 그 안에 넣은 후 app.js와 main컴포넌트만 연결해도 됨)
	2. 터미널 ctrl c + y	=> 작업 전체 폴더로 이동
	3. 라우터 설치: npm install react-router-dom
	4. 쿼리스트링 설치: npm install query-string (url을 수기로 넘기거나 쿼리스트링으로 넘기는 방법있음)
	   >>  쿼리스트링이란? 사용자가 입력 데이터를 전달하는 방법중의 하나로, url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다. 
	       쉽게 말해 URL의 뒤에 입력 데이터를 함께 제공하는 가장 단순한 데이터 전달 방법

## 4. 컴포넌트 라우터형태로 변경
	1. index.js 에 
	2. import {BrowserRouter}
	3. <app/>을 <BrowserRouter>로 감싸기 (react.strictmode 삭제)

	4. app.js에
	5. import {Routes, Route} 
	6. return( <Routes> 
		   <Route path = '/' element = {< 컴포넌트명1/>} /> 
		   <Route path = '/path명' element = {< 컴포넌트명2/>} /> 
          	   </Routes>);

 	   >> '/' === 홈
	   >> '/path명'	=> path명은 컴포넌트 이름과 다르게 써도 된다. 마음대로 but 알아볼 수 있도록.
	   >> 패키지가 바뀌면 라우터 적용 형태가 달라질 수 있다. 현재 사용하는건 react-router-dom
	   >> (주의) 라우터 값을 넘겨줄 수 있다.----> 의미 재확인

## 5. 오픈 API 끌고오기
	1. api 사이트에서원하는 응답예시에서 url 복사해서 원하는 컴포넌트에 붙이기
	(1)     const get이름(함수명) =() => {
		let url = " url copy" ;
		}
		>> url은 반드시 **https**로 사용하기! 
		>> 효과적인 관리를 위해서 .json? 이하 잘라서 관리
		ex)    let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        		url = url + "key=" + "f5eef3421c602c6cb7ea224104795888";
        		url = url + "&targetDt=" + '20120101';

## 6. 패치(비동기 통신)
	>> 비동기 통신이란? request을 날린 후 response를 기다리지 않고 다른 일을 동시에 request 하여 계속 반환이 되는 방식. 
	   빠른 성능이 요구되는 서비스에 적절.  
	>> promise: 비동기 처리시 사용되는 객체. promise가 성공하면 resolve, 실패하면 reject 호출. 
	   resolve 호출  → .then 실행, reject 호출 → .catch 실행
	   	
	1. then..catch구문
		fetch(url)
			.then((response) => {return response.json()});		// response오면 json형식으로 return 해 주세요 (= ".then((resp) => resp.json())")
			.then((date) => {consol.log(data)});			// data 호출 성공하면 콘솔에 찍어주세요
			.catch((err) => {err});					// err 나면 catch


	2. async 함수(err잡기 위해서 try-catch구문안에 넣어준다.)	// async&await: 비동기식 코드를 동기식으로 표현하여 간단하게 나타내는 것. 
 		const get이름(함수명) = async () => {				promise객체를 반환한다.
			let url = "..."
			url = url + "key=" + "...";
			url = url + "..." + "...";
	
		try{
			const resp = await fetch(url);
			const data = await resp.json();

			console.log(data);	>> 이후 data에 정확히 필요한 data의 내용을 집어준다.
		} catch(err) {
			console.log(err)
		}

 ![image](https://user-images.githubusercontent.com/51871037/198874343-ac59bd7c-9491-4a8d-8315-1a83cc0b25c6.png)<br>
   *프로미스 처리 흐름 - 출처 : MDN* 

## 7. hook{useState, useEffect, useRef}

	1. import {useEffect} 		// useEffect: 컴포넌트 랜더링 시 특정 작업을 실행시키는 Hook. 

	2. fetch 다음에
		useEffect(()=>{			
			getBoxoffice(d);	//첫 랜더링시 api에서 데이터 끌고오는데 d 선언 후 d를 집어넣어 '어제날짜의 Boxoffice'불러오도록 지정.
		}, []) 			  //[] 디펜던시 변수를 쓰면 처음 랜더링에만 실행. 안쓰면 랜더링 할 때 마다 실행. 
					     useEffect(() => {함수();}, []);


## 7. 어제날짜 추출(useEffect Hook 사용, 랜더링 시 날짜를 어제날짜로 고정시킨다.)
	1. const yesterday = new Date();     //yesterday 객체생성. Date()를 쓰면 default로 날짜형식이 들어오면서 오늘날짜로 설정된다. 페이지 랜더링시 오늘 날짜로 고정.
	2. yesterday.setDate(yesterday.getDate()-1);     // yesterday에 Date를 set하는데 Date()-1을 get 한다고 정의


## 8. 디폴트 날짜 ISOString으로 표기(첫 랜더링에 사용)
 	3. console.log(yesterday.toISOString());     // ISOString: ISO 표준을 사용하여 Date 객체를 문자열로 반환. (ISO 표준 = YYYY-MM-DDTHH:mm:ss.sssZ)
				 		     // 그런데 이 함수를 사용하면 날짜가 하루 전 날짜가 찍힌다. 이유는 이 함수가 우리나라 Time Zone 이 아니라 
						     	UTC 타임존(zero offset)을 사용하기 때문이다. 
						     // 해결책: new Date(utc + 9 * 60 * 60 * 1000).toISOString().replace("T", " ").replace(/\..*/, ""); 
						         → UTC 밀리초 값에 9시간(밀리초로 변환한 값)을 더한후 'new Date()'을 사용하여 밀리초값을 date으로 변환.
							   T떼고 이하생략

## 9.어떤 데이터를 끌고 올지? 콕 집어내기(패치한 부분의 data를 체인으로 연결해서 원하는 데이터까지 들어간다.)
	ex)   try {
		   const resp = await fetch(url);
		   const data = await resp.json();

		   console.log(data.boxOfficeResult.dailyBoxOfficeList);     //해당부분! data중에서 boxOfficeResult안에 있는 dailyBoxOfficeList를 쓸게요.
		   }   catch (err) {
		       console.log(err)
		   }
	       }

## 10. 날짜 데이터에 '-'삭제하기
	let d = yesterday.toISOString().substring(0,10).replaceAll("-",""); 
	//(앞에서 선언한)어제날짜를.ISO기준 날자표현 문자열로 변환하는데.문자열의0에서10번째까지중.모든-를 공백으로 처리해서 d에 대입. 
	// useEffect(()=>{},[]) 디펜던시 변수가 사용된 useEffect Hook 안에 선언되어 있으므로 첫번째 랜더링시에만 적용되는데 이 때 날짜를 어제 날짜로 디폴트. 

## 11. 첫페이지 랜더링 시 달력에 어제 날짜 표시 
	1. import {useState} 	//처음 랜더링 할 때만 어제날짜로 표시하면 되므로 useSate Hook 사용
	2. const [Viewday, setViewday] = useState();	//변수 정의. useState사용할때는 반드시 [변수명, set변수명] 세트로 사용  
	
	3. setViewday(d);		//useState가 반영 되도록 Effect를 준다. (useEffect 함수 안에), yesterday정의 후에.
	    //위에서 d를 어제날짜로 정의해 놓았으므로 첫페이지에서는 디폴트값으로 어제 날짜가 지정된다.

---
↓ 이후 다시 정리
## 12. 선택한 날짜별로 (선택날짜: date) 바꾸기 
	* (날짜 선택할때마다 바뀌면서 실행해야 하므로) useState Hook 사용
	1. const[Viewday2, setViewday2] = useState();		// useState: 내용변경하고 싶을때 set이 일어나면 해당부분만 재랜더링 됨. 배열을 반환.
								   선언방식 : const[상태값, 상태업데이트함수] = useState(초기값);
	2. useRef Hook 사용 	//특정 태그만 지정해서 그것만 사용할 때 useRef 사용.  
    	  
	   const refDateIn = useRef();		//변수명 옆에 기호 아무것도 없다! 

	3. useEffect(() => {
		(Viewday && setViewday2(Viewday.substring(0,4) + '.' + Viewday.substring(4,6) + '.' + Viewday.substring(6,8)))
		getBoxoffice(Viewday)        
	    }, [Viewday])
	    // 날짜 Viewday 선택되고 setViewda2 될 때(Viewday 문자열의 0~4까지 + . + Viewday 문자열의 4~6까지 + . + Viewday 문자열 6~8번째 까지 출력하는데
	    	Boxoffice데이터도 Viewday에 맞게 불러옴, Viewday처음 랜더링될 때)
		
	4. (선택날짜:{Viewday2}) //return에서 브라우저 출력.
	
	

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

