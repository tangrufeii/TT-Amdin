import { useEffect, useState } from 'react';

export default function WcReactView() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleString());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="wc-page">
      <div className="wc-card">
        <h3>Web-Component React Template React</h3>
        <p className="wc-tip">
          Mode: <span className="wc-code">plugin-dev / host</span>
        </p>
        <p className="wc-tip">
          Time: <span className="wc-code">{now}</span>
        </p>
        <p className="wc-tip">Edit this file and the host page will hot-reload this view.</p>
      </div>
    </div>
  );
}

