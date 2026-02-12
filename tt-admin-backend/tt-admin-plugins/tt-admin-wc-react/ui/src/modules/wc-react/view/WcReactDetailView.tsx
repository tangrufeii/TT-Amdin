import { useMemo } from 'react';

export default function WcReactDetailView() {
  const detail = useMemo(
    () => ({
      id: 'A001',
      customer: '张三',
      amount: '¥ 199.00',
      address: '上海市浦东新区世纪大道 100 号',
      remark: '请尽快发货'
    }),
    []
  );

  return (
    <div className="wc-page">
      <div className="wc-card">
        <h3>WC React 详情页</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          <div>
            <strong>订单编号：</strong>
            {detail.id}
          </div>
          <div>
            <strong>客户名称：</strong>
            {detail.customer}
          </div>
          <div>
            <strong>订单金额：</strong>
            {detail.amount}
          </div>
          <div>
            <strong>收货地址：</strong>
            {detail.address}
          </div>
          <div>
            <strong>备注：</strong>
            {detail.remark}
          </div>
        </div>
      </div>
    </div>
  );
}

