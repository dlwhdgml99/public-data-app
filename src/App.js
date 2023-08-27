import "./App.css";
import { useState, useContext, useEffect, useRef } from "react";
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const seoul = [
  { siDo: 11, guGun: 110, name: "종로구",
  latlng: { lat: 37.57350516307235, lng: 126.97909749457394  } },
  { siDo: 11, guGun: 140, name: "중구",
  latlng: { lat: 37.563821287489425, lng: 126.9976627085749 } },
  { siDo: 11, guGun: 170, name: "용산구",
  latlng: { lat: 37.53238283186788, lng: 126.99053596460833 } },
  { siDo: 11, guGun: 200, name: "성동구",
  latlng: { lat: 37.56343262918586, lng: 127.03687298521992 } },
  { siDo: 11, guGun: 215, name: "광진구",
  latlng: { lat: 37.53857141919549, lng: 127.08232636701145 } },
  { siDo: 11, guGun: 230, name: "동대문구",
  latlng: { lat: 37.574448644726125, lng: 127.03967167794465 } },
  { siDo: 11, guGun: 260, name: "중랑구",
  latlng: { lat: 37.606552660913124, lng: 127.09286843026284 } },
  { siDo: 11, guGun: 290, name: "성북구",
  latlng: { lat: 37.589367818020555, lng: 127.01675442490084 } },
  { siDo: 11, guGun: 305, name: "강북구",
  latlng: { lat: 37.639760798957305, lng: 127.02548708958732 } },
  { siDo: 11, guGun: 320, name: "도봉구",
  latlng: { lat: 37.66868919361537, lng: 127.04712038861284 } },
  { siDo: 11, guGun: 350, name: "노원구",
  latlng: { lat: 37.654366296022005, lng: 127.05635851835177 } },
  { siDo: 11, guGun: 380, name: "은평구",
  latlng: { lat: 37.60280388165411, lng: 126.92887361355965 } },
  { siDo: 11, guGun: 410, name: "서대문구",
  latlng: { lat: 37.57914832604899, lng: 126.93677265234179 } },
  { siDo: 11, guGun: 440, name: "마포구",
  latlng: { lat: 37.56621324679613, lng: 126.90190420701576 } },
  { siDo: 11, guGun: 470, name: "양천구",
  latlng: { lat: 37.5169995426864, lng: 126.86632888927976 } },
  { siDo: 11, guGun: 500, name: "강서구",
  latlng: { lat: 37.55095381069841, lng: 126.84953943955726 } },
  { siDo: 11, guGun: 530, name: "구로구",
  latlng: { lat: 37.49542448643574, lng: 126.88746292140978 } },
  { siDo: 11, guGun: 545, name: "금천구",
  latlng: { lat: 37.45683703252599, lng: 126.89538727565582 } },
  { siDo: 11, guGun: 560, name: "영등포구",
  latlng: { lat: 37.5263662466818, lng: 126.8962433750687 } },
  { siDo: 11, guGun: 590, name: "동작구",
  latlng: { lat: 37.512480229889746, lng: 126.93929469828963 } },
  { siDo: 11, guGun: 620, name: "관악구",
  latlng: { lat: 37.47833325137941, lng: 126.95159748947869 } },
  { siDo: 11, guGun: 650, name: "서초구",
  latlng: { lat: 37.48358249528936, lng: 127.03276337268326 } },
  { siDo: 11, guGun: 680, name: "강남구",
  latlng: { lat: 37.51733596289783, lng: 127.04742096050717 } },
  { siDo: 11, guGun: 710, name: "송파구",
  latlng: { lat: 37.51454314137067, lng: 127.10595441255566 } },
  { siDo: 11, guGun: 740, name: "강동구",
  latlng: { lat: 37.5301942443375, lng: 127.12376987575654 } }
];

const years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];

function fetchData(city, year) {
  // 자바스크립트에 내장된 fetch() 메서드를 사용하여 서버에 요청한다
  const promise = fetch(
    `https://apis.data.go.kr/B552061/frequentzoneOldman/getRestFrequentzoneOldman?serviceKey=HCIrHlY8LBMmrZUqfszs9tCQlLxNhLe3n4NpV7T%2Fb8hEjmQ3a5W3P0YN4BdfnzD4HU7FwANXip8HJdlTOBErpQ%3D%3D&searchYearCd=${year}&siDo=${city.siDo}&guGun=${city.guGun}&type=json&numOfRows=10&pageNo=1`
  ).then((res) => {
    // 서버의 응답코드(status)가 200(성공)이 아닌 경우 catch 블록에 응답 객체를 던진다
    if (!res.ok) {
      throw res;
    }
    // 서버의 응답코드가 200인 경우 응답객체(프로미스 객체)를 리턴한다
    return res.json();
  });

  return promise;
}

// 메인 컴포넌트
export default function App() {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(years[0]);
  const [city, setCity] = useState(seoul[0]);
  const [yearChange, setYearChange] = useState(false);
  const [areaChange, setAreaChange] = useState(false);

  useEffect(() => {

    fetchData(city, year)
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [city, year]);

  if (!data) {
    return (
      <div claaName="loaderContainer">
        <div className="loader">
          <p className="loadName">LOADING...</p>
          <div className="loadCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <header>
        <nav claaName="year">
          <span className="yearName">
            <button className={yearChange ? 'show' : ''} onClick={() => setYearChange(!yearChange)}>{year}</button>
          </span>
          <ul className={yearChange ? 'yearSelect' : 'yearSelect hidden'}>
            {years.map(year => (
              <li>
                <button
                  key={year}
                  onClick={() => {
                    setYear(year)
                    setYearChange(false)
                  }}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
          <p className="title">년 서울특별시</p>
        </nav>
        <nav className="seoul">
          <span className="areaName">
            <button className={areaChange ? 'show' : ''} onClick={() => setAreaChange(!areaChange)}>{city.name}</button>
          </span>
          <ul className={areaChange ? 'areaSelect' : 'areaSelect hidden'}>
            {seoul.map(city => (
              <li>
                <button
                  key={city.guGun}
                  onClick={() => {
                    setCity(city)
                    setAreaChange(false)
                  }}
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="title">보행노인 사고다발구역</p>
        </nav>
      </header>
      <main>
        {data.totalCount > 0 ? (
          <>
            <Rechart accidents={data.items.item} />
            <KakaoMap accidents={seoul} setCity={setCity} />
          </>
        ) : (
          <p className="noData">자료가 없습니다.</p>
        )}
      </main>
    </>
  );
}

// 차트 라이브러리
function Rechart({accidents}) {
  console.log(accidents);

  const chartData = accidents.map(accident => {
    return {
      name:  accident.spot_nm.split(' ')[2] + ")",
      발생건수: accident.occrrnc_cnt,
      사상자수: accident.caslt_cnt,
      사망자수: accident.dth_dnv_cnt,
      중상자수: accident.se_dnv_cnt,
      경상자수: accident.sl_dnv_cnt,
      부상신고자수: accident.wnd_dnv_cnt
    }
  })
  // console.log(chartData)/

  return (
    <>
      <div className="rechartContainer">
        <h3 className="total"><p>총 <span>{accidents.length}</span>건이 조회되었습니다.</p></h3>
        <div className="rechart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} tick={CustomizedTick} />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{width:"100%", bottom:-20}} />
              <Line dataKey="발생건수" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line dataKey="사상자수" stroke="#82ca9d" />
              <Line dataKey="사망자수" stroke="#ffc658" />
              <Line dataKey="중상자수" stroke="#e296b2" />
              <Line dataKey="경상자수" stroke="#8cbae7" />
              <Line dataKey="부상신고자수" stroke="#c67e45" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

// 카카오 지도
function KakaoMap({accidents, setCity}) {
  console.log(accidents);

  function marker(city) {
    setCity(city)
  }


  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 37.5666805,
        lng: 126.9784147,
      }}
      
      level={9} // 지도의 확대 레벨
    >
      {accidents.map((accident, index) => (
        <MapMarker
          key={`${accident.name}-${accident.latlng}`}
          position={accident.latlng} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35
            }, // 마커이미지의 크기입니다
          }}
          title={accident.name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          onClick={() => marker(accident)}
        />
      ))}
    </Map>
  )
}

function CustomizedTick(props) {
  const {x, y, storke, payload} = props;

  let m = payload.value.match(/\((.*?)\)/);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="666">
        <tspan textAnchor="middle" x="0">
          {payload.value.split('(')[0]}
        </tspan>
        {/* <tspan textAnchor="middle" x="0" y="30" d="20">
          {m[1]}
        </tspan> */}
      </text>
    </g>
  )
}