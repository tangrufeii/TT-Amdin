class TTDailyQuoteElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._widgetProps = {};
    this._portalContext = {};
  }

  set widgetProps(value) {
    this._widgetProps = value || {};
    this.render();
  }

  get widgetProps() {
    return this._widgetProps;
  }

  set portalContext(value) {
    this._portalContext = value || {};
    this.render();
  }

  get portalContext() {
    return this._portalContext;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }

    const badge = this._widgetProps.badge || 'Daily Quote Widget';
    const quote = this._widgetProps.quote || 'Make the portal pluggable.';
    const description = this._widgetProps.description || 'This widget is rendered as a custom element.';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .quote-card {
          padding: 20px 22px;
          border-radius: 22px;
          background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
          color: #eff6ff;
          box-shadow: 0 18px 38px rgba(15, 23, 42, 0.28);
        }

        .badge {
          display: inline-flex;
          margin-bottom: 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        blockquote {
          margin: 0 0 12px;
          font-size: 20px;
          line-height: 1.8;
        }

        p {
          margin: 0;
          color: rgba(239, 246, 255, 0.82);
          font-size: 13px;
          line-height: 1.8;
        }
      </style>
      <section class="quote-card" data-theme-key="${this._portalContext.themeKey || ''}">
        <span class="badge">${badge}</span>
        <blockquote>${quote}</blockquote>
        <p>${description}</p>
      </section>
    `;
  }
}

if (!customElements.get('tt-daily-quote')) {
  customElements.define('tt-daily-quote', TTDailyQuoteElement);
}
