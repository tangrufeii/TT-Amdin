import { useEffect, useMemo, useState } from 'react';

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '#/plugin/iframe-react');

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash || '#/plugin/iframe-react');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const query = useMemo(() => window.location.search || '', []);

  return (
    <div className="page">
      <div className="card">
        <h2>React Iframe 插件模板</h2>
        <p className="tip">当前在 iframe 内运行，可独立于宿主 router。</p>
        <p className="tip">
          Hash 路由：<code>{hash}</code>
        </p>
        <p className="tip">
          Query：<code>{query}</code>
        </p>
        <p className="tip">可将这里替换为你自己的 React 工程产物入口。</p>
      </div>
    </div>
  );
}
