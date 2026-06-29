(function () {
  const config = window.TT_PORTAL_WIDGET_CONFIGS?.weather || {};
  const widget = document.querySelector('[data-widget-key="weather"]');
  if (!widget) return;

  const refs = {
    temperature: widget.querySelector('[data-role="temperature"]'),
    location: widget.querySelector('[data-role="location"]'),
    summary: widget.querySelector('[data-role="summary"]'),
    meta: widget.querySelector('[data-role="meta"]')
  };

  renderStatus('天气数据加载中', config.city || '正在解析位置');
  loadWeather();

  const minutes = Number(config.autoRefreshMinutes || 0);
  if (minutes > 0) {
    window.setInterval(loadWeather, minutes * 60 * 1000);
  }

  async function loadWeather() {
    try {
      const location = await resolveLocation(config);
      const weather = await fetchWeather(location, config);
      renderWeather(location, weather);
    } catch (error) {
      renderStatus(error.message || '天气数据加载失败', config.city || '位置不可用');
    }
  }

  async function resolveLocation(options) {
    const mode = options.locationMode || 'city';
    if (mode === 'browser') {
      try {
        return await resolveBrowserLocation(options);
      } catch {
        if (hasCoordinate(options)) {
          return resolveCoordinateLocation(options);
        }
        return await resolveCityLocation(options);
      }
    }
    if (mode === 'coordinate' && hasCoordinate(options)) {
      return resolveCoordinateLocation(options);
    }
    return await resolveCityLocation(options);
  }

  function hasCoordinate(options) {
    return Number.isFinite(Number(options.latitude)) && Number.isFinite(Number(options.longitude));
  }

  function resolveCoordinateLocation(options) {
    return {
      name: options.city || '自定义坐标',
      latitude: Number(options.latitude),
      longitude: Number(options.longitude),
      timezone: options.timezone || 'auto'
    };
  }

  function resolveBrowserLocation(options) {
    if (!navigator.geolocation) {
      return Promise.reject(new Error('当前浏览器不支持定位'));
    }
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            name: options.city || '当前位置',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone: options.timezone || 'auto'
          });
        },
        () => reject(new Error('浏览器定位失败')),
        {
          enableHighAccuracy: false,
          timeout: 6000,
          maximumAge: 10 * 60 * 1000
        }
      );
    });
  }

  async function resolveCityLocation(options) {
    const city = options.city || '杭州';
    const params = new URLSearchParams({
      name: city,
      count: '1',
      language: 'zh',
      format: 'json'
    });
    if (options.countryCode) {
      params.set('countryCode', options.countryCode);
    }
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`);
    if (!response.ok) {
      throw new Error('城市位置解析失败');
    }
    const payload = await response.json();
    const result = payload.results?.[0];
    if (!result) {
      if (hasCoordinate(options)) {
        return resolveCoordinateLocation(options);
      }
      throw new Error(`未找到城市：${city}`);
    }
    return {
      name: [result.name, result.admin1, result.country].filter(Boolean).join(' / '),
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: options.timezone || result.timezone || 'auto'
    };
  }

  async function fetchWeather(location, options) {
    const params = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      timezone: location.timezone || 'auto',
      temperature_unit: options.temperatureUnit || 'celsius',
      wind_speed_unit: options.windSpeedUnit || 'kmh'
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) {
      throw new Error('天气服务请求失败');
    }
    const payload = await response.json();
    if (!payload.current) {
      throw new Error('天气服务返回为空');
    }
    return {
      current: payload.current,
      units: payload.current_units || {}
    };
  }

  function renderWeather(location, weather) {
    const current = weather.current;
    const units = weather.units;
    setText(refs.temperature, `${current.temperature_2m}${units.temperature_2m || '°C'}`);
    setText(refs.location, location.name);
    setText(refs.summary, `${weatherCodeText(current.weather_code)}，体感 ${current.apparent_temperature}${units.apparent_temperature || '°C'}`);
    setText(refs.meta, `湿度 ${current.relative_humidity_2m}${units.relative_humidity_2m || '%'} · 风速 ${current.wind_speed_10m}${units.wind_speed_10m || 'km/h'}`);
  }

  function renderStatus(summary, location) {
    setText(refs.temperature, '--');
    setText(refs.location, location || '位置未配置');
    setText(refs.summary, summary);
    setText(refs.meta, '');
  }

  function setText(node, text) {
    if (node) node.textContent = text;
  }

  function weatherCodeText(code) {
    const map = {
      0: '晴',
      1: '大部晴朗',
      2: '局部多云',
      3: '阴',
      45: '雾',
      48: '雾凇',
      51: '小毛毛雨',
      53: '毛毛雨',
      55: '强毛毛雨',
      61: '小雨',
      63: '中雨',
      65: '大雨',
      71: '小雪',
      73: '中雪',
      75: '大雪',
      80: '小阵雨',
      81: '阵雨',
      82: '强阵雨',
      95: '雷暴'
    };
    return map[code] || `天气代码 ${code}`;
  }
})();
