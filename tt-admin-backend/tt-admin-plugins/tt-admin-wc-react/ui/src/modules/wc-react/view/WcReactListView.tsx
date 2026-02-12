import { useMemo } from 'react';

export default function WcReactListView() {
  const rows = useMemo(
    () => [
      { id: 'A001', name: '订单A', status: '处理中' },
      { id: 'A002', name: '订单B', status: '已完成' },
      { id: 'A003', name: '订单C', status: '待支付' }
    ],
    []
  );

  return (
    <div className="wc-page">
      <div className="wc-card">
        <h3>WC React 列表页</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>编号</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>名称</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>状态</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{row.id}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{row.name}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: '8px' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

