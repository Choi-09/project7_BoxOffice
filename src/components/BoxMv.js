import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import qs from 'query-string';
import MvInfo from'./MvInfo';


export default function BoxMv() {
    const loc = useLocation().search;      
    console.log(loc);       //useLocation Hook을 사용하면 볼 수 있는 데이터 확인. 이 중에서 search가 필요하기 때문에 loc상단에 .search붙임

    //1 mvcd변수 선언
    const mvcd = qs.parse(loc).mvcd;
    //2 log
    console.log(mvcd);  //결과가 오브젝트로 나오기 때문에 qs.parse(loc)에 .mvcd 붙일 수 있다.

    //useState
    const [mv, setMv] = useState();
    const [mvinfo, setMvinfo] = useState();

    //getMovie 함수 설정 : async사용하기 위해서. 
    const getMovie = async(mvcd) => {
        let url = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?";
        url = url + "key=" + "f5eef3421c602c6cb7ea224104795888";
        url = url + "&movieCd=" + mvcd;

        const resp = await fetch(url) ; //async는 respond-await fetch(url), data-await resp.json()과 세트.
        const data = await resp.json();
        // console.log(data);
        setMv(data);

    }    

    //useEffect : 첫랜더링에만 표시되면 되니까. useEffect안에서는 async을 바로 쓸 수 없다. let url로 설정하거나 getMovie 함수 설정 후 async
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
            <form>
                <button><Link to ="/"> 홈으로 </Link></button>
            </form>
        </>
    );
}
