import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [ confirmed, setConfirmed ] = useState({
    description: '',
    total: 0,
    dailyChange: {
      subtotal: 0,
      local: 0,
      imported: 0
    }
  });
  const [ released, setReleased ] = useState({
    description: '',
    total: 0,
    dailyChange: 0
  });
  const [ quarantined, setQuarantined ] = useState({
    description: '',
    total: 0,
    dailyChange: 0
  });
  const [ deceased, setDeceased ] = useState({
    description: '',
    total: 0,
    dailyChange: 0
  });
  const [ now, setNow ] = useState('');

  useEffect(() => {
    (async function() {
      const res = await axios({
        url: 'corona/api',
        method: 'POST'
      });
      
      const { data } = res.data;
      console.log(data);
      
      setConfirmed(data.confirmed);
      setReleased(data.released);
      setQuarantined(data.quarantined);
      setDeceased(data.deceased);
      setNow(data.date);
    })();
  },[]);

  return (
    <>
      <h2>누적 확진자 현황 <span style={{ fontSize: 16 }}>{`( ${now} )`}</span></h2>
      <table id='corona-table' style={{ borderCollapse: 'collapse', borderTop: '3px solid #333', borderBottom: '3px solid #333' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #333', borderRight: '2px solid #333', backgroundColor: '#aaa' }} colSpan={4}>확진 환자</th>
            <th style={{ borderBottom: '2px solid #333', borderRight: '2px solid #333', backgroundColor: '#aaa' }} colSpan={2}>격리 해제</th>
            <th style={{ borderBottom: '2px solid #333', borderRight: '2px solid #333', backgroundColor: '#aaa' }} colSpan={2}>격리 중</th>
            <th style={{ borderBottom: '2px solid #333', backgroundColor: '#aaa' }} colSpan={2}>사망</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>누적</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }} colSpan={3}>전일대비</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>누적</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>전일대비</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>누적</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>전일대비</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>누적</th>
            <th style={{ borderBottom: '2px solid #333', backgroundColor: '#ccc' }}>전일대비</th>
          </tr>
          <tr>
            <td style={{ borderRight: '2px solid #333' }} rowSpan={2}>{confirmed.total}</td>
            <th style={{ borderRight: '2px solid #333', borderBottom: 'double #333', backgroundColor: '#eee' }}>소계</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: 'double #333', backgroundColor: '#eee' }}>국내발생</th>
            <th style={{ borderRight: '2px solid #333', borderBottom: 'double #333', backgroundColor: '#eee' }}>해외유입</th>
            <td style={{ borderRight: '2px solid #333' }} rowSpan={2}>{released.total}</td>
            <td style={{ borderRight: '2px solid #333', color: '#ff2323' }} rowSpan={2}>+{released.dailyChange}</td>
            <td style={{ borderRight: '2px solid #333' }} rowSpan={2}>{quarantined.total}</td>
            <td style={{ borderRight: '2px solid #333', color: '#ff2323' }} rowSpan={2}>+{quarantined.dailyChange}</td>
            <td style={{ borderRight: '2px solid #333' }} rowSpan={2}>{deceased.total}</td>
            <td style={{ color: '#ff2323' }} rowSpan={2}>+{deceased.dailyChange}</td>
          </tr>
          <tr>
            <td style={{ borderRight: '2px solid #333', color: '#ff2323' }}>+{confirmed.dailyChange.subtotal}</td>
            <td style={{ borderRight: '2px solid #333', color: '#ff2323' }}>{confirmed.dailyChange.local}</td>
            <td style={{ borderRight: '2px solid #333', color: '#ff2323' }}>{confirmed.dailyChange.imported}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default App;