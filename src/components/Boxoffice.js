import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import './Boxoffice.css';

export default function BoxOfficeList() {
    
    //State Hook 선언
    const [Viewday, setViewday] = useState(); //useState사용할때는 반드시 [변수명, set변수명] 세트로 사용 
    const [Viewday2, setViewday2] = useState();
    const [mvList, setmvList] = useState([]);  //첫화면에서 mvList주는데 배열로 초기화

    // ref Hook 선언
    const refDateIn = useRef(); //변수명 옆에 기호 아무것도 없다! 
    
    //then..catch구문
    /*
    const getBoxoffice =() =>  {
        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + 'key=' + "f5eef3421c602c6cb7ea224104795888";
        url = url + "&targetDt=" + '20120101'
    // 패치 방법 1) 비동기 통신(패치)
        fetch(url)
            // .then((resp)=>{console.log(resp)})
            .then((resp) => {return resp.json()})  // ==> .then((resp) => resp.json())  둘은 같은 문장. return을 쓰면 {}으로 묶어주고, 안쓰면 {} 안써! 
            .then((data)=>{console.log(data)})
            .catch((err)=>{console.log(err)});
    }
    */

    //async 함수
    const getBoxoffice = async (d) =>  {
        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + 'key=' + "f5eef3421c602c6cb7ea224104795888";
        url = url + "&targetDt=" + d;       // url마지막에 날짜를 d 변수로 설정. 그래야 선택날짜에 따라서 데이터가 넘어온다. d변수를 설정하기위해서 anync(d)로 선언해준다.
    
    //비동기 통신(패치)
        try {
        const resp = await fetch(url);
        const data = await resp.json();

        //console.log(data.boxOfficeResult.dailyBoxOfficeList);
        // console.log(data);
        let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList; //길이가 길어서 변수에 넣어둠
        
        setmvList(
            dailyBoxOfficeList.map((item)=> <li key = {item.movieCd} className="mvlist"> {/* mvList를 useState변수를 사용하여 배열로 선언했기 때문에 map으로 쓸 수 있음. 원하는데이터를 {} 안에 넣는데 유니크한 키값을 지정해줘야 하기 때문에 모든 배열에 공통으로 들어가있는 movieCd를 키값으로 지정. {} 에 넣는 점 유의. item은 배열 이름을 item으로 준 것. */}
            
                <Link to = {"/mvinfo" + "?mvcd=" + item.movieCd}>   {/* "/mvinfo" 뒤에 "?mvcd=" 등과 같은 파라미터 원하는대로 설정 후 원하는 데이터 붙인다. */}
                    <div className="mvRank">{(item.rank)}</div>
                    <div className="mvNm">{item.movieNm}</div>
                    <div className="popul">{item.rankInten > 0 ? '⬆' : item.rankInten < 0? '⬇' : ''}
                     {/*map에서는 if조건문 못써서 삼항연산자로 조건걸어준다. rankInten이 0보다 크면 '⬆', 아니면 '⬇', 그 외 나머지는 ''(공백) */}
                    {Math.abs(Number(item.rankInten))}</div>
                    {/* rankInten의 값을 절대값으로 준다.*/}
                    
                </Link> {/*  BoxMv 페이지로 연결하는 링크 설정 */}
            </li>)   //li가 여러개니까 각각 key를 줘야함
        )   }   catch (err) {
            console.log(err)
     
        }
    }

    //페이지가 처음 렌더링 되었을 때 실행되는 HOOK
    useEffect(()=>{

        //boxoffice의 경우 어제날짜까지 업데이트 되어있으므로 어제날짜까지 데이터 추출
        const yesterday = new Date();  //일단 yesterday 정의 default로 날짜형식이 들어옴, 페이지에 들어오면 디폴트로 오늘날짜로 뜬다. (Date()의 디폴트값이 오늘날짜라서)
        yesterday.setDate(yesterday.getDate()-1); //yesterday에 Date(오늘날짜)를 주고 -1을 해주면 어제 날짜로 뽑힌다.
        console.log(yesterday.toISOString());    

        //날짜 데이터에 '-'를 삭제
        let d = yesterday.toISOString().substring(0,10).replaceAll("-",""); //subString(0,10) : 문자열의 의 0에서 10번째 
        console.log(d);
       
        //State Hook 반영
        setViewday(d); // 날짜별로 viewDay가 바뀐
        
        //페이지 처음 랜딩시 api에서 데이터 끌고오기 완료
        getBoxoffice(d);
    }, []);  // [] 디펜던시 변수를 쓰면 처음 랜더링에만 실행

    useEffect(() => {
        (Viewday && setViewday2(Viewday.substring(0,4) + '.' + Viewday.substring(4,6) + '.' + Viewday.substring(6,8)))
        getBoxoffice(Viewday)       //날짜 바뀌고(&&) 
    }, [Viewday])
    //event 함수
    const handleChange = (e) => {
        e.preventDefault();  //화면이 자동으로 처음으로 돌아가는걸 막아줌

        setViewday(refDateIn.current.value.replaceAll("-","")); //ref함수는 current로 받아준다. 
    }


    return(
        <>
            <div className = "head"><h1> 박스오피스 리스트 <span> (선택 날짜: {Viewday2})</span> </h1> </div>
    
            <form className="calendar">
                <input type = "date" name = "dateIn" ref = {refDateIn} onChange={handleChange}></input>
            </form>
            <ul className="colNm">
                    <li className="colNm1"> 순위</li>
                    <li className="colNm2"> 영화 제목</li>
                    <li className="colNm3"> 순위 변동</li>
                </ul>
            <div>
                {mvList}
            </div>
            <div className="btn_wrap2">
            <button className="none"><Link to = "/" > ↑ </Link></button>
            </div>
        </>
    );
}