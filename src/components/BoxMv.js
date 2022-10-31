import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import qs from 'query-string';
import MvInfo from'./MvInfo';
import './MyInfo.css';


export default function BoxMv() {
    //필요한 정보의 위치를 집어서 쿼리스트링을 보여준다.
    const loc = useLocation().search;   // useLocation :사용자가 현재 머물러있는 페이지에 대한 정보를 알려주는 hook. 대표적으로 pathname, search라는 객체가 출력됨. search: url에서 pathname을 제외한 쿼리스트링(?이하)이 출력됨
    console.log(loc);       //useLocation Hook을 사용하면 볼 수 있는 데이터 확인. 이 중에서 search가 필요하기 때문에 loc상단에 .search붙임

    // qs.parse로 쿼리스트링을 받고 value를 객체로 만들어준다.
    //1 mvcd변수 선언
    const mvcd = qs.parse(loc).mvcd;    //qs.parse: 인자로 String 타입의 파싱될 URL 쿼리 스트링(key=value&key=value&key=value)을 받아서 그것을 key: value 들이 담긴 Object로 만들어준다.
    //2 log
    console.log(mvcd);  //결과가 오브젝트로 나오기 때문에 qs.parse(loc)에 .mvcd 붙일 수 있다.

    //useState
    //컴포넌트의 state(상태)를 관리. 상태에 따라, 다른 화면 출력
    const [mv, setMv] = useState(); //setMv된 데이터에 따라 mv 를 보여준다

    //
    const [mvinfo, setMvinfo] = useState();

    //data를 url과 패치. 해당 mvcd를 가진 url이 호출되면 data가 json값을 리턴한다.
    //getMovie 함수 설정 : async사용하기 위해서. 
    const getMovie = async(mvcd) => {   //해당 mvcd를 가진 영화를 get해서 data를 json형식으로 받아준다.
        let url = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?";
        url = url + "key=" + "f5eef3421c602c6cb7ea224104795888";
        url = url + "&movieCd=" + mvcd;

        const resp = await fetch(url) ; //async는 respond-await fetch(url), data-await resp.json()과 세트.
        const data = await resp.json(); 
        // console.log(data);
        setMv(data);

    }    

    //useEffect :리액트 컴포넌트가 랜더링 될 때마다 특정작업을 실행할 수 있도록 하는 hook. mvcd는 첫랜더링에만 표시되면 되니까 []인자 써준다. useEffect안에서는 async을 바로 쓸 수 없다. let url로 설정하거나 getMovie 함수 설정 후 async
    useEffect(()=> {
        getMovie(mvcd); //mvcd에 따라서 movie정보 가져오기
    }, [])

    useEffect(()=> {
        setMvinfo()
    }, [mvinfo])
    return(
        <>
            <ul> 
                {mv && <MvInfo m = {mv} />}
            </ul>
            <div className="btn_wrap">
                <button className="home"><Link to ="/"> 홈으로 </Link></button>
            </div>
        </>
    );
}
