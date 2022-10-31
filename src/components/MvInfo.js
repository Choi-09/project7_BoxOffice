import './MyInfo.css';

function MvInfo(props) {

    const mvinfo = props.m.movieInfoResult.movieInfo; //원하는 object 정보에 접근
    
    //화면에 출력할 정보를 오브젝트로 생성
    let myinfo = {};
    const key1 = ['movieNm']  //배열아닌 키값
    const key2 = ['directors', 'actors', 'genres', 'audits', 'nations'] // 배열 키값
    const key3 = ['showTm']
    const key4 = ['openDt']

    //key를 한국어로 바꿀 오브젝트 생성
    const keys = {
        'movieNm' : '영화명',
        'directors' : '감독', 
        'actors' : '배우',
        'genres' : '장르', 
        'audits' : '관람등급',
        'nations' : '제작국가', 
        'showTm' : '상영시간',
        'openDt' : '개봉일자'
    }

    //key1에 해당하는 값 추출
    for(let k of key1) {
        myinfo[keys[k] ] = mvinfo[k];    
    }

    //key2에 해당하는 값 추출: 배열에서 추출
    for(let k of key2) {
        switch(k) {
            case 'directors' :
                myinfo[keys[k]]= mvinfo[k].map((item)=> item.peopleNm);
                break;
            case 'actors' :
                myinfo[keys[k]]= mvinfo[k].map((item)=> item.peopleNm).slice(0,5).join("," + '\u00A0');
                break;
            case 'genres' :
                myinfo[keys[k]]= mvinfo[k].map((item1)=> item1.genreNm ).slice(0,2).join("," + '\u00A0');
                break;
            case 'audits' :
                myinfo[keys[k]]= (mvinfo[k].map((item)=> item.watchGradeNm.substring(0,3) + '\u00A0' + item.watchGradeNm.substring(3,5) + '\u00A0' + item.watchGradeNm.substring(5,8)));
                break;
            case 'nations' :
                myinfo[keys[k]]= mvinfo[k].map((item)=> item.nationNm);
                break;
            default :
            break;
        }
    }
    
    for(let k of key3) {
        myinfo[keys[k]] = mvinfo[k] + "분";
    }
    
    for(let k of key4) {
        myinfo[keys[k]] = (mvinfo[k].substring(0,4) + ". " + mvinfo[k].substring(4,6) + ". " + mvinfo[k].substring(6,8));
    }
    
    //화면에 출력할 내용을 JSX로 만들기
    let lis = [];

    //key(k)와 값(v) 출력하기
    for(let [k,v] of Object.entries(myinfo)) {
        lis.push(
            <div key={myinfo.movieCd + k} className="kkey">
                <div className='keytitle'>{k+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'}</div>
                <div className='keyvalue'>{'\u00A0'+'\u00A0' + v}</div>
            </div>);
    }                  // 다음 추가하는 movieCd와 충돌이 나지않게 li키 설정

    return(
        <>
        <h1>영화 상세</h1>  
        <div className='info'>
            {lis} 
        </div>
        </>
    );
}
export default MvInfo;

//useState: 내용변경하고싶을때 > set이 일어나면 해당부분만 재랜더링
//

//form tag : reset, submit, 