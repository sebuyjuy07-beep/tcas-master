/**
 * TCAS BLUEPRINT MASTER - CLIENT LOGIC
 * High-performance, reactive exam simulation & blueprint navigation
 */

// Global fetch interceptor to automatically attach Auth Bearer Token to all /api/ requests
const _originalFetch = window.fetch;
window.fetch = function (url, options = {}) {
    const token = localStorage.getItem('tcas_auth_token');
    if (token && typeof url === 'string' && url.startsWith('/api/')) {
        options.headers = options.headers || {};
        if (options.headers instanceof Headers) {
            if (!options.headers.has('Authorization')) {
                options.headers.set('Authorization', 'Bearer ' + token);
            }
        } else if (Array.isArray(options.headers)) {
            const hasAuth = options.headers.some(([k]) => k.toLowerCase() === 'authorization');
            if (!hasAuth) {
                options.headers.push(['Authorization', 'Bearer ' + token]);
            }
        } else {
            if (!options.headers['Authorization'] && !options.headers['authorization']) {
                options.headers['Authorization'] = 'Bearer ' + token;
            }
        }
    }
    return _originalFetch(url, options);
};

// ==========================================
// 0.2 VECTOR SVG ICON & AVATAR CREST SYSTEM
// ==========================================
const TCAS_ICONS = {
    'check': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    'check-circle': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'alert-triangle': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    'alert-circle': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    'info': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    'flame': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    'target': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    'zap': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'shield': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'brain': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-4.54z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-4.54z"/></svg>',
    'award': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7"/><path d="M14 14.66V17c0 .55.45 1 1 1h2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
    'medal': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
    'lock': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'unlock': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
    'lightbulb': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    'book': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    'clock': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'file-text': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    'package': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'clipboard': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    'play': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    'shuffle': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    'tool': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    'edit': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    'trash': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    'key': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-2 2 1.5 1.5L4 19a3 3 0 1 1-2-2l8-8 1.5 1.5 2-2-1.5-1.5 3.5-3.5z"/></svg>',
    'bookmark': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    'cpu': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    'user': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    'rotate-cw': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    'star': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'x': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
};

const TCAS_AVATARS = {
    'scholar-m': {
        name: 'Scholar Prime',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-sm)"/><path d="M32 17l19 9.5-19 9.5-19-9.5 19-9.5z" fill="#60a5fa" stroke="#93c5fd" stroke-width="2.2" stroke-linejoin="round"/><path d="M20 31.5v11c0 4.5 5.5 8 12 8s12-3.5 12-8v-11" stroke="#93c5fd" stroke-width="2.5" fill="none"/><path d="M48 29v13" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round"/><circle cx="48" cy="44" r="2.5" fill="#fbbf24"/><defs><linearGradient id="tc-av-sm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#312e81"/></linearGradient></defs></svg>'
    },
    'scholar-f': {
        name: 'Scholar Elite',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-sf)"/><path d="M32 18l17 8.5-17 8.5-17-8.5 17-8.5z" fill="#34d399" stroke="#6ee7b7" stroke-width="2" stroke-linejoin="round"/><path d="M21 31v10c0 4 5 7 11 7s11-3 11-7V31" stroke="#6ee7b7" stroke-width="2.2" fill="none"/><path d="M14 43c2-4 2-10 6-13M50 43c-2-4-2-10-6-13" stroke="#a7f3d0" stroke-width="2" stroke-linecap="round"/><circle cx="32" cy="41" r="2" fill="#fbbf24"/><defs><linearGradient id="tc-av-sf" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#0f766e"/></linearGradient></defs></svg>'
    },
    'mage': {
        name: 'Grand Sage',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-mg)"/><path d="M32 12l10 32H22L32 12z" fill="#8b5cf6" stroke="#c4b5fd" stroke-width="2" stroke-linejoin="round"/><ellipse cx="32" cy="44" rx="19" ry="5.5" fill="#6d28d9" stroke="#c4b5fd" stroke-width="2"/><circle cx="32" cy="27" r="3" fill="#fef08a"/><path d="M32 23v8M28 27h8" stroke="#fef08a" stroke-width="1.8"/><defs><linearGradient id="tc-av-mg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#581c87"/></linearGradient></defs></svg>'
    },
    'fox': {
        name: 'Cyber Fox',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-fx)"/><path d="M32 46L19 32l3-16 10 9 10-9 3 16-13 14z" fill="#f97316" stroke="#fdba74" stroke-width="2" stroke-linejoin="round"/><polygon points="32 46 25 36 39 36" fill="#ffffff"/><circle cx="26" cy="31" r="2.2" fill="#18181b"/><circle cx="38" cy="31" r="2.2" fill="#18181b"/><circle cx="32" cy="43" r="2" fill="#0f172a"/><defs><linearGradient id="tc-av-fx" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#c2410c"/></linearGradient></defs></svg>'
    },
    'lightning': {
        name: 'Thunder Bolt',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-lt)"/><polygon points="36 12 18 32 32 32 28 52 46 32 32 32 36 12" fill="#fbbf24" stroke="#fef08a" stroke-width="2.5" stroke-linejoin="round"/><defs><linearGradient id="tc-av-lt" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs></svg>'
    },
    'diamond': {
        name: 'Prism Diamond',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-dm)"/><path d="M22 22l10-10 10 10-10 30-10-30z" fill="#38bdf8" stroke="#bae6fd" stroke-width="2" stroke-linejoin="round"/><line x1="22" y1="22" x2="42" y2="22" stroke="#bae6fd" stroke-width="2"/><polyline points="22 22 32 32 42 22" stroke="#bae6fd" stroke-width="1.8"/><defs><linearGradient id="tc-av-dm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#082f49"/><stop offset="100%" stop-color="#0369a1"/></linearGradient></defs></svg>'
    },
    'rocket': {
        name: 'Aero Rocket',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-rk)"/><path d="M32 14c-5 6-8 15-8 23h16c0-8-3-17-8-23z" fill="#f43f5e" stroke="#fda4af" stroke-width="2" stroke-linejoin="round"/><path d="M24 37l-6 7 6-2M40 37l6 7-6-2" stroke="#fda4af" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="28" r="3.5" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.5"/><path d="M29 42l3 9 3-9" fill="#fbbf24"/><defs><linearGradient id="tc-av-rk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#881337"/><stop offset="100%" stop-color="#be123c"/></linearGradient></defs></svg>'
    },
    'crown': {
        name: 'Imperial Crown',
        svg: '<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><circle cx="32" cy="32" r="30" fill="url(#tc-av-cr)"/><path d="M16 43h32l4-21-9.5 7.5L32 15l-10.5 14.5L12 22l4 21z" fill="#fbbf24" stroke="#fef08a" stroke-width="2" stroke-linejoin="round"/><rect x="16" y="44" width="32" height="4.5" rx="1.5" fill="#f59e0b"/><circle cx="16" cy="21" r="2.2" fill="#fef08a"/><circle cx="32" cy="14" r="2.5" fill="#fef08a"/><circle cx="48" cy="21" r="2.2" fill="#fef08a"/><circle cx="32" cy="34" r="2.5" fill="#ef4444"/><defs><linearGradient id="tc-av-cr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#713f12"/><stop offset="100%" stop-color="#a16207"/></linearGradient></defs></svg>'
    }
};

const TCAS_AVATAR_MAP = {
    '👨‍🎓': 'scholar-m',
    '👩‍🎓': 'scholar-f',
    '🧙‍♂️': 'mage',
    '🦊': 'fox',
    '⚡': 'lightning',
    '💎': 'diamond',
    '🚀': 'rocket',
    '👑': 'crown'
};

const app = {
    // SVG & Avatar Vector Generator
    svg(name, opts = {}) {
        const template = TCAS_ICONS[name] || TCAS_ICONS['info'];
        const s = opts.size || 18;
        const c = opts.color || 'currentColor';
        const w = opts.strokeWidth || 2;
        const cls = opts.className || '';
        return template.replace(/{s}/g, s).replace(/{c}/g, c).replace(/{w}/g, w).replace(/{cls}/g, cls);
    },

    renderAvatar(key, size = 48) {
        if (!key) key = 'scholar-m';
        // Map legacy emojis or return matched SVG
        const resolvedKey = TCAS_AVATAR_MAP[key] || key;
        const av = TCAS_AVATARS[resolvedKey];
        if (av) {
            return `<div class="avatar-vector-box" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;flex-shrink:0;" title="${av.name}">${av.svg}</div>`;
        }
        if (typeof key === 'string' && (key.startsWith('http') || key.startsWith('data:'))) {
            return `<img src="${key}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:block;" alt="Avatar" />`;
        }
        return `<div class="avatar-vector-box" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;flex-shrink:0;">${TCAS_AVATARS['scholar-m'].svg}</div>`;
    },

    // Current Application State
    state: {
        currentUser: null,
        authToken: localStorage.getItem('tcas_auth_token') || null,
        selectedAvatar: 'scholar-m',
        currentView: 'dashboard',
        subjects: [],
        currentSubjectId: 'tgat1',
        activeSession: null,
        currentQuestionIndex: 0,
        userAnswers: {}, // questionId -> { selected_option_id, time_spent_seconds, is_flagged }
        timerInterval: null,
        timeRemainingSeconds: 0,
        questionStartTime: 0,
        currentMistakeFilter: 'all',
        allMistakes: [],

        // Vocab Bank state
        allVocab: [],
        currentVocabFilter: 'all',
        flashcardIndex: 0,
        activeFlashcards: [],
        selectedText: '',
        selectedContext: '',
        selectedRange: null,

        // Scratchpad state
        scratchpadData: {}, // questionId -> dataURL
        scratchTool: 'pen',
        scratchColor: '#06b6d4',
        scratchStrokeSize: 2,
        isScratchDrawing: false,
        scratchGrid: true,
        highlightMode: false,

        // TCAS Master AI state
        aiCurrentQuestionId: null,
        aiCurrentSelectedOptionId: null,
        aiChatHistory: [],
        geminiApiKey: '',
        aiSavedQuestions: [],
        aiSavedFilter: 'all',
        aiCurrentQuestionData: null,

        // CEFR Vocab Quiz state
        cefrLevels: [],
        currentCefrLevel: 'B2',
        activeCefrQuiz: null,
        cefrCurrentQuestionIndex: 0,
        cefrQuizAnswers: [],
        cefrTimerInterval: null,
        cefrTimeLeftSeconds: 15,
        cefrQuizStartTime: 0,
        cefrQuizAnswered: false,
        cefrConfigLevel: 'B2',
        cefrWordCount: 10,
        cefrTimerMode: 'per_15',
        cefrRoundTimeLimitSeconds: 180,
        cefrTotalTimeElapsed: 0,

        // Mastered Questions state
        allMastered: [],
        currentMasteredSubject: 'all',

        // Subject filters
        subjectCategoryFilter: 'all',
        subjectReadyOnlyFilter: false,
        subjectSearchQuery: '',

        // TCAS Countdown & Target Faculty
        tcasCountdownTarget: 'tgat',
        tcasCountdownInterval: null,
        dreamFaculty: localStorage.getItem('tcas_dream_faculty') || 'bba',

        // CBT Exam controls
        examFontSize: localStorage.getItem('cbt_font_size') || 'md',
        isZenMode: false,
        questionStopwatchInterval: null,
        questionStopwatchSeconds: 0
    },

    // Initialization
    async init() {
        this.updateSoundUI();
        this.bindEvents();
        this.setupTextSelectionListener();
        this.initScratchpad();
        this.setupCrossWindowScratchpadSync();
        this.initAiKeyStatus();
        this.initTcasCountdown();
        this.initDreamFaculty();
        this.applyExamFontSize();
        await this.initAuth();
        await this.loadSubjects();
        await this.loadDashboard();
        await this.loadVocab();
        await this.loadMastered();
        await this.loadUserStatus(true);
        await this.fetchSavedAiQuestions();
        this.renderMath();
    },

    // Event Bindings
    bindEvents() {
        // Keyboard navigation during exam
        window.addEventListener('keydown', (e) => {
            if (this.state.currentView !== 'exam' || !this.state.activeSession) return;

            // Numbers 1, 2, 3, 4, 5 to select options
            if (['1', '2', '3', '4', '5'].includes(e.key)) {
                const optIndex = parseInt(e.key, 10) - 1;
                const currentQ = this.state.activeSession.questions[this.state.currentQuestionIndex];
                if (currentQ && currentQ.options[optIndex]) {
                    this.selectOption(currentQ.options[optIndex].id);
                }
            } else if (e.key === 'ArrowRight') {
                this.nextQuestion();
            } else if (e.key === 'ArrowLeft') {
                this.prevQuestion();
            } else if (e.key.toLowerCase() === 'f') {
                this.toggleFlagCurrentQuestion();
            } else if (e.key.toLowerCase() === 'g') {
                if (!['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) {
                    this.toggleQuestionPalette();
                }
            } else if (e.key === 'Escape') {
                this.toggleQuestionPalette(false);
            }

            // CEFR Quiz keyboard shortcuts (1, 2, 3, 4, Enter)
            if (this.state.currentView === 'cefr' && this.state.activeCefrQuiz) {
                if (!this.state.cefrQuizAnswered && ['1', '2', '3', '4'].includes(e.key)) {
                    this.selectCefrOption(parseInt(e.key, 10) - 1);
                } else if (this.state.cefrQuizAnswered && (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ')) {
                    e.preventDefault();
                    this.nextCefrQuestion();
                }
            }
        });

        // Modal backdrop click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                }
            });
        });

        // Mode card radio toggle in quick start modal
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const radio = card.querySelector('input');
                radio.checked = true;

                const bpGroup = document.getElementById('modal-blueprint-group');
                if (radio.value === 'topic_drill') {
                    bpGroup.style.display = 'block';
                } else {
                    bpGroup.style.display = 'none';
                }
            });
        });
    },

    // View Navigation
    navigate(viewName) {
        this.state.currentView = viewName;

        // Clear any lingering selection or action bubble when switching views
        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }

        // Update Nav Menu
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const activeNav = document.getElementById(`nav-${viewName}`);
        if (activeNav) activeNav.classList.add('active');

        // Update Bottom Nav
        document.querySelectorAll('.bottom-nav-item').forEach(item => item.classList.remove('active'));
        const activeBottomNav = document.getElementById(`bottom-nav-${viewName}`);
        if (activeBottomNav) activeBottomNav.classList.add('active');

        // Close mobile sidebar and backdrop if open
        const sidebar = document.getElementById('main-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
        if (backdrop && backdrop.classList.contains('open')) {
            backdrop.classList.remove('open');
        }

        // Update View Sections
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.add('active');

        // Update Title
        const titleMap = {
            dashboard: 'แดชบอร์ดภาพรวม',
            blueprint: 'โครงสร้างข้อสอบ (Test Blueprint)',
            exam: 'ห้องสอบเสมือนจริง',
            results: 'วิเคราะห์ผลสอบและเฉลยละเอียด',
            mistakes: 'สมุดบันทึกข้อผิดพลาด (Mistake Notebook)',
            mastered: 'คลังข้อสอบที่พิชิตแล้ว (Mastered Bank)',
            vocab: 'คลังคำศัพท์และจดจำ (Vocab Bank)',
            cefr: 'ควิซคำศัพท์ตามระดับภาษา (CEFR)',
            status: 'สเตตัสตัวละครและสมรรถนะ (RPG Status)',
            add: 'เพิ่มข้อสอบเข้าคลัง / AI Prompt'
        };
        document.getElementById('view-title').textContent = titleMap[viewName] || 'TCAS Master';

        // Trigger view-specific loads
        if (viewName === 'dashboard') this.loadDashboard();
        if (viewName === 'blueprint') this.loadBlueprint(this.state.currentSubjectId);
        if (viewName === 'mistakes') this.loadMistakes();
        if (viewName === 'mastered') this.loadMastered();
        if (viewName === 'vocab') this.loadVocab();
        if (viewName === 'cefr') this.loadCefrOverview();
        if (viewName === 'status') this.loadUserStatus();
        if (viewName === 'add') this.populateAddFormSubjects();

        // Control Answer Sheet Floating Side Button
        const sideTabBtn = document.getElementById('btn-palette-side-tab');
        if (sideTabBtn) {
            sideTabBtn.style.display = (viewName === 'exam' && this.state.activeSession) ? 'flex' : 'none';
        }
        if (viewName !== 'exam') {
            this.toggleQuestionPalette(false);
            this.stopQuestionStopwatch();
            if (this.state.isZenMode) {
                this.toggleZenMode(false);
            }
        }

        // Close mobile sidebar if open
        const sb = document.getElementById('main-sidebar');
        const sbd = document.getElementById('sidebar-backdrop');
        if (sb) sb.classList.remove('mobile-open');
        if (sbd) sbd.classList.remove('open');
    },

    toggleSidebar() {
        const sb = document.getElementById('main-sidebar');
        const sbd = document.getElementById('sidebar-backdrop');
        if (sb) sb.classList.toggle('mobile-open');
        if (sbd) sbd.classList.toggle('open');
    },

    // Math Render helper using KaTeX
    renderMath() {
        if (window.renderMathInElement) {
            window.renderMathInElement(document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }
    },

    // Toast Notification
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span style="display:inline-flex;align-items:center;margin-right:6px;">${type === 'success' ? app.svg('check-circle', { size: 18, color: '#34d399' }) : type === 'error' ? app.svg('alert-triangle', { size: 18, color: '#f43f5e' }) : type === 'warning' ? app.svg('alert-triangle', { size: 18, color: '#f59e0b' }) : app.svg('info', { size: 18, color: '#38bdf8' })}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    },

    // ==========================================
    // 0.5 TACTILE AUDIO & GAMIFIED FX ENGINE
    // ==========================================
    sfxMuted: localStorage.getItem('tcas_sfx_muted') === 'true',
    audioCtx: null,

    getAudioContext() {
        if (!this.audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) this.audioCtx = new AudioContextClass();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    },

    toggleSound() {
        this.sfxMuted = !this.sfxMuted;
        localStorage.setItem('tcas_sfx_muted', this.sfxMuted ? 'true' : 'false');
        this.updateSoundUI();
        if (!this.sfxMuted) this.playSfx('select');
    },

    updateSoundUI() {
        const btn = document.getElementById('btn-sound-toggle');
        const text = document.getElementById('sound-text-label');
        if (!btn) return;
        if (this.sfxMuted) {
            btn.classList.add('muted');
            if (text) text.textContent = 'เสียง: ปิด';
        } else {
            btn.classList.remove('muted');
            if (text) text.textContent = 'เสียง: เปิด';
        }
    },

    playSfx(type = 'click') {
        if (this.sfxMuted) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            if (type === 'click') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'select') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(660, now + 0.07);
                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.09);
            } else if (type === 'correct') {
                [523.25, 659.25, 783.99].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                    gain.gain.setValueAtTime(0.12, now + idx * 0.07);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.16);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.07);
                    osc.stop(now + idx * 0.07 + 0.18);
                });
            } else if (type === 'wrong') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(190, now);
                osc.frequency.linearRampToValueAtTime(110, now + 0.14);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'level_up') {
                [440, 554.37, 659.25, 880].forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, now + idx * 0.09);
                    gain.gain.setValueAtTime(0.14, now + idx * 0.09);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + idx * 0.09);
                    osc.stop(now + idx * 0.09 + 0.28);
                });
            }
        } catch (e) {
            // Audio context gesture check
        }
    },

    showFloatingExp(text = '+50 EXP', x, y) {
        const el = document.createElement('div');
        el.className = 'floating-exp-text';
        el.textContent = text;
        if (x !== undefined && y !== undefined) {
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        } else {
            el.style.left = '50%';
            el.style.top = '40%';
            el.style.transform = 'translate(-50%, -50%)';
        }
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    },

    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        const W = (canvas.width = window.innerWidth);
        const H = (canvas.height = window.innerHeight);

        const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ffffff'];
        const pieces = [];
        for (let i = 0; i < 90; i++) {
            pieces.push({
                x: W / 2 + (Math.random() - 0.5) * 260,
                y: H * 0.45,
                vx: (Math.random() - 0.5) * 14,
                vy: -(Math.random() * 13 + 6),
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10
            });
        }

        let frames = 0;
        function render() {
            ctx.clearRect(0, 0, W, H);
            pieces.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45;
                p.rotation += p.rSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                ctx.restore();
            });

            frames++;
            if (frames < 75) {
                requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, W, H);
                canvas.style.display = 'none';
            }
        }
        render();
    },

    // ==========================================
    // 1. DATA LOADERS
    // ==========================================

    async loadSubjects() {
        try {
            const res = await fetch('/api/subjects');
            const data = await res.json();
            if (data.success) {
                this.state.subjects = data.data;
                this.renderSubjectCards(data.data);
                this.populateModalSubjects(data.data);
            }
        } catch (err) {
            console.error('Failed to load subjects', err);
        }
    },

    async loadDashboard() {
        try {
            const res = await fetch('/api/stats/overview');
            const result = await res.json();
            if (result.success) {
                const s = result.data;
                document.getElementById('stat-total-answered').textContent = s.total_answered;
                document.getElementById('stat-accuracy').textContent = `${s.accuracy_pct}%`;
                document.getElementById('stat-mistakes').textContent = s.total_mistakes;
                document.getElementById('stat-time-spent').textContent = `${s.total_time_spent_minutes} นาที`;
                document.getElementById('sidebar-mistakes-count').textContent = s.total_mistakes;

                this.renderRecentSessions(s.recent_sessions);
            }
        } catch (err) {
            console.error('Failed to load dashboard stats', err);
        }
    },

    async loadUserStatus(isInitial = false) {
        try {
            const res = await fetch('/api/stats/rpg-status');
            const result = await res.json();
            if (!result.success) return;
            const d = result.data;

            // 1. Update Sidebar Badges & Header User Chip
            const sideAvatar = document.getElementById('sidebar-user-avatar');
            const sideName = document.getElementById('sidebar-user-name');
            const sideSub = document.getElementById('sidebar-user-sub');
            const sideBadge = document.getElementById('sidebar-level-badge');
            const topBadge = document.querySelector('.topbar-user-badge');

            if (this.state.currentUser) {
                this.state.currentUser.stats = this.state.currentUser.stats || {};
                this.state.currentUser.stats.level = d.level;
                this.state.currentUser.stats.total_xp = d.total_xp;
                if (!this.state.currentUser.avatar_url && d.user && d.user.avatar_url) {
                    this.state.currentUser.avatar_url = d.user.avatar_url;
                }
            }

            const avatar = (this.state.currentUser && this.state.currentUser.avatar_url) ? this.state.currentUser.avatar_url : ((d.user && d.user.avatar_url) ? d.user.avatar_url : '👨‍🎓');
            const username = (this.state.currentUser && this.state.currentUser.username) ? this.state.currentUser.username : ((d.user && d.user.username) ? d.user.username : 'student');

            if (sideAvatar) sideAvatar.innerHTML = this.renderAvatar(avatar, 38);
            if (sideName) sideName.textContent = (this.state.currentUser && this.state.currentUser.display_name) ? this.state.currentUser.display_name : (d.user && d.user.display_name ? d.user.display_name : d.rank_title);
            if (sideSub) sideSub.textContent = `@${username} • Lv.${d.level}`;
            if (sideBadge) sideBadge.textContent = `Lv.${d.level}`;
            if (topBadge) topBadge.textContent = `Lv.${d.level}`;

            // 2. Update Hero Card
            const heroLvl = document.getElementById('rpg-hero-level');
            const heroBadge = document.getElementById('rpg-hero-badge');
            const heroStreak = document.getElementById('rpg-hero-streak');
            const heroTitle = document.getElementById('rpg-hero-title');
            const heroSubtitle = document.getElementById('rpg-hero-subtitle');
            const expText = document.getElementById('rpg-exp-text');
            const expFill = document.getElementById('rpg-exp-fill');
            const combatPower = document.getElementById('rpg-combat-power');

            if (heroLvl) heroLvl.textContent = `Lv.${d.level}`;
            if (heroBadge) {
                heroBadge.textContent = d.rank_badge;
                heroBadge.style.borderColor = d.rank_color;
                heroBadge.style.color = d.rank_color;
            }
            const streakVal = document.getElementById('rpg-streak-days-val');
            if (streakVal) streakVal.textContent = `${d.streak_days} วันติด`;
            const topStreak = document.getElementById('hero-streak-badge');
            if (topStreak) topStreak.innerHTML = `${this.svg('flame', { size: 14, color: '#f59e0b' })} ${d.streak_days} วันติด`;
            if (heroTitle) heroTitle.textContent = d.rank_title;
            if (heroSubtitle) heroSubtitle.textContent = `TCAS Challenger • ค่าประสบการณ์รวม ${d.total_xp.toLocaleString()} XP`;
            if (expText) expText.textContent = `${d.xp_in_level.toLocaleString()} / ${d.xp_needed.toLocaleString()} XP (${d.xp_percent}%)`;
            if (expFill) expFill.style.width = `${d.xp_percent}%`;
            if (combatPower) combatPower.textContent = d.combat_power.toLocaleString();

            // 2.5 Update Collectible Trading Card Elements
            const cardAvatar = document.getElementById('card-avatar-display');
            const cardName = document.getElementById('card-player-name');
            const cardSerial = document.getElementById('card-serial-no');
            const cardRarity = document.getElementById('card-rarity-badge');
            const cardFront = document.getElementById('tcas-card-front');

            if (cardAvatar) cardAvatar.innerHTML = this.renderAvatar(avatar, 108);
            if (cardName) cardName.textContent = (this.state.currentUser && this.state.currentUser.display_name) ? this.state.currentUser.display_name : (d.user && d.user.display_name ? d.user.display_name : username);
            if (cardSerial) cardSerial.textContent = `#TCAS-68-${username.toUpperCase().slice(0, 8)}`;
            if (cardRarity) {
                cardRarity.textContent = d.level >= 20 ? '★ MYTHIC TCAS ★' : d.level >= 10 ? '★ UR EDITION ★' : d.level >= 5 ? '★ SSR EDITION ★' : '★ SR EDITION ★';
            }
            if (cardFront) {
                cardFront.classList.remove('tier-bronze', 'tier-silver', 'tier-gold', 'tier-mythic');
                if (d.level >= 20) cardFront.classList.add('tier-mythic');
                else if (d.level >= 10) cardFront.classList.add('tier-gold');
                else if (d.level >= 5) cardFront.classList.add('tier-silver');
                else cardFront.classList.add('tier-bronze');
            }

            // Card Back Stats
            const bAns = document.getElementById('card-back-answered');
            const bAcc = document.getElementById('card-back-accuracy');
            const bMas = document.getElementById('card-back-mastered');
            const bTime = document.getElementById('card-back-time');
            if (bAns) bAns.textContent = `${d.raw ? d.raw.total_answered || 0 : 0} ข้อ`;
            if (bAcc) bAcc.textContent = `${d.stats ? d.stats.accuracy || 0 : 0}%`;
            if (bMas) bMas.textContent = `${d.raw ? d.raw.total_mastered || 0 : 0} คำ`;
            if (bTime) bTime.textContent = `${d.raw ? Math.round((d.raw.total_time_spent_seconds || 0) / 60) : 0} นาที`;

            this.setupTradingCardTilt();

            // If background update and user is not looking at status view, don't re-render chart
            if (isInitial && this.state.currentView !== 'status') return;

            // 3. Render Dynamic SVG Radar Chart
            this.renderRpgRadarChart(d.stats);

            // 4. Render Core Attributes List
            this.renderRpgAttributes(d.stats, d.raw);

            // 5. Render Achievements
            this.renderRpgAchievements(d.achievements);

        } catch (err) {
            console.error('Failed to load RPG status', err);
        }
    },

    renderRpgRadarChart(stats) {
        const container = document.getElementById('rpg-radar-container');
        if (!container) return;

        const cx = 190;
        const cy = 185;
        const R = 115;
        const numAxes = 5;

        // Angles for 5 vertices: -90° (top), -18°, 54°, 126°, 198°
        const angles = [];
        for (let i = 0; i < numAxes; i++) {
            angles.push((i * (2 * Math.PI / numAxes)) - (Math.PI / 2));
        }

        // Web Rings (20%, 40%, 60%, 80%, 100%)
        const ringLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
        const ringsSvg = ringLevels.map(lvl => {
            const pts = angles.map(ang => {
                const x = cx + R * lvl * Math.cos(ang);
                const y = cy + R * lvl * Math.sin(ang);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            return `<polygon points="${pts}" fill="${lvl === 1.0 ? 'rgba(255,255,255,0.02)' : 'none'}" stroke="rgba(148, 163, 184, ${lvl === 1.0 ? 0.35 : 0.18})" stroke-width="${lvl === 1.0 ? '1.5' : '1'}" stroke-dasharray="${lvl === 1.0 ? 'none' : '3,3'}" />`;
        }).join('\n');

        // Axis Lines
        const axisLinesSvg = angles.map(ang => {
            const x = cx + R * Math.cos(ang);
            const y = cy + R * Math.sin(ang);
            return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(148, 163, 184, 0.25)" stroke-width="1.2" />`;
        }).join('\n');

        // Data Polygon points (scaled between 10 and 100, or 0 if completely uninitialized)
        const hasAnyStats = ((stats.accuracy || 0) + (stats.speed || 0) + (stats.defense || 0) + (stats.mastery || 0) + (stats.consistency || 0)) > 0;
        const values = [
            hasAnyStats ? Math.max(10, Math.min(100, stats.accuracy || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.speed || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.defense || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.mastery || 0)) : 0,
            hasAnyStats ? Math.max(10, Math.min(100, stats.consistency || 0)) : 0
        ];

        const dataPts = values.map((val, i) => {
            const scale = val / 100;
            const x = cx + R * scale * Math.cos(angles[i]);
            const y = cy + R * scale * Math.sin(angles[i]);
            return { x, y, val };
        });

        const polygonPoints = dataPts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

        // Glowing Vertex Nodes
        const nodesSvg = dataPts.map(p => `
            <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2">
                <title>${p.val}/100</title>
            </circle>
        `).join('\n');

        // Labels definitions
        const labelsData = [
            { text: 'ACC แม่นยำ', score: stats.accuracy, color: '#38bdf8', anchor: 'middle', baseline: 'auto', dx: 0, dy: -14 },
            { text: 'SPD สปีด', score: stats.speed, color: '#f59e0b', anchor: 'start', baseline: 'middle', dx: 14, dy: 0 },
            { text: 'DEF ต้านจุดหลอก', score: stats.defense, color: '#10b981', anchor: 'start', baseline: 'hanging', dx: 8, dy: 14 },
            { text: 'MST ทบทวนแม่น', score: stats.mastery, color: '#a78bfa', anchor: 'end', baseline: 'hanging', dx: -8, dy: 14 },
            { text: 'CON วินัยต่อเนื่อง', score: stats.consistency, color: '#f43f5e', anchor: 'end', baseline: 'middle', dx: -14, dy: 0 }
        ];

        const labelsSvg = labelsData.map((lbl, i) => {
            const ang = angles[i];
            const lx = cx + R * Math.cos(ang) + lbl.dx;
            const ly = cy + R * Math.sin(ang) + lbl.dy;
            return `
                <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${lbl.anchor}" dominant-baseline="${lbl.baseline}" font-size="11.5" font-weight="600" fill="#e2e8f0" font-family="'Prompt', sans-serif">
                    ${lbl.text}
                    <tspan font-weight="700" fill="${lbl.color}"> ${lbl.score}</tspan>
                </text>
            `;
        }).join('\n');

        container.innerHTML = `
            <svg class="radar-svg" viewBox="0 0 380 370" width="100%" height="340" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.18" />
                        <stop offset="70%" stop-color="#6366f1" stop-opacity="0.08" />
                        <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
                    </radialGradient>
                    <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.7" />
                        <stop offset="50%" stop-color="#6366f1" stop-opacity="0.5" />
                        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.35" />
                    </linearGradient>
                    <filter id="radarFilterGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <!-- Center Glow -->
                <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#radarRadialGlow)" />

                <!-- Grid Web & Axes -->
                ${ringsSvg}
                ${axisLinesSvg}

                <!-- Stats Polygon Area -->
                <polygon points="${polygonPoints}" fill="url(#radarPolyGrad)" stroke="#06b6d4" stroke-width="2.5" filter="url(#radarFilterGlow)" />

                <!-- Node Markers -->
                ${nodesSvg}

                <!-- Center Bullseye -->
                <circle cx="${cx}" cy="${cy}" r="3" fill="#94a3b8" opacity="0.6" />

                <!-- Labels -->
                ${labelsSvg}
            </svg>
        `;
    },

    renderRpgAttributes(stats, raw = {}) {
        const container = document.getElementById('rpg-attr-list');
        if (!container) return;

        const isGuestOrEmpty = !raw.total_answered || raw.total_answered === 0;

        const attrs = [
            {
                code: 'ACC',
                name: 'Accuracy (ความแม่นยำในการตอบ)',
                icon: this.svg('target', { size: 18, color: '#06b6d4' }),
                value: stats.accuracy || 0,
                color: '#06b6d4',
                desc: isGuestOrEmpty
                    ? 'ยังไม่มีประวัติการทำข้อสอบ (เริ่มทำข้อสอบเพื่อวัดระดับ)'
                    : `ตอบถูกทั้งหมด ${raw.total_correct} จาก ${raw.total_answered} ข้อ ในการทดสอบทั้งหมด`
            },
            {
                code: 'SPD',
                name: 'Speed (ความเร็วเฉลี่ยต่อข้อ)',
                icon: this.svg('zap', { size: 18, color: '#f59e0b' }),
                value: stats.speed || 0,
                color: '#f59e0b',
                desc: isGuestOrEmpty || !raw.avg_time_seconds
                    ? 'ยังไม่มีประวัติการจับเวลา (เกณฑ์แนะนำ ทปอ. 45-60 วินาที/ข้อ)'
                    : `ใช้เวลาเฉลี่ย ${raw.avg_time_seconds} วินาที/ข้อ (เกณฑ์แนะนำ ทปอ. 45-60 วินาที)`
            },
            {
                code: 'DEF',
                name: 'Trap Defense (ภูมิคุ้มกันจุดหลอก)',
                icon: this.svg('shield', { size: 18, color: '#10b981' }),
                value: stats.defense || 0,
                color: '#10b981',
                desc: raw.total_trap_q > 0
                    ? `ตรวจจับและรอดพ้นจุดหลอก ${raw.trap_defended || 0} จาก ${raw.total_trap_q} ข้อ`
                    : 'ความสามารถในการตรวจจับช้อยส์ลวงและจุดหลอกที่ ทปอ. มักตั้งไว้'
            },
            {
                code: 'MST',
                name: 'Mastery (การแก้ไขจุดอ่อน & คลังศัพท์)',
                icon: this.svg('brain', { size: 18, color: '#8b5cf6' }),
                value: stats.mastery || 0,
                color: '#8b5cf6',
                desc: (raw.mastered_mistakes > 0 || raw.mastered_vocab > 0)
                    ? `พิชิตจุดอ่อน ${raw.mastered_mistakes || 0} ข้อ • แม่นยำคำศัพท์ ${raw.mastered_vocab || 0} คำ`
                    : 'ยังไม่มีประวัติพิชิตจุดอ่อนหรือคำศัพท์'
            },
            {
                code: 'CON',
                name: 'Consistency (ไฟความต่อเนื่อง & วินัย)',
                icon: this.svg('flame', { size: 18, color: '#f43f5e' }),
                value: stats.consistency || 0,
                color: '#f43f5e',
                desc: raw.total_sessions > 0
                    ? `ฝึกฝนต่อเนื่องและทำข้อสอบจำลองจบไปแล้ว ${raw.total_sessions} ชุดเต็ม`
                    : 'ยังไม่มีประวัติการทำข้อสอบจำลองจบชุด'
            }
        ];

        container.innerHTML = attrs.map(a => `
            <div class="attr-card">
                <div class="attr-header">
                    <div class="attr-title-group">
                        <span class="attr-icon">${a.icon}</span>
                        <div>
                            <span class="attr-name">${a.name}</span>
                            <span class="attr-tag" style="background: ${a.color}22; color: ${a.color}; border: 1px solid ${a.color}44;">${a.code}</span>
                        </div>
                    </div>
                    <span class="attr-score" style="color: ${a.color};">${a.value} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">/100</span></span>
                </div>
                <div class="attr-bar-track">
                    <div class="attr-bar-fill" style="width: ${a.value}%; background: linear-gradient(90deg, ${a.color}aa, ${a.color});"></div>
                </div>
                <p class="attr-desc">${a.desc}</p>
            </div>
        `).join('');
    },

    renderRpgAchievements(achievements) {
        const countEl = document.getElementById('rpg-achieve-count');
        const container = document.getElementById('rpg-achieve-grid');
        if (!container || !achievements) return;

        const unlockedCount = achievements.filter(a => a.unlocked).length;
        if (countEl) {
            countEl.textContent = `${unlockedCount}/${achievements.length} สำเร็จ`;
        }

        container.innerHTML = achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
                <div class="achieve-icon-box">
                    <span class="achieve-icon">${a.icon}</span>
                </div>
                <div class="achieve-content">
                    <div class="achieve-header">
                        <h4 class="achieve-title">${a.name}</h4>
                        <span class="achieve-status-badge ${a.unlocked ? 'status-unlocked' : 'status-locked'}">
                            ${a.unlocked ? '<span style="display:inline-flex;align-items:center;gap:4px;">' + this.svg('check-circle', { size: 13, color: '#34d399' }) + ' ปลดล็อกแล้ว</span>' : '<span style="display:inline-flex;align-items:center;gap:4px;">' + this.svg('lock', { size: 13, color: '#94a3b8' }) + ' ล็อกอยู่</span>'}
                        </span>
                    </div>
                    <p class="achieve-desc">${a.desc}</p>
                </div>
            </div>
        `).join('');
    },

    // ==========================================
    // 3D COLLECTIBLE TRADING CARD ENGINE
    // ==========================================
        // ==========================================
    // 3D COLLECTIBLE TRADING CARD ENGINE
    // ==========================================
    setupTradingCardTilt() {
        const card = document.getElementById('tcas-card-3d-wrapper');
        const tilt = document.getElementById('tcas-card-tilt');
        const flip = document.getElementById('tcas-card-flip');
        const glare = document.getElementById('card-holo-glare');
        if (!card || !tilt || card._tiltBound) return;
        card._tiltBound = true;

        const handleMove = (clientX, clientY) => {
            if (flip && flip.classList.contains('is-flipped')) {
                tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                if (glare) glare.style.opacity = '0';
                return;
            }
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const halfW = rect.width / 2;
            const halfH = rect.height / 2;

            const rotateX = ((halfH - y) / halfH) * 12;
            const rotateY = ((x - halfW) / halfW) * 12;

            tilt.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            if (glare) {
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255,255,255,0.45) 0%, rgba(236,72,153,0.2) 35%, transparent 70%)`;
            }
        };

        const handleReset = () => {
            tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glare) glare.style.opacity = '0';
        };

        card.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        card.addEventListener('mouseleave', handleReset);

        // Touch support for iPad / Mobile
        card.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });
        card.addEventListener('touchend', handleReset);
    },

    flipTradingCard() {
        const flip = document.getElementById('tcas-card-flip');
        if (!flip) return;
        this.playSfx('select');
        const isFlipped = flip.classList.toggle('is-flipped');
        const tilt = document.getElementById('tcas-card-tilt');
        if (tilt) {
            tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        const glare = document.getElementById('card-holo-glare');
        if (glare) glare.style.opacity = '0';

        const btn = document.getElementById('btn-flip-card');
        if (btn) {
            btn.innerHTML = isFlipped
                ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>พลิกดูหน้าการ์ด`
                : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>พลิกดูหลังการ์ด`;
        }
    },

    downloadTradingCard() {
        this.playSfx('click');
        this.showToast('กำลังสร้างรูปการ์ดพลังความละเอียดสูง...', 'info');

        const canvas = document.createElement('canvas');
        canvas.width = 750;
        canvas.height = 1100;
        const ctx = canvas.getContext('2d');

        const u = this.state.currentUser || {};
        const stats = u.stats || {};
        const lvl = stats.level || 1;
        const name = (u.display_name || u.username || 'นักรบ TCAS');
        const avatar = u.avatar_url || '👨‍🎓';
        const cp = document.getElementById('rpg-combat-power')?.textContent || '0';
        const rank = document.getElementById('rpg-hero-badge')?.textContent || 'Tier V';
        const title = document.getElementById('rpg-hero-title')?.textContent || 'ผู้เริ่มต้นการเดินทาง';

        // 1. Background Frame
        let borderCol = '#f59e0b';
        let bgGrad = ctx.createLinearGradient(0, 0, 750, 1100);
        if (lvl >= 20) {
            borderCol = '#ec4899';
            bgGrad.addColorStop(0, '#1c0b30');
            bgGrad.addColorStop(0.5, '#2b1046');
            bgGrad.addColorStop(1, '#0e031a');
        } else if (lvl >= 10) {
            borderCol = '#f59e0b';
            bgGrad.addColorStop(0, '#221908');
            bgGrad.addColorStop(0.5, '#352509');
            bgGrad.addColorStop(1, '#140f03');
        } else if (lvl >= 5) {
            borderCol = '#38bdf8';
            bgGrad.addColorStop(0, '#0f172a');
            bgGrad.addColorStop(0.5, '#1e293b');
            bgGrad.addColorStop(1, '#090d16');
        } else {
            borderCol = '#b45309';
            bgGrad.addColorStop(0, '#1a130e');
            bgGrad.addColorStop(0.5, '#2a1d15');
            bgGrad.addColorStop(1, '#110b07');
        }

        // Draw Card Body
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(20, 20, 710, 1060, 36);
        else ctx.rect(20, 20, 710, 1060);
        ctx.fill();
        ctx.lineWidth = 8;
        ctx.strokeStyle = borderCol;
        ctx.stroke();

        // Inner Border Ring
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(32, 32, 686, 1036, 28);
        else ctx.rect(32, 32, 686, 1036);
        ctx.stroke();

        // 2. Header
        ctx.fillStyle = borderCol;
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.fillText(lvl >= 20 ? '★ MYTHIC TCAS ★' : lvl >= 10 ? '★ UR EDITION ★' : lvl >= 5 ? '★ SSR EDITION ★' : '★ SR EDITION ★', 50, 75);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`TCAS68 • #00${lvl}`, 700, 75);
        ctx.textAlign = 'left';

        // 3. Avatar Box
        ctx.save();
        ctx.beginPath();
        ctx.arc(375, 260, 115, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = borderCol;
        ctx.stroke();

        ctx.font = '96px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(avatar, 375, 260);
        ctx.restore();

        // Level Badge
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(315, 365, 120, 42, 21);
        else ctx.rect(315, 365, 120, 42);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Lv.${lvl}`, 375, 393);

        // 4. Character Title & Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px Kanit, sans-serif';
        ctx.fillText(name, 375, 470);

        ctx.fillStyle = borderCol;
        ctx.font = '24px Prompt, sans-serif';
        ctx.fillText(`${title} • ${rank}`, 375, 515);

        // 5. Combat Power Box
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(65, 560, 620, 180, 24);
        else ctx.rect(65, 560, 620, 180);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 20px Outfit, sans-serif';
        ctx.fillText('COMBAT POWER (CP)', 375, 605);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 64px Outfit, sans-serif';
        ctx.fillText(cp, 375, 680);

        // 6. Blueprint Certified Stamp
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(200, 775, 350, 65, 12);
        else ctx.rect(200, 775, 350, 65);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 24px Outfit, sans-serif';
        ctx.fillText('✓ ทปอ. BLUEPRINT SPEC', 375, 816);

        // 7. Footer Trademark
        ctx.fillStyle = '#64748b';
        ctx.font = '16px Outfit, sans-serif';
        ctx.fillText('TCAS BLUEPRINT MASTER • OFFICIAL COLLECTIBLE TCG', 375, 960);
        ctx.fillText('tcas-master.onrender.com', 375, 990);

        // Trigger Download
        setTimeout(() => {
            const link = document.createElement('a');
            link.download = `TCAS-Card-${u.username || 'Student'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.playSfx('correct');
            this.showToast('บันทึกรูปการ์ดพลังเรียบร้อยแล้ว!', 'success');
        }, 300);
    },

    getSubjectGroupCategory(sub) {
        if (sub.category === 'TGAT') return 'TGAT';
        if (sub.category === 'TPAT') return 'TPAT';
        if (sub.category === 'A_LEVEL') {
            const mathSci = ['alevel_math1', 'alevel_math2', 'alevel_sci', 'alevel_phy', 'alevel_chem', 'alevel_bio'];
            if (mathSci.includes(sub.id)) return 'ALEVEL_MATH_SCI';
            const humanities = ['alevel_thai', 'alevel_soc', 'alevel_eng'];
            if (humanities.includes(sub.id)) return 'ALEVEL_HUMANITIES';
            return 'ALEVEL_LANG';
        }
        return 'OTHER';
    },

    getSubjectThemeClass(sub) {
        const group = this.getSubjectGroupCategory(sub);
        switch (group) {
            case 'TGAT': return 'card-theme-tgat';
            case 'TPAT': return 'card-theme-tpat';
            case 'ALEVEL_MATH_SCI': return 'card-theme-mathsci';
            case 'ALEVEL_HUMANITIES': return 'card-theme-humanities';
            case 'ALEVEL_LANG': return 'card-theme-languages';
            default: return '';
        }
    },

    setSubjectCategoryFilter(category) {
        this.state.subjectCategoryFilter = category;
        document.querySelectorAll('#subject-category-tabs .cat-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === category);
        });
        this.renderSubjectCards(this.state.subjects);
    },

    toggleReadyOnlyFilter(isReadyOnly) {
        this.state.subjectReadyOnlyFilter = !!isReadyOnly;
        this.renderSubjectCards(this.state.subjects);
    },

    handleSubjectSearch(query) {
        this.state.subjectSearchQuery = (query || '').trim().toLowerCase();
        this.renderSubjectCards(this.state.subjects);
    },

    resetSubjectFilters() {
        this.state.subjectCategoryFilter = 'all';
        this.state.subjectReadyOnlyFilter = false;
        this.state.subjectSearchQuery = '';

        document.querySelectorAll('#subject-category-tabs .cat-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === 'all');
        });
        const toggle = document.getElementById('toggle-ready-only');
        if (toggle) toggle.checked = false;
        const searchInput = document.getElementById('subject-search-input');
        if (searchInput) searchInput.value = '';

        this.renderSubjectCards(this.state.subjects);
    },

    // ==========================================
    // TCAS68 COUNTDOWN & DREAM FACULTY HUB
    // ==========================================

    initTcasCountdown() {
        if (this.state.tcasCountdownInterval) {
            clearInterval(this.state.tcasCountdownInterval);
        }
        this.updateCountdownDisplay();
        this.state.tcasCountdownInterval = setInterval(() => {
            this.updateCountdownDisplay();
        }, 1000);
    },

    switchCountdownTarget(target) {
        this.state.tcasCountdownTarget = target;
        const tabTgat = document.getElementById('tab-cd-tgat');
        const tabAlevel = document.getElementById('tab-cd-alevel');
        if (tabTgat && tabAlevel) {
            if (target === 'tgat') {
                tabTgat.classList.add('active');
                tabAlevel.classList.remove('active');
            } else {
                tabTgat.classList.remove('active');
                tabAlevel.classList.add('active');
            }
        }
        this.updateCountdownDisplay();
    },

    updateCountdownDisplay() {
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');
        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        const now = new Date();
        const currentYear = now.getFullYear();

        // Target: TGAT/TPAT in early December, A-Level in late March
        let targetDate;
        if (this.state.tcasCountdownTarget === 'tgat') {
            targetDate = new Date(currentYear, 11, 7, 9, 0, 0); // Dec 7
            if (now > targetDate) {
                targetDate = new Date(currentYear + 1, 11, 7, 9, 0, 0);
            }
        } else {
            targetDate = new Date(currentYear, 2, 21, 9, 0, 0); // Mar 21
            if (now > targetDate) {
                targetDate = new Date(currentYear + 1, 2, 21, 9, 0, 0);
            }
        }

        const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
        const totalSecs = Math.floor(diffMs / 1000);

        const days = Math.floor(totalSecs / 86400);
        const hours = Math.floor((totalSecs % 86400) / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    },

    initDreamFaculty() {
        const savedFaculty = localStorage.getItem('tcas_dream_faculty') || 'bba';
        this.state.dreamFaculty = savedFaculty;
        const selectEl = document.getElementById('dream-faculty-select');
        if (selectEl) {
            selectEl.value = savedFaculty;
        }
        this.updateDreamFacultyReadiness(savedFaculty);
    },

    saveDreamFaculty(key) {
        this.state.dreamFaculty = key;
        localStorage.setItem('tcas_dream_faculty', key);
        this.updateDreamFacultyReadiness(key);

        const facultyNames = {
            med: 'คณะแพทยศาสตร์ / ทันตแพทย์',
            eng: 'คณะวิศวกรรมศาสตร์',
            bba: 'คณะพาณิชยศาสตร์ / บัญชี-บริหาร',
            comm: 'คณะนิเทศศาสตร์ / วารสารฯ',
            law: 'คณะนิติศาสตร์ / รัฐศาสตร์',
            arch: 'คณะสถาปัตยกรรมศาสตร์',
            sci: 'คณะวิทยาศาสตร์ / ไอที',
            arts: 'คณะอักษรฯ / มนุษยศาสตร์ / ศิลปศาสตร์'
        };
        this.showToast(`🎯 บันทึกเป้าหมาย ${facultyNames[key] || 'คณะในฝัน'} เรียบร้อย!`, 'success');
    },

    updateDreamFacultyReadiness(key = this.state.dreamFaculty) {
        const pctEl = document.getElementById('target-readiness-pct');
        const barEl = document.getElementById('target-readiness-bar');
        if (!pctEl || !barEl) return;

        const facultyConfig = {
            med: { targetAcc: 85, targetQ: 200, basePct: 58 },
            eng: { targetAcc: 78, targetQ: 150, basePct: 65 },
            bba: { targetAcc: 74, targetQ: 120, basePct: 70 },
            comm: { targetAcc: 68, targetQ: 90, basePct: 75 },
            law: { targetAcc: 72, targetQ: 100, basePct: 72 },
            arch: { targetAcc: 70, targetQ: 90, basePct: 70 },
            sci: { targetAcc: 72, targetQ: 110, basePct: 72 },
            arts: { targetAcc: 74, targetQ: 100, basePct: 74 }
        };

        const cfg = facultyConfig[key] || facultyConfig.bba;

        let calcPct = cfg.basePct;
        if (this.state.currentUser && this.state.currentUser.total_questions_answered > 0) {
            const acc = this.state.currentUser.overall_accuracy_pct || 65;
            const qCount = this.state.currentUser.total_questions_answered || 10;
            const accFactor = (acc / cfg.targetAcc) * 0.6;
            const volumeFactor = Math.min(1.0, qCount / cfg.targetQ) * 0.4;
            calcPct = Math.round((accFactor + volumeFactor) * 100);
            calcPct = Math.max(35, Math.min(99, calcPct));
        }

        pctEl.textContent = `${calcPct}%`;
        barEl.style.width = `${calcPct}%`;

        if (calcPct >= 80) {
            barEl.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
        } else if (calcPct >= 60) {
            barEl.style.background = 'linear-gradient(90deg, #6366f1, #06b6d4)';
        } else {
            barEl.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444)';
        }
    },

    renderSubjectCards(subjects) {
        const container = document.getElementById('subjects-container');
        if (!subjects || subjects.length === 0) {
            if (container) container.innerHTML = '<div class="empty-state">ไม่พบข้อมูลวิชา</div>';
            return;
        }

        // Update category tab badges
        const bAll = document.getElementById('tab-badge-all');
        const bTgat = document.getElementById('tab-badge-tgat');
        const bTpat = document.getElementById('tab-badge-tpat');
        const bMathSci = document.getElementById('tab-badge-mathsci');
        const bHumanities = document.getElementById('tab-badge-humanities');
        const bLanguages = document.getElementById('tab-badge-languages');

        if (bAll) bAll.textContent = subjects.length;
        if (bTgat) bTgat.textContent = subjects.filter(s => s.category === 'TGAT').length;
        if (bTpat) bTpat.textContent = subjects.filter(s => s.category === 'TPAT').length;
        if (bMathSci) bMathSci.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_MATH_SCI').length;
        if (bHumanities) bHumanities.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_HUMANITIES').length;
        if (bLanguages) bLanguages.textContent = subjects.filter(s => this.getSubjectGroupCategory(s) === 'ALEVEL_LANG').length;

        // Apply filters
        let filtered = [...subjects];

        if (this.state.subjectCategoryFilter !== 'all') {
            filtered = filtered.filter(s => this.getSubjectGroupCategory(s) === this.state.subjectCategoryFilter);
        }

        if (this.state.subjectReadyOnlyFilter) {
            filtered = filtered.filter(s => s.status === 'ready' || s.total_db_questions > 0);
        }

        if (this.state.subjectSearchQuery) {
            const q = this.state.subjectSearchQuery.toLowerCase();
            filtered = filtered.filter(s =>
                (s.name_th && s.name_th.toLowerCase().includes(q)) ||
                (s.name_en && s.name_en.toLowerCase().includes(q)) ||
                (s.code && s.code.toLowerCase().includes(q))
            );
        }

        if (filtered.length === 0) {
            if (container) {
                container.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center;">
                        <div style="display:flex;justify-content:center;margin-bottom: 0.5rem;">${this.svg('target', {size: 36, color: 'var(--accent-indigo)'})}</div>
                        <h4 style="margin-bottom: 0.5rem; color: #f8fafc;">ไม่พบวิชาที่ตรงกับเงื่อนไขการค้นหา</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">ลองเปลี่ยนหมวดหมู่ ปิดตัวกรองพร้อมสอบ หรือใช้คำค้นหาอื่น</p>
                        <button class="btn btn-outline btn-sm" onclick="app.resetSubjectFilters()">รีเซ็ตตัวกรองทั้งหมด</button>
                    </div>
                `;
            }
            return;
        }

        if (!container) return;

        container.innerHTML = filtered.map(sub => {
            const catClass = `cat-${sub.category.toLowerCase().replace('_', '')}`;
            const themeClass = this.getSubjectThemeClass(sub);
            const isComingSoon = sub.status === 'coming_soon' || (sub.total_db_questions === 0 && !['tgat1', 'tgat2', 'tgat3'].includes(sub.id));

            return `
                <div class="subject-card ${themeClass} ${isComingSoon ? 'is-coming-soon' : ''}">
                    ${isComingSoon ? '<div class="subject-ribbon-red">กำลังจัดทำ</div>' : ''}
                    <div>
                        <div class="subject-top">
                            <span class="subject-cat-badge ${catClass}">${sub.category}</span>
                            <span class="subject-code">รหัส ${sub.code}</span>
                            ${isComingSoon ? '<span class="badge-status-danger">เตรียมข้อสอบ</span>' : '<span class="badge-counter" style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.75rem;">พร้อมสอบจริง</span>'}
                        </div>
                        <h4 class="subject-name-th">${sub.name_th}</h4>
                        <div class="subject-name-en">${sub.name_en}</div>
                        <p class="subject-desc">${sub.description}</p>
                    </div>

                    <div>
                        <div class="subject-meta-chips">
                            <span class="meta-chip">${this.svg('clock', {size: 13})} ${sub.duration_minutes} นาที</span>
                            <span class="meta-chip">${this.svg('file-text', {size: 13})} ${sub.total_questions} ข้อ</span>
                            <span class="meta-chip">${this.svg('award', {size: 13})} ${sub.total_score} คะแนน</span>
                            <span class="meta-chip">${this.svg('package', {size: 13})} ${sub.total_db_questions} ข้อในคลัง</span>
                            ${!isComingSoon ? `<span class="meta-chip" style="color: #34d399; background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.35);">${this.svg('check-circle', {size: 13})} พิชิตแล้ว ${sub.mastered_count || 0}/${sub.total_db_questions}</span>` : ''}
                        </div>

                        <div class="subject-actions">
                            ${isComingSoon ? `
                                <button class="btn btn-secondary btn-sm" onclick="app.showComingSoonToast('${this.escapeHtml(sub.name_th)}')" style="opacity: 0.8; border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;" title="อยู่ระหว่างจัดทำข้อสอบ">
                                    ${this.svg('clock', {size: 13})} เร็วๆ นี้
                                </button>
                            ` : `
                                <button class="btn btn-primary btn-sm" onclick="app.onFullMockClick('${sub.id}', ${sub.total_db_questions || 0}, ${sub.total_questions || 60})">
                                    ${this.svg('target', {size: 14})} Full Mock ${sub.total_db_questions > sub.total_questions ? `<span style="font-size: 0.75rem; opacity: 0.9; margin-left: 2px;">(${Math.floor(sub.total_db_questions / sub.total_questions)} ชุด)</span>` : ''}
                                </button>
                            `}
                            <button class="btn btn-secondary btn-sm" onclick="app.openBlueprintView('${sub.id}')">
                                ${this.svg('clipboard', {size: 14})} Blueprint
                            </button>
                            <button class="btn btn-warning btn-sm" onclick="app.openCheatSheetModal('${sub.id}')" title="ดูสรุปสูตร & แนวข้อสอบ">
                                ${this.svg('book', {size: 14})} สรุปสูตร
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderRecentSessions(sessions) {
        const container = document.getElementById('recent-sessions-container');
        if (!sessions || sessions.length === 0) {
            container.innerHTML = '<div class="empty-state">ยังไม่มีประวัติการทำข้อสอบ เลือกลองทำชุดแรกดูเลย!</div>';
            return;
        }

        container.innerHTML = sessions.map(sess => {
            const dateStr = new Date(sess.finished_at).toLocaleString('th-TH', {
                dateStyle: 'short',
                timeStyle: 'short'
            });
            const minutes = Math.floor(sess.time_spent_seconds / 60);
            const seconds = sess.time_spent_seconds % 60;
            const timeStr = `${minutes}m ${seconds}s`;

            return `
                <div class="session-row">
                    <div>
                        <div class="session-subj">${sess.subject_name} (${sess.session_type === 'full_mock' ? 'Full Mock' : 'Topic Drill'})</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${dateStr} • ใช้เวลา ${timeStr}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span class="session-score">${sess.score_earned} / ${sess.max_score} คะแนน</span>
                        <button class="btn btn-outline btn-sm" onclick="app.viewPastSessionReview('${sess.id}')">ดูเฉลย</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ==========================================
    // 2. BLUEPRINT EXPLORER
    // ==========================================

    openBlueprintView(subjectId) {
        this.state.currentSubjectId = subjectId;
        this.navigate('blueprint');
    },

    async loadBlueprint(subjectId) {
        try {
            this.state.currentSubjectId = subjectId;
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (!data.success) return;

            const sub = data.data;

            // Render Tabs
            const tabsContainer = document.getElementById('blueprint-tabs');
            tabsContainer.innerHTML = this.state.subjects.map(s => `
                <button class="blueprint-tab ${s.id === subjectId ? 'active' : ''}" onclick="app.loadBlueprint('${s.id}')">
                    ${s.code} ${s.name_th.split(' ')[0]}
                </button>
            `).join('');

            // Render Summary Box
            const summaryBox = document.getElementById('blueprint-summary-box');
            summaryBox.innerHTML = `
                <div>
                    <h3 class="blueprint-summary-title">${sub.name_th} (${sub.name_en})</h3>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">
                        ${sub.description}
                    </p>
                </div>
                <div class="blueprint-summary-badges">
                    <span class="meta-chip">ข้อสอบทั้งหมด ${sub.total_questions} ข้อ</span>
                    <span class="meta-chip">เวลา ${sub.duration_minutes} นาที</span>
                    <span class="meta-chip">คะแนนเต็ม ${sub.total_score} คะแนน</span>
                </div>
            `;

            // Render Domains
            const domainsList = document.getElementById('blueprint-domains-list');
            if (!sub.blueprints || sub.blueprints.length === 0) {
                domainsList.innerHTML = '<div class="empty-state">ไม่มีข้อมูลพาร์ทในวิชานี้</div>';
                return;
            }

            domainsList.innerHTML = sub.blueprints.map(bp => `
                <div class="domain-card">
                    <div class="domain-card-header">
                        <div>
                            <div class="domain-name">${bp.domain_name}</div>
                            <div class="domain-subtopic">${bp.subtopic_name}</div>
                        </div>
                        <div class="domain-metrics">
                            <span class="meta-chip" style="color: var(--accent-cyan);">เป้าหมาย ทปอ.: ${bp.target_questions} ข้อ</span>
                            <span class="meta-chip" style="color: var(--accent-emerald);">น้ำหนัก: ${bp.score_weight}%</span>
                        </div>
                    </div>

                    <p class="domain-desc">${bp.description}</p>

                    <div class="domain-footer">
                        <span class="domain-q-count">
                            📚 มีข้อสอบในระบบแล้ว: <strong>${bp.current_question_count} ข้อ</strong>
                        </span>
                        <button class="btn btn-outline btn-sm" onclick="app.startExam('${sub.id}', 'topic_drill', '${bp.id}')">
                            🎯 เจาะข้อสอบพาร์ทนี้ (${bp.current_question_count} ข้อ)
                        </button>
                    </div>
                </div>
            `).join('');

        } catch (err) {
            console.error('Failed to load blueprint details', err);
        }
    },

    // ==========================================
    // 3. EXAM SIMULATOR & SET SELECTION
    // ==========================================

    onFullMockClick(subjectId, totalDbQuestions, totalQuestions) {
        if (totalDbQuestions > totalQuestions) {
            this.openSetModal(subjectId);
        } else {
            this.startExam(subjectId, 'full_mock');
        }
    },

    async openSetModal(subjectId) {
        const modal = document.getElementById('exam-set-modal');
        const contentEl = document.getElementById('set-modal-content');
        const badgeEl = document.getElementById('set-modal-badge');
        const titleEl = document.getElementById('set-modal-title');
        const descEl = document.getElementById('set-modal-desc');

        if (!modal) return;
        modal.classList.add('open');

        const subject = this.state.subjects.find(s => s.id === subjectId) || { id: subjectId, name_th: subjectId, code: subjectId };
        if (badgeEl) badgeEl.textContent = subject.code || 'TCAS';
        if (titleEl) titleEl.textContent = `เลือกชุดข้อสอบ ${subject.name_th}`;
        if (descEl) descEl.textContent = `มีข้อสอบพร้อมสอบ ${subject.total_db_questions || 0} ข้อ จัดแบ่งเป็นชุดมาตรฐานละ ${subject.total_questions || 60} ข้อ`;

        if (contentEl) {
            contentEl.innerHTML = '<div style="text-align:center; padding: 2.5rem; color: var(--text-muted);">⏳ กำลังโหลดรายการชุดข้อสอบ...</div>';
        }

        try {
            const res = await fetch(`/api/subjects/${subjectId}/sets`);
            const json = await res.json();
            const sets = json.data || [];

            const setMetadata = {
                tgat1: {
                    1: { title: 'ชุดที่ 1: Official Mock Standard', desc: 'บริบทชีวิตประจำวัน การสื่อสารในสังคม และการทำงานยุคใหม่ ตรงตาม Blueprint MyTCAS', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Digital World, AI & Tech Lifestyle', desc: 'โลกดิจิทัล ปัญญาประดิษฐ์ (AI) โซเชียลมีเดีย นวัตกรรม และเทคโนโลยีการศึกษา', icon: '🤖' },
                    3: { title: 'ชุดที่ 3: Green Planet & Sustainable Future', desc: 'สิ่งแวดล้อม วิกฤตภูมิอากาศ พลังงานสะอาด เศรษฐกิจหมุนเวียน และ ESG', icon: '🌱' },
                    4: { title: 'ชุดที่ 4: Global Business & Cultural Tourism', desc: 'ธุรกิจระหว่างประเทศ การค้าระดับโลก วัฒนธรรม โลจิสติกส์ และการท่องเที่ยวเชิงมรดก', icon: '🌍' },
                    5: { title: 'ชุดที่ 5: Academic Excellence & Neuroplasticity', desc: 'ทักษะวิชาการขั้นสูง วิทยาศาสตร์สมอง การเรียนรู้ จริยธรรมวิจัย และ Grand Mock', icon: '🧠' }
                },
                tgat2: {
                    1: { title: 'ชุดที่ 1: Official Authentic Blueprint', desc: 'แนวข้อสอบทางการ MyTCAS ครบ 4 มิติ ภาษา ตัวเลข มิติสัมพันธ์ และการคิดอย่างมีเหตุผล', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Smart Tech & Scientific Logic', desc: 'ตรรกะเทคโนโลยีอัจฉริยะ การวิเคราะห์ข้อมูล ปัญญาประดิษฐ์ และระเบียบวิธีทางวิทยาศาสตร์', icon: '🔬' },
                    3: { title: 'ชุดที่ 3: Economic Reasoning & Business Strategy', desc: 'การคิดเชิงเศรษฐศาสตร์ กลยุทธ์ธุรกิจ การเปรียบเทียบเชิงปริมาณ และการแก้โจทย์ปัญหาซับซ้อน', icon: '📊' },
                    4: { title: 'ชุดที่ 4: Social Dynamics & Civic Logic', desc: 'มิติสังคม สิ่งแวดล้อม ตรรกะพลเมือง และการวิเคราะห์ข้อความเชิงวิพากษ์', icon: '🌐' },
                    5: { title: 'ชุดที่ 5: Grand Mock Master & Deep Problem-Solving', desc: 'ชุดข้อสอบประมวลทักษะขั้นสูง การให้เหตุผลเชิงอนุมาน และสถานการณ์จำลองระดับยาก', icon: '🏆' }
                },
                tgat3: {
                    1: { title: 'ชุดที่ 1: Official Authentic Competencies', desc: 'สมรรถนะการทำงานในอนาคตตาม Blueprint ทางการ ครบ 4 ด้าน นวัตกรรม ปัญหาซับซ้อน อารมณ์ และพลเมือง', icon: '🎯' },
                    2: { title: 'ชุดที่ 2: Digital Age Agility & Tech Innovation', desc: 'การสร้างคุณค่าและนวัตกรรมดิจิทัล การคิดแก้ปัญหาด้วยเทคโนโลยี และการรับมือวิกฤตไซเบอร์', icon: '💡' },
                    3: { title: 'ชุดที่ 3: Startup Growth & Crisis Leadership', desc: 'การบริหารจัดการในองค์กรเติบโตเร็ว การตัดสินใจภาวะวิกฤต ความฉลาดทางอารมณ์ และผู้นำที่ยืดหยุ่น', icon: '🚀' },
                    4: { title: 'ชุดที่ 4: Sustainability, ESG & Community Impact', desc: 'การขับเคลื่อนความยั่งยืน จริยธรรมองค์กร ESG การมีส่วนร่วมของชุมชน และจิตสำนึกพลเมืองโลก', icon: '🌿' },
                    5: { title: 'ชุดที่ 5: Grand Workforce Master & Ethical Synergy', desc: 'ชุดข้อสอบประมวลสมรรถนะขั้นสูง ความขัดแย้งทางจริยธรรม การทำงานข้ามวัฒนธรรม และการแก้ปัญหาเชิงโครงสร้าง', icon: '👑' }
                }
            };

            const subMeta = setMetadata[subjectId] || {};

            let html = `
                <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));">
            `;

            sets.forEach(s => {
                const meta = subMeta[s.set_number] || {
                    title: `ชุดที่ ${s.set_number}: แนวข้อสอบจำลองสมบูรณ์แบบ`,
                    desc: `ข้อสอบมาตรฐาน ${s.count} ข้อ จับเวลาและคำนวณคะแนนตามพิมพ์เขียวทางการ`,
                    icon: '📝'
                };

                html += `
                    <div class="glass-panel" style="padding: 1.25rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: rgba(30, 41, 59, 0.6); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s ease;">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-size: 1.5rem;">${meta.icon}</span>
                                    <h4 style="margin: 0; font-size: 1.05rem; color: #f8fafc; font-weight: 700;">${meta.title}</h4>
                                </div>
                                <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px;">
                                    ${s.count} ข้อ
                                </span>
                            </div>
                            <p style="font-size: 0.85rem; color: #94a3b8; line-height: 1.5; margin: 0 0 1rem 0;">${meta.desc}</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
                            <span style="font-size: 0.8rem; color: #64748b;">⏱️ ${subject.duration_minutes || 60} นาที • ${subject.total_score || 100} คะแนน</span>
                            <button class="btn btn-primary btn-sm" onclick="app.startExamFromSetModal('${subjectId}', ${s.set_number})">
                                ${this.svg('play', {size: 14})} เริ่มทำชุดนี้
                            </button>
                        </div>
                    </div>
                `;
            });

            // Random mix card
            html += `
                <div class="glass-panel" style="padding: 1.25rem; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; background: rgba(88, 28, 135, 0.15); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span style="font-size: 1.5rem;">🎲</span>
                                <h4 style="margin: 0; font-size: 1.05rem; color: #e9d5ff; font-weight: 700;">สุ่มคละทุกชุด (Comprehensive Mix)</h4>
                            </div>
                            <span style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px;">
                                สุ่ม ${subject.total_questions || 60} ข้อ
                            </span>
                        </div>
                        <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin: 0 0 1rem 0;">สุ่มข้อสอบ ${subject.total_questions || 60} ข้อจากคลังทั้งหมด ${subject.total_db_questions || 400} ข้อ เพื่อทดสอบความพร้อมรอบด้านโดยไม่จำกัดชุด</p>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
                        <span style="font-size: 0.8rem; color: #a855f7;">⏱️ ${subject.duration_minutes || 60} นาที • ${subject.total_score || 100} คะแนน</span>
                        <button class="btn btn-secondary btn-sm" style="border-color: #a855f7; color: #e9d5ff;" onclick="app.startExamFromSetModal('${subjectId}', null)">
                            ${this.svg('shuffle', {size: 14})} เริ่มสอบแบบสุ่ม
                        </button>
                    </div>
                </div>
            `;

            html += `</div>`;
            if (contentEl) contentEl.innerHTML = html;
        } catch (err) {
            if (contentEl) contentEl.innerHTML = `<div style="color: #f87171; text-align: center; padding: 2rem;">เกิดข้อผิดพลาดในการโหลดชุดข้อสอบ: ${err.message}</div>`;
        }
    },

    closeSetModal() {
        const modal = document.getElementById('exam-set-modal');
        if (modal) modal.classList.remove('open');
    },

    startExamFromSetModal(subjectId, setNumber) {
        this.closeSetModal();
        this.startExam(subjectId, 'full_mock', null, setNumber);
    },

    async startExam(subjectId, sessionType = 'full_mock', filterBlueprintId = null, setNumber = null) {
        try {
            const bodyPayload = {
                subject_id: subjectId,
                session_type: sessionType,
                filter_blueprint_id: filterBlueprintId
            };
            if (setNumber) bodyPayload.set_number = setNumber;

            const res = await fetch('/api/sessions/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload)
            });

            const data = await res.json();
            if (!data.success) {
                if (data.is_all_mastered) {
                    if (confirm(`${data.error}\n\nต้องการเปิดดูข้อสอบใน "คลังข้อสอบที่พิชิตแล้ว" หรือไม่?`)) {
                        this.navigate('mastered');
                        this.loadMastered(subjectId);
                    }
                } else {
                    this.showToast(data.error || 'ไม่สามารถเริ่มการสอบได้', 'error');
                }
                return;
            }

            this.state.activeSession = data.data;
            this.state.currentQuestionIndex = 0;
            this.state.userAnswers = {};
            this.state.timeRemainingSeconds = data.data.time_limit_seconds;

            // Setup Header
            document.getElementById('exam-badge').textContent = data.data.subject.code;
            document.getElementById('exam-subject-name').textContent = data.data.subject.name_th;
            const setLabel = setNumber ? ` (ชุดที่ ${setNumber})` : '';
            document.getElementById('exam-mode-text').textContent = (sessionType === 'full_mock' ? 'Full Mock' : 'Topic Drill') + setLabel;
            document.getElementById('total-count-badge').textContent = data.data.total_questions;

            // Switch to exam view
            this.navigate('exam');

            // Render exam section bar, current question & palette
            this.renderExamSectionBar();
            this.renderCurrentQuestion();
            this.renderQuestionPalette();

            // Start countdown timer
            this.startTimer();

        } catch (err) {
            console.error('Failed to start exam', err);
            this.showToast('เกิดข้อผิดพลาดในการโหลดข้อสอบ', 'error');
        }
    },

    startTimer() {
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);

        const timerEl = document.getElementById('exam-timer');
        const timerWrapper = document.getElementById('exam-timer-wrapper');

        const updateTimer = () => {
            if (this.state.timeRemainingSeconds <= 0) {
                clearInterval(this.state.timerInterval);
                this.showToast('หมดเวลาสอบ! ระบบกำลังส่งกระดาษคำตอบ...', 'error');
                this.executeSubmitExam();
                return;
            }

            this.state.timeRemainingSeconds--;

            const mins = Math.floor(this.state.timeRemainingSeconds / 60);
            const secs = this.state.timeRemainingSeconds % 60;
            timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

            // Warn when less than 2 minutes
            if (this.state.timeRemainingSeconds < 120) {
                timerWrapper.classList.add('timer-warning');
            } else {
                timerWrapper.classList.remove('timer-warning');
            }
        };

        updateTimer();
        this.state.timerInterval = setInterval(updateTimer, 1000);
    },

    renderCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;

        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        // Meta
        document.getElementById('current-q-index').textContent = this.state.currentQuestionIndex + 1;
        document.getElementById('current-q-domain').textContent = q.subtopic_name || q.domain_name;

        const diffEl = document.getElementById('current-q-difficulty');
        diffEl.textContent = q.difficulty.toUpperCase();
        diffEl.className = `q-difficulty-pill diff-${q.difficulty}`;

        // Flag button
        const isFlagged = this.state.userAnswers[q.id]?.is_flagged;
        const flagBtn = document.getElementById('btn-flag');
        if (isFlagged) {
            flagBtn.classList.add('flagged');
            document.getElementById('flag-text').textContent = 'ปักหมุดแล้ว';
        } else {
            flagBtn.classList.remove('flagged');
            document.getElementById('flag-text').textContent = 'ปักหมุด';
        }

        // AI Saved bookmark button status
        const isSavedForAi = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        const saveAiBtn = document.getElementById('btn-save-ai');
        const saveAiText = document.getElementById('ai-save-text');
        const saveAiIcon = document.getElementById('ai-save-icon');
        if (saveAiBtn) {
            if (isSavedForAi) {
                saveAiBtn.classList.add('saved');
                if (saveAiText) saveAiText.textContent = '✓ เก็บแล้ว';
                if (saveAiIcon) saveAiIcon.textContent = '📌';
            } else {
                saveAiBtn.classList.remove('saved');
                if (saveAiText) saveAiText.textContent = 'เก็บไว้ถาม AI';
                if (saveAiIcon) saveAiIcon.textContent = '🔖';
            }
        }

        // Split Layout / Stimulus
        const splitWrapper = document.getElementById('exam-split-wrapper');
        const stimulusPane = document.getElementById('stimulus-pane');
        const stimulusContent = document.getElementById('stimulus-content');

        // Defensive sanitization: strip any generator bracket tags like [ชุดวิเคราะห์ภาษา...] or [การคิดคำนวณ...]
        let cleanStimulus = q.stimulus ? q.stimulus.replace(/^\s*\[[^\]]+\]\s*/g, '').trim() : '';
        let cleanQuestionText = q.question_text ? q.question_text.replace(/^\s*\[[^\]]+\]\s*/g, '').trim() : '';

        // If stimulus is an analogy prompt and question is severed, merge into unified question
        if (cleanStimulus && cleanStimulus.includes('จงเลือกคู่คำที่มีความสัมพันธ์เหมือนกับ') && cleanQuestionText.includes('ข้อใดมีความสัมพันธ์เหมือนกับคู่คำที่กำหนดให้?')) {
            cleanQuestionText = cleanStimulus;
            cleanStimulus = '';
        }

        if (cleanStimulus && cleanStimulus.length > 0) {
            splitWrapper.classList.add('has-stimulus');
            stimulusPane.style.display = 'block';
            stimulusContent.textContent = cleanStimulus;
        } else {
            splitWrapper.classList.remove('has-stimulus');
            stimulusPane.style.display = 'none';
        }

        // Question text
        document.getElementById('question-text').innerHTML = cleanQuestionText;

        // Options
        const optionsList = document.getElementById('options-list');
        const currentAnswer = this.state.userAnswers[q.id]?.selected_option_id;

        optionsList.innerHTML = q.options.map((opt, idx) => `
            <div class="option-card ${currentAnswer === opt.id ? 'selected' : ''}" onclick="app.selectOption('${opt.id}')">
                <span class="opt-badge">${opt.label || idx + 1}</span>
                <span class="opt-text">${opt.content}</span>
            </div>
        `).join('');

        // Navigation button states
        document.getElementById('btn-prev-q').disabled = this.state.currentQuestionIndex === 0;
        const nextBtn = document.getElementById('btn-next-q');
        if (this.state.currentQuestionIndex === session.questions.length - 1) {
            nextBtn.innerHTML = `ตรวจทาน / ส่ง <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
            nextBtn.innerHTML = `ข้อถัดไป <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
        }

        // Re-render Math
        this.renderMath();

        // Update palette drawer states
        this.updatePaletteActiveStates();

        // Start live question stopwatch
        this.startQuestionStopwatch();
    },

    selectOption(optionId) {
        this.playSfx('select');
        const session = this.state.activeSession;
        if (!session) return;

        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        if (!this.state.userAnswers[q.id]) {
            this.state.userAnswers[q.id] = {
                selected_option_id: optionId,
                time_spent_seconds: 0,
                is_flagged: false
            };
        } else {
            this.state.userAnswers[q.id].selected_option_id = optionId;
        }

        // Update answered count badge
        const answeredCount = Object.values(this.state.userAnswers).filter(a => !!a.selected_option_id).length;
        document.getElementById('answered-count-badge').textContent = answeredCount;

        // Refresh UI
        this.renderCurrentQuestion();
    },

    toggleFlagCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        if (!this.state.userAnswers[q.id]) {
            this.state.userAnswers[q.id] = { selected_option_id: null, is_flagged: true, time_spent_seconds: 0 };
        } else {
            this.state.userAnswers[q.id].is_flagged = !this.state.userAnswers[q.id].is_flagged;
        }

        this.renderCurrentQuestion();
    },

    nextQuestion() {
        const session = this.state.activeSession;
        if (!session) return;

        this.saveCurrentScratchpad();

        if (this.state.currentQuestionIndex < session.questions.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderCurrentQuestion();
            this.restoreCurrentScratchpad();
            this.notifyScratchpadQuestionChange();
        } else {
            this.confirmSubmitExam();
        }
    },

    prevQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.saveCurrentScratchpad();
            this.state.currentQuestionIndex--;
            this.renderCurrentQuestion();
            this.restoreCurrentScratchpad();
            this.notifyScratchpadQuestionChange();
        }
    },

    jumpToQuestion(index) {
        this.saveCurrentScratchpad();
        this.state.currentQuestionIndex = index;
        this.renderCurrentQuestion();
        this.restoreCurrentScratchpad();
        this.notifyScratchpadQuestionChange();
        this.toggleQuestionPalette(false);
    },

    jumpToSection(sectionIndex) {
        const session = this.state.activeSession;
        if (!session || !session.sections || !session.sections[sectionIndex]) return;
        const sec = session.sections[sectionIndex];
        this.jumpToQuestion(sec.start_index);
    },

    renderExamSectionBar() {
        const session = this.state.activeSession;
        const bar = document.getElementById('exam-section-bar');
        if (!bar) return;

        if (!session || !session.sections || session.sections.length <= 1) {
            bar.style.display = 'none';
            bar.innerHTML = '';
            return;
        }

        bar.style.display = 'flex';
        bar.innerHTML = session.sections.map((sec, sIdx) => `
            <button class="section-pill-btn" id="section-pill-${sIdx}" onclick="app.jumpToSection(${sIdx})" title="${sec.name} (ข้อ ${sec.start_index + 1} - ${sec.end_index + 1})">
                <span class="section-pill-title">${sec.name}</span>
                <span class="section-pill-range">ข้อ ${sec.start_index + 1}-${sec.end_index + 1}</span>
                <span class="section-pill-badge" id="section-pill-badge-${sIdx}">0/${sec.count}</span>
            </button>
        `).join('');

        this.updateSectionPillActiveStates();
    },

    updateSectionPillActiveStates() {
        const session = this.state.activeSession;
        if (!session || !session.sections) return;

        const currentIdx = this.state.currentQuestionIndex;

        session.sections.forEach((sec, sIdx) => {
            const pill = document.getElementById(`section-pill-${sIdx}`);
            if (!pill) return;

            const isActive = currentIdx >= sec.start_index && currentIdx <= sec.end_index;
            if (isActive) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }

            // Count answered questions in this section
            let answered = 0;
            for (let i = sec.start_index; i <= sec.end_index; i++) {
                const q = session.questions[i];
                if (q && this.state.userAnswers[q.id]?.selected_option_id) {
                    answered++;
                }
            }

            const badge = document.getElementById(`section-pill-badge-${sIdx}`);
            if (badge) {
                badge.textContent = `${answered}/${sec.count}`;
                if (answered === sec.count) {
                    badge.classList.add('completed');
                } else {
                    badge.classList.remove('completed');
                }
            }

            const palSecBadge = document.getElementById(`palette-sec-badge-${sIdx}`);
            if (palSecBadge) {
                palSecBadge.textContent = `${answered}/${sec.count}`;
                if (answered === sec.count) {
                    palSecBadge.classList.add('completed');
                } else {
                    palSecBadge.classList.remove('completed');
                }
            }
        });
    },

    // Question Palette Off-Canvas Drawer
    toggleQuestionPalette(forceOpen) {
        const palette = document.getElementById('question-palette');
        const backdrop = document.getElementById('palette-backdrop');
        if (!palette) return;

        let shouldOpen;
        if (forceOpen === undefined) {
            shouldOpen = !palette.classList.contains('open');
        } else {
            shouldOpen = !!forceOpen;
        }

        if (shouldOpen) {
            palette.classList.add('open');
            if (backdrop) backdrop.classList.add('open');
            this.updatePaletteActiveStates();
        } else {
            palette.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
        }
    },

    renderQuestionPalette() {
        const session = this.state.activeSession;
        if (!session) return;

        const grid = document.getElementById('palette-grid');
        if (!grid) return;

        if (session.sections && session.sections.length > 1) {
            // Grouped by section
            grid.innerHTML = session.sections.map((sec, sIdx) => {
                const btns = [];
                for (let i = sec.start_index; i <= sec.end_index; i++) {
                    btns.push(`
                        <button class="palette-btn" id="palette-btn-${i}" onclick="app.jumpToQuestion(${i})" title="ข้อที่ ${i + 1}">
                            ${i + 1}
                        </button>
                    `);
                }
                return `
                    <div class="palette-section-group">
                        <div class="palette-section-header">
                            <span class="sec-title">${sec.name}</span>
                            <span class="sec-count" id="palette-sec-badge-${sIdx}">0/${sec.count}</span>
                        </div>
                        <div class="palette-section-grid">
                            ${btns.join('')}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            grid.innerHTML = session.questions.map((q, idx) => `
                <button class="palette-btn" id="palette-btn-${idx}" onclick="app.jumpToQuestion(${idx})" title="ข้อที่ ${idx + 1}">
                    ${idx + 1}
                </button>
            `).join('');
        }

        this.updatePaletteActiveStates();
    },

    updatePaletteActiveStates() {
        const session = this.state.activeSession;
        if (!session) return;

        const total = session.questions.length;
        let answeredCount = 0;

        session.questions.forEach((q, idx) => {
            const btn = document.getElementById(`palette-btn-${idx}`);
            const isCurrent = idx === this.state.currentQuestionIndex;
            const ans = this.state.userAnswers[q.id];
            const isAnswered = ans && !!ans.selected_option_id;
            const isFlagged = ans && ans.is_flagged;

            if (isAnswered) answeredCount++;

            if (btn) {
                btn.className = 'palette-btn';
                if (isAnswered) btn.classList.add('answered');
                if (isFlagged) btn.classList.add('flagged');
                if (isCurrent) btn.classList.add('current');
            }
        });

        // Update badge counters across the UI
        const ansBadge = document.getElementById('answered-count-badge');
        if (ansBadge) ansBadge.textContent = answeredCount;
        const totBadge = document.getElementById('total-count-badge');
        if (totBadge) totBadge.textContent = total;

        const sideBadge = document.getElementById('side-tab-badge');
        if (sideBadge) sideBadge.textContent = `${answeredCount}/${total}`;

        const palAnswered = document.getElementById('palette-answered-count');
        if (palAnswered) palAnswered.textContent = answeredCount;
        const palTotal = document.getElementById('palette-total-count');
        if (palTotal) palTotal.textContent = total;

        // Also update section pills and section badges
        this.updateSectionPillActiveStates();
    },

    // ==========================================
    // CBT EXAM CONTROLS (FONT RESIZER, ZEN MODE, QUESTION STOPWATCH)
    // ==========================================

    setExamFontSize(size) {
        if (!['sm', 'md', 'lg'].includes(size)) size = 'md';
        this.state.examFontSize = size;
        localStorage.setItem('cbt_font_size', size);
        this.applyExamFontSize();
    },

    applyExamFontSize() {
        const size = this.state.examFontSize || 'md';
        const examView = document.getElementById('view-exam');
        if (examView) {
            examView.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
            examView.classList.add(`font-size-${size}`);
        }

        ['sm', 'md', 'lg'].forEach(s => {
            const btn = document.getElementById(`btn-font-${s}`);
            if (btn) {
                if (s === size) btn.classList.add('active');
                else btn.classList.remove('active');
            }
        });
    },

    toggleZenMode(force) {
        const isZen = force !== undefined ? !!force : !this.state.isZenMode;
        this.state.isZenMode = isZen;

        if (isZen) {
            document.body.classList.add('zen-mode');
        } else {
            document.body.classList.remove('zen-mode');
        }

        const zenBtn = document.getElementById('btn-toggle-zen');
        const zenText = document.getElementById('zen-btn-text');
        if (zenBtn) {
            if (isZen) {
                zenBtn.classList.add('active');
                if (zenText) zenText.textContent = 'ออกจากสมาธิ';
            } else {
                zenBtn.classList.remove('active');
                if (zenText) zenText.textContent = 'โหมดสมาธิ';
            }
        }
    },

    startQuestionStopwatch() {
        if (this.state.questionStopwatchInterval) {
            clearInterval(this.state.questionStopwatchInterval);
            this.state.questionStopwatchInterval = null;
        }

        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        const ans = this.state.userAnswers[q.id];
        this.state.questionStopwatchSeconds = (ans && ans.time_spent_seconds) ? ans.time_spent_seconds : 0;
        this.updateQuestionStopwatchDisplay();

        this.state.questionStopwatchInterval = setInterval(() => {
            this.state.questionStopwatchSeconds++;
            if (this.state.userAnswers[q.id]) {
                this.state.userAnswers[q.id].time_spent_seconds = this.state.questionStopwatchSeconds;
            } else {
                this.state.userAnswers[q.id] = {
                    selected_option_id: null,
                    is_flagged: false,
                    time_spent_seconds: this.state.questionStopwatchSeconds
                };
            }
            this.updateQuestionStopwatchDisplay();
        }, 1000);
    },

    stopQuestionStopwatch() {
        if (this.state.questionStopwatchInterval) {
            clearInterval(this.state.questionStopwatchInterval);
            this.state.questionStopwatchInterval = null;
        }
    },

    updateQuestionStopwatchDisplay() {
        const displayEl = document.getElementById('q-time-spent-display');
        if (!displayEl) return;
        const total = this.state.questionStopwatchSeconds;
        const mins = Math.floor(total / 60);
        const secs = total % 60;
        displayEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    // ==========================================
    // 4. SUBMIT EXAM & RESULTS
    // ==========================================

    confirmSubmitExam() {
        const session = this.state.activeSession;
        if (!session) return;

        const total = session.questions.length;
        const answered = Object.values(this.state.userAnswers).filter(a => !!a.selected_option_id).length;
        const unanswered = total - answered;
        const flagged = Object.values(this.state.userAnswers).filter(a => a.is_flagged).length;

        document.getElementById('modal-answered-num').textContent = answered;
        document.getElementById('modal-unanswered-num').textContent = unanswered;
        document.getElementById('modal-flagged-num').textContent = flagged;

        document.getElementById('confirm-submit-modal').classList.add('open');
    },

    closeSubmitModal() {
        document.getElementById('confirm-submit-modal').classList.remove('open');
    },

    async executeSubmitExam() {
        this.closeSubmitModal();
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);
        this.stopQuestionStopwatch();

        const session = this.state.activeSession;
        if (!session) return;

        // Compile payload
        const answersPayload = session.questions.map(q => {
            const ans = this.state.userAnswers[q.id];
            return {
                question_id: q.id,
                selected_option_id: ans ? ans.selected_option_id : null,
                is_flagged: ans ? ans.is_flagged : false,
                time_spent_seconds: ans ? ans.time_spent_seconds : 0
            };
        });

        const totalTimeSpent = session.time_limit_seconds - this.state.timeRemainingSeconds;

        try {
            const res = await fetch(`/api/sessions/${session.session_id}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers: answersPayload,
                    time_spent_seconds: Math.max(totalTimeSpent, 1)
                })
            });

            const result = await res.json();
            if (result.success) {
                this.renderResults(result.data, session);
                this.navigate('results');
                this.loadDashboard(); // Refresh stats in background
                this.loadUserStatus();
            } else {
                this.showToast('ไม่สามารถส่งกระดาษคำตอบได้', 'error');
            }
        } catch (err) {
            console.error('Failed to submit exam', err);
            this.showToast('เกิดข้อผิดพลาดในการประมวลผลคำตอบ', 'error');
        }
    },

    renderResults(result, session) {
        // Subject & Session Metadata at the top of results view
        const subCodeEl = document.getElementById('res-subject-code');
        const subTitleEl = document.getElementById('res-subject-title');
        const subDescEl = document.getElementById('res-subject-desc');
        const subBadgeEl = document.getElementById('res-session-type-badge');

        const curSubject = this.state.subjects.find(s => s.id === (result.subject_id || (session && session.subject_id)));
        const subjectCode = result.subject_code || (curSubject ? curSubject.code : 'TCAS');
        const subjectName = result.subject_name || (curSubject ? curSubject.name_th : 'วิชาสอบ');

        const mins = Math.floor(result.time_spent_seconds / 60);
        const secs = result.time_spent_seconds % 60;

        if (subCodeEl) subCodeEl.textContent = subjectCode;
        if (subTitleEl) subTitleEl.textContent = subjectName;
        if (subDescEl) {
            subDescEl.textContent = `วิเคราะห์ผลคะแนนและจุดอ่อนตามสัดส่วน Blueprint ของ ทปอ. • เวลาที่ใช้ ${mins} นาที ${secs} วินาที`;
        }
        if (subBadgeEl) {
            const st = result.session_type || (session && session.session_type);
            if (st === 'full_mock') subBadgeEl.textContent = '🎯 จำลองสอบจริง (Full Mock)';
            else if (st === 'mistakes_review' || st === 'mistake_drill') subBadgeEl.textContent = '⚠️ ฝึกซ้ำสมุดจุดอ่อน (Mistakes Drill)';
            else if (st === 'mastered_review') subBadgeEl.textContent = '🏆 ทบทวนข้อสอบที่พิชิตแล้ว (Mastered Review)';
            else subBadgeEl.textContent = '⚡ แบบฝึกหัดเจาะลึก Blueprint';
        }

        // Hero Score & Badge
        document.getElementById('res-score-earned').textContent = result.score_earned;
        document.getElementById('res-score-max').textContent = result.max_score;
        document.getElementById('res-accuracy-badge').textContent = `ความแม่นยำ ${result.accuracy_pct}%`;

        document.getElementById('res-correct-count').textContent = `${result.correct_count} ข้อ`;
        document.getElementById('res-wrong-count').textContent = `${result.wrong_count} ข้อ`;
        document.getElementById('res-time-spent').textContent = `${mins}:${String(secs).padStart(2, '0')}`;

        // Feedback Headline with Blueprint Rubber Stamps & Audio
        const headlineEl = document.getElementById('res-headline');
        if (result.accuracy_pct >= 80) {
            this.playSfx('level_up');
            this.launchConfetti();
            headlineEl.innerHTML = '🌟 ยอดเยี่ยมมาก! ระดับคะแนนพร้อมสอบจริง <span class="rubber-stamp stamp-gold">★ TOP TIER ★</span>';
        } else if (result.accuracy_pct >= 50) {
            this.playSfx('correct');
            this.launchConfetti();
            headlineEl.innerHTML = '👍 ดีมาก! ใกล้ถึงเป้าหมายแล้ว <span class="rubber-stamp">✓ ทปอ. PASS</span>';
        } else {
            this.playSfx('click');
            headlineEl.innerHTML = '💪 อย่ายอมแพ้! ฝึกซ้ำในสมุดจุดอ่อนเพื่ออุดรอยรั่ว <span class="rubber-stamp stamp-cyan">⚡ DRILL MORE</span>';
        }

        // Domain Breakdown (Robust Array / Object Parsing)
        const domainContainer = document.getElementById('res-domain-breakdown');
        let domainList = [];
        if (Array.isArray(result.domain_breakdown)) {
            domainList = result.domain_breakdown;
        } else if (result.domain_breakdown && typeof result.domain_breakdown === 'object') {
            domainList = Object.entries(result.domain_breakdown).map(([name, stat]) => ({
                domain_name: name,
                subtopic_name: stat.subtopic_name || name,
                correct: stat.correct !== undefined ? stat.correct : (stat.correct_in_domain || 0),
                total: stat.total !== undefined ? stat.total : (stat.total_in_domain || 1),
                accuracy_pct: stat.accuracy_pct
            }));
        }

        if (domainList.length === 0) {
            domainContainer.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;">ไม่มีข้อมูลพาร์ท</div>';
        } else {
            domainContainer.innerHTML = domainList.map(item => {
                const title = item.subtopic_name || item.domain_name || 'หมวดทั่วไป';
                const domainHeader = (item.domain_name && item.subtopic_name && item.domain_name !== item.subtopic_name)
                    ? `<span style="font-size: 0.76rem; color: var(--text-muted); display: block; margin-bottom: 2px;">${this.escapeHtml(item.domain_name)}</span>`
                    : '';
                const correct = item.correct !== undefined ? item.correct : (item.correct_in_domain !== undefined ? item.correct_in_domain : 0);
                const total = item.total !== undefined ? item.total : (item.total_in_domain !== undefined ? item.total_in_domain : 1);
                const pct = item.accuracy_pct !== undefined && !isNaN(item.accuracy_pct)
                    ? Math.round(item.accuracy_pct)
                    : Math.round((correct / Math.max(total, 1)) * 100);

                const color = pct >= 75 ? 'var(--accent-emerald)' : (pct >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)');
                const gradient = pct >= 75 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : (pct >= 50 ? 'linear-gradient(90deg, #f59e0b, #eab308)' : 'linear-gradient(90deg, #f43f5e, #e11d48)');

                return `
                    <div class="domain-perf-card">
                        <div class="domain-perf-header">
                            <div style="flex: 1; padding-right: 0.5rem;">
                                ${domainHeader}
                                <span style="font-weight: 600; color: #fff; font-size: 0.92rem;">${this.escapeHtml(title)}</span>
                            </div>
                            <span style="color: ${color}; font-weight: 700; white-space: nowrap; font-size: 0.88rem;">${correct}/${total} ข้อ (${pct}%)</span>
                        </div>
                        <div class="domain-bar-bg" style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden; margin-top: 0.6rem;">
                            <div class="domain-bar-fill" style="width: ${Math.min(pct, 100)}%; height: 100%; background: ${gradient}; border-radius: 4px; transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Spider Web Radar Chart & Diagnosis Matrix
        this.renderSessionRadarChart(domainList);
        this.renderDiagnosisCallouts(domainList, result);

        // Solutions & Traps
        const solContainer = document.getElementById('res-solutions-container');
        solContainer.innerHTML = result.evaluated_answers.map((ans, idx) => {
            const origQ = session.questions.find(q => q.id === ans.question_id);
            const selectedOpt = origQ ? origQ.options.find(o => o.id === ans.selected_option_id) : null;
            const correctOpt = ans.correct_option;

            return `
                <div class="solution-card ${ans.is_correct ? 'correct' : 'wrong'}">
                    <div class="solution-meta" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                            <span class="q-number-pill">ข้อที่ ${idx + 1}</span>
                            <span class="q-domain-pill">${ans.subtopic_name || ans.domain_name || 'ทั่วไป'}</span>
                            <span style="font-weight: 700; color: ${ans.is_correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
                                ${ans.is_correct ? '✓ ถูกต้อง' : '✗ ตอบผิด'}
                            </span>
                        </div>
                        <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
                            <button class="btn btn-outline btn-xs" onclick="app.toggleSaveQuestionById('${ans.question_id}', '${ans.selected_option_id || ''}')" title="บันทึกข้อนี้ไว้ในคลังถาม AI">
                                🔖 เก็บไว้ถาม AI
                            </button>
                            <button class="btn-ai-tutor" onclick="app.openAiTutor('${ans.question_id}', '${ans.selected_option_id || ''}')" title="ปรึกษา TCAS Master AI สำหรับข้อนี้">
                                <span>🤖</span> คุยกับ AI ข้อนี้
                            </button>
                        </div>
                    </div>

                    ${origQ?.stimulus ? `<div class="stimulus-pane" style="margin-bottom: 0.85rem;"><div class="stimulus-body">${origQ.stimulus}</div></div>` : ''}

                    <div class="sol-q-text">${origQ ? origQ.question_text : ''}</div>

                    <div class="sol-answer-compare">
                        <div class="compare-line">
                            <span class="compare-label" style="color: ${ans.is_correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">คำตอบของคุณ:</span>
                            <span>${selectedOpt ? `${selectedOpt.label}. ${selectedOpt.content}` : '(ไม่ได้ตอบข้อนี้)'}</span>
                        </div>
                        <div class="compare-line">
                            <span class="compare-label" style="color: var(--accent-emerald)">คำตอบที่ถูกต้อง:</span>
                            <span>${correctOpt ? `${correctOpt.label}. ${correctOpt.content}` : '-'}</span>
                        </div>
                    </div>

                    <div class="explanation-box">
                        <div class="explanation-title">💡 เฉลยละเอียดและหลักคิด:</div>
                        <div class="explanation-body">${ans.explanation || 'ไม่มีคำอธิบาย'}</div>
                    </div>

                    ${ans.trap_analysis ? `
                        <div class="trap-box">
                            <span>⚠️</span>
                            <div><strong>ระวังจุดหลอก:</strong> ${ans.trap_analysis}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        this.renderMath();
    },

    // Step 5: Render Pure SVG Competency Radar Chart
    renderSessionRadarChart(domainList) {
        const container = document.getElementById('exam-radar-container');
        if (!container) return;

        let items = (domainList && domainList.length > 0) ? domainList.slice(0, 6) : [];

        // If fewer than 3 items, provide meaningful dimensions so spider web forms a polygon
        if (items.length === 0) {
            items = [
                { title: 'ความแม่นยำรวม', pct: 50 },
                { title: 'การจัดการเวลา', pct: 70 },
                { title: 'การตัดช้อยส์', pct: 60 }
            ];
        } else if (items.length === 1) {
            const first = items[0];
            const pct1 = first.accuracy_pct !== undefined ? Math.round(first.accuracy_pct) : 50;
            items = [
                { title: first.subtopic_name || first.domain_name || 'พาร์ตหลัก', pct: pct1 },
                { title: 'ความสม่ำเสมอ', pct: Math.min(100, Math.round(pct1 * 0.9)) },
                { title: 'การควบคุมเวลา', pct: 75 }
            ];
        } else if (items.length === 2) {
            items = [
                { title: items[0].subtopic_name || items[0].domain_name || 'พาร์ต 1', pct: Math.round(items[0].accuracy_pct || 50) },
                { title: items[1].subtopic_name || items[1].domain_name || 'พาร์ต 2', pct: Math.round(items[1].accuracy_pct || 50) },
                { title: 'ความเร็วเฉลี่ย', pct: 80 }
            ];
        } else {
            items = items.map(it => {
                const correct = it.correct !== undefined ? it.correct : (it.correct_in_domain || 0);
                const total = it.total !== undefined ? it.total : (it.total_in_domain || 1);
                const pct = it.accuracy_pct !== undefined && !isNaN(it.accuracy_pct)
                    ? Math.round(it.accuracy_pct)
                    : Math.round((correct / Math.max(total, 1)) * 100);
                return {
                    title: it.subtopic_name || it.domain_name || 'โดเมน',
                    pct: Math.max(0, Math.min(100, pct))
                };
            });
        }

        const n = items.length;
        const width = 420;
        const height = 360;
        const cx = width / 2;
        const cy = height / 2;
        const R = 115;

        const getCoordinates = (index, valuePct, maxR = R) => {
            const angle = (Math.PI * 2 / n) * index - (Math.PI / 2);
            const r = (valuePct / 100) * maxR;
            return {
                x: cx + r * Math.cos(angle),
                y: cy + r * Math.sin(angle),
                angle
            };
        };

        // Concentric web rings (25%, 50%, 75%, 100%)
        const ringLevels = [25, 50, 75, 100];
        let gridRingsSvg = '';
        ringLevels.forEach(lvl => {
            const ringPoints = [];
            for (let i = 0; i < n; i++) {
                const pt = getCoordinates(i, lvl);
                ringPoints.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);
            }
            gridRingsSvg += `<polygon points="${ringPoints.join(' ')}" fill="none" stroke="rgba(255, 255, 255, ${lvl === 100 ? 0.2 : 0.08})" stroke-width="${lvl === 100 ? '1.5' : '1'}" stroke-dasharray="${lvl === 100 ? 'none' : '3 3'}"/>`;
        });

        // Radial spokes and Labels
        let spokesSvg = '';
        let labelsSvg = '';
        for (let i = 0; i < n; i++) {
            const outerPt = getCoordinates(i, 100);
            spokesSvg += `<line x1="${cx}" y1="${cy}" x2="${outerPt.x.toFixed(1)}" y2="${outerPt.y.toFixed(1)}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2"/>`;

            const labelPt = getCoordinates(i, 124);
            let textAnchor = 'middle';
            if (Math.abs(Math.cos(labelPt.angle)) > 0.3) {
                textAnchor = Math.cos(labelPt.angle) > 0 ? 'start' : 'end';
            }

            let labelText = items[i].title;
            if (labelText.length > 16) {
                labelText = labelText.substring(0, 14) + '...';
            }

            labelsSvg += `
                <text x="${labelPt.x.toFixed(1)}" y="${labelPt.y.toFixed(1)}" 
                      text-anchor="${textAnchor}" dominant-baseline="middle" 
                      fill="#94a3b8" font-size="11" font-weight="600" font-family="system-ui, sans-serif">
                    ${this.escapeHtml(labelText)}
                    <tspan fill="#38bdf8" font-weight="700"> (${items[i].pct}%)</tspan>
                </text>
            `;
        }

        // User data polygon points
        const dataPoints = [];
        const dotsSvgList = [];
        for (let i = 0; i < n; i++) {
            const visualPct = Math.max(8, items[i].pct);
            const pt = getCoordinates(i, visualPct);
            dataPoints.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);

            dotsSvgList.push(`
                <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4.5" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5">
                    <title>${this.escapeHtml(items[i].title)}: ${items[i].pct}%</title>
                </circle>
            `);
        }

        container.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 420px; height: auto; display: block; margin: 0 auto; overflow: visible;">
                <defs>
                    <linearGradient id="radarPolyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.45"/>
                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0.25"/>
                    </linearGradient>
                    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                </defs>
                <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(6, 182, 212, 0.03)" />
                ${gridRingsSvg}
                ${spokesSvg}
                <polygon points="${dataPoints.join(' ')}" fill="url(#radarPolyGrad)" stroke="#38bdf8" stroke-width="2.5" filter="url(#radarGlow)" stroke-linejoin="round"/>
                ${dotsSvgList.join('')}
                ${labelsSvg}
            </svg>
        `;
    },

    // Step 5: Render Strengths, Focus Areas & Pacing Diagnosis Callouts
    renderDiagnosisCallouts(domainList, result) {
        const container = document.getElementById('res-diagnosis-callout');
        if (!container) return;

        let items = Array.isArray(domainList) ? [...domainList] : [];
        items.forEach(it => {
            if (it.accuracy_pct === undefined) {
                const correct = it.correct !== undefined ? it.correct : (it.correct_in_domain || 0);
                const total = it.total !== undefined ? it.total : (it.total_in_domain || 1);
                it.accuracy_pct = Math.round((correct / Math.max(total, 1)) * 100);
            }
        });

        // 1. Strength
        let strengthTitle = 'ความแม่นยำภาพรวม';
        let strengthDesc = `ทำคะแนนโดยรวมได้ยอดเยี่ยม ${result.accuracy_pct}% ของชุดข้อสอบ`;
        if (items.length > 0) {
            const sorted = [...items].sort((a, b) => (b.accuracy_pct || 0) - (a.accuracy_pct || 0));
            const best = sorted[0];
            strengthTitle = `จุดแข็ง: ${best.subtopic_name || best.domain_name || 'โดเมนหลัก'}`;
            strengthDesc = `คุณทำความแม่นยำในส่วนนี้ได้สูงถึง ${best.accuracy_pct}% ถือเป็นจุดโกยคะแนนสำคัญในการสอบจริง ควรรักษาความแม่นยำนี้ไว้`;
        }

        // 2. Focus Area
        let focusTitle = 'สมุดบันทึกจุดอ่อน';
        let focusDesc = 'ทบทวนข้อที่ทำผิดอย่างสม่ำเสมอเพื่อปิดช่องโหว่ความรู้';
        if (items.length > 0) {
            const sortedAsc = [...items].sort((a, b) => (a.accuracy_pct || 0) - (b.accuracy_pct || 0));
            const lowest = sortedAsc[0];
            if (lowest.accuracy_pct < 70) {
                focusTitle = `จุดที่ต้องเน้น: ${lowest.subtopic_name || lowest.domain_name || 'โดเมน'}`;
                focusDesc = `ความแม่นยำอยู่ที่ ${lowest.accuracy_pct}% แนะนำให้ฝึกทำข้อสอบหมวดนี้ซ้ำ และกดดูเฉลยละเอียดพร้อมระวังจุดหลอก (Trap Analysis)`;
            } else {
                focusTitle = 'ทุกพาร์ตอยู่ในเกณฑ์ดีเยี่ยม';
                focusDesc = 'ไม่มีพาร์ตใดต่ำกว่า 70% ลองท้าทายตนเองด้วยข้อสอบความยากระดับสูง (Hard) เพิ่มเติม';
            }
        }

        // 3. Pacing Speed
        const totalQ = result.evaluated_answers ? result.evaluated_answers.length : 1;
        const avgSec = Math.round((result.time_spent_seconds || 0) / Math.max(totalQ, 1));
        let speedTitle = `สปีดเฉลี่ย ${avgSec} วินาที / ข้อ`;
        let speedDesc = '';
        if (avgSec <= 60) {
            speedDesc = '⚡ ความเร็วระดับยอดเยี่ยม! มีเวลาเหลือเพียงพอสำหรับการตรวจทานคำตอบรอบสองในสนามสอบจริง';
        } else if (avgSec <= 90) {
            speedDesc = '👍 การบริหารเวลาอยู่ในเกณฑ์ดีตามมาตรฐาน Blueprint ทปอ. บริหารจังหวะได้ดี';
        } else {
            speedDesc = '⏳ ค่อนข้างใช้เวลานานกับบางข้อ ควรฝึกเทคนิคสแกนคีย์เวิร์ด ตัดตัวเลือก หรือข้ามข้อติดขัดไปทำข้อง่ายก่อน';
        }

        container.innerHTML = `
            <div class="diag-card diag-strength">
                <div class="diag-card-title">
                    <span>🛡️</span>
                    <span style="color: #34d399;">${this.escapeHtml(strengthTitle)}</span>
                </div>
                <p class="diag-card-desc">${strengthDesc}</p>
            </div>

            <div class="diag-card diag-focus">
                <div class="diag-card-title">
                    <span>🎯</span>
                    <span style="color: #fbbf24;">${this.escapeHtml(focusTitle)}</span>
                </div>
                <p class="diag-card-desc">${focusDesc}</p>
            </div>

            <div class="diag-card diag-speed">
                <div class="diag-card-title">
                    <span>⏱️</span>
                    <span style="color: #38bdf8;">${this.escapeHtml(speedTitle)}</span>
                </div>
                <p class="diag-card-desc">${speedDesc}</p>
            </div>
        `;
    },

    async viewPastSessionReview(sessionId) {
        try {
            const res = await fetch(`/api/sessions/${sessionId}/review`);
            const data = await res.json();
            if (data.success) {
                const sess = data.data.session;
                const evaluated = data.data.answers.map(a => ({
                    question_id: a.question_id,
                    selected_option_id: a.selected_option_id,
                    is_correct: a.is_correct === 1,
                    correct_option: { label: a.correct_label, content: a.correct_content },
                    explanation: a.explanation,
                    trap_analysis: a.trap_analysis,
                    domain_name: a.domain_name,
                    subtopic_name: a.subtopic_name
                }));

                const synthSession = {
                    questions: data.data.answers.map(a => ({
                        id: a.question_id,
                        question_text: a.question_text,
                        stimulus: a.stimulus,
                        options: [
                            ...(a.selected_option_id ? [{ id: a.selected_option_id, label: a.selected_label, content: a.selected_content }] : [])
                        ]
                    }))
                };

                const domainMap = {};
                evaluated.forEach(a => {
                    const dom = a.subtopic_name || a.domain_name || 'ทั่วไป';
                    if (!domainMap[dom]) {
                        domainMap[dom] = { domain_name: dom, subtopic_name: dom, correct: 0, total: 0 };
                    }
                    domainMap[dom].total++;
                    if (a.is_correct) domainMap[dom].correct++;
                });
                const domainList = Object.values(domainMap).map(d => ({
                    ...d,
                    accuracy_pct: Math.round((d.correct / Math.max(d.total, 1)) * 100)
                }));

                const synthResult = {
                    score_earned: sess.score_earned,
                    max_score: sess.max_score,
                    accuracy_pct: Math.round((sess.correct_count / sess.total_questions) * 100),
                    correct_count: sess.correct_count,
                    wrong_count: sess.total_questions - sess.correct_count,
                    time_spent_seconds: sess.time_spent_seconds,
                    domain_breakdown: domainList,
                    evaluated_answers: evaluated
                };

                this.renderResults(synthResult, synthSession);
                this.navigate('results');
            }
        } catch (err) {
            console.error('Failed to view review', err);
        }
    },

    // ==========================================
    // 5. MISTAKE NOTEBOOK
    // ==========================================

    async loadMistakes() {
        try {
            const res = await fetch('/api/mistakes');
            const data = await res.json();
            if (data.success) {
                this.state.allMistakes = data.data;
                document.getElementById('sidebar-mistakes-count').textContent = data.data.filter(m => m.mastery_status !== 'mastered').length;
                this.renderMistakesList();
            }
        } catch (err) {
            console.error('Failed to load mistakes', err);
        }
    },

    filterMistakes(status) {
        this.state.currentMistakeFilter = status;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.status === status) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.renderMistakesList();
    },

    renderMistakesList() {
        const container = document.getElementById('mistakes-list');
        const filter = this.state.currentMistakeFilter;
        const list = filter === 'all'
            ? this.state.allMistakes
            : this.state.allMistakes.filter(m => m.mastery_status === filter);

        if (list.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    🎉 เยี่ยมมาก! ไม่มีข้อสอบที่ต้องทบทวนในหมวดนี้
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(m => `
            <div class="mistake-card glass-panel" id="mistake-card-${m.question_id}">
                <div class="mistake-top">
                    <div class="mistake-tags">
                        <span class="subject-cat-badge cat-tgat">${m.subject_name}</span>
                        <span class="q-domain-pill">${m.subtopic_name || m.domain_name}</span>
                        <span class="meta-chip" style="color: var(--accent-rose);">ผิดไปแล้ว ${m.times_wrong} ครั้ง</span>
                    </div>

                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                        <button class="btn btn-outline btn-sm" onclick="app.toggleSaveQuestionById('${m.question_id}', '')" title="บันทึกข้อนี้ไว้ในคลังถาม AI">
                            🔖 เก็บไว้ถาม AI
                        </button>
                        <button class="btn-ai-tutor" onclick="app.openAiTutor('${m.question_id}', '')" title="ปรึกษา TCAS Master AI เกี่ยวกับข้อที่เคยทำผิด">
                            <span>🤖</span> คุยกับ AI ข้อนี้
                        </button>
                        <select class="mistake-status-select" onchange="app.updateMistakeStatus('${m.question_id}', this.value)">
                            <option value="need_review" ${m.mastery_status === 'need_review' ? 'selected' : ''}>⚠️ ต้องทบทวนด่วน</option>
                            <option value="reviewing" ${m.mastery_status === 'reviewing' ? 'selected' : ''}>🔄 กำลังฝึกฝน</option>
                            <option value="mastered" ${m.mastery_status === 'mastered' ? 'selected' : ''}>✅ แม่นยำแล้ว</option>
                        </select>
                        <button class="btn btn-outline btn-sm" onclick="app.removeMistake('${m.question_id}')" title="ลบออกจากสมุดจุดอ่อน">🗑️</button>
                    </div>
                </div>

                ${m.stimulus ? `<div class="stimulus-pane" style="max-height: 180px;"><div class="stimulus-body">${m.stimulus}</div></div>` : ''}

                <div class="sol-q-text">${m.question_text}</div>

                <div class="sol-answer-compare">
                    <div class="compare-line">
                        <span class="compare-label" style="color: var(--accent-emerald);">คำตอบที่ถูกต้อง:</span>
                        <span>${m.correct_label ? `${m.correct_label}. ${m.correct_content}` : ''}</span>
                    </div>
                </div>

                <div class="explanation-box">
                    <div class="explanation-title">💡 เฉลยละเอียด:</div>
                    <div class="explanation-body">${m.explanation}</div>
                </div>

                ${m.trap_analysis ? `
                    <div class="trap-box">
                        <span>⚠️</span>
                        <div><strong>ข้อนี้ชอบหลอกตรงไหน:</strong> ${m.trap_analysis}</div>
                    </div>
                ` : ''}

                <div>
                    <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted);">📝 โน้ตเตือนใจส่วนตัว (พิมพ์สูตรลัดหรือจุดที่เคยลืม):</label>
                    <textarea class="mistake-note-input" rows="2" placeholder="เช่น จำสับสนระหว่างคำว่า reluctant กับ eager, ข้อนี้อย่าลืมกลับเครื่องหมายอสมการ..."
                        onblur="app.saveMistakeNote('${m.question_id}', this.value)">${m.user_note || ''}</textarea>
                </div>
            </div>
        `).join('');

        this.renderMath();
    },

    async updateMistakeStatus(questionId, status) {
        try {
            await fetch(`/api/mistakes/${questionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mastery_status: status })
            });
            this.showToast('อัปเดตสถานะสำเร็จ', 'success');
            await this.loadMistakes();
        } catch (err) {
            console.error('Failed to update status', err);
        }
    },

    async saveMistakeNote(questionId, note) {
        try {
            await fetch(`/api/mistakes/${questionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_note: note })
            });
            this.showToast('บันทึกโน้ตสำเร็จ', 'success');
        } catch (err) {
            console.error('Failed to save note', err);
        }
    },

    async removeMistake(questionId) {
        if (!confirm('ต้องการลบข้อสอบนี้ออกจากสมุดจุดอ่อนหรือไม่?')) return;
        try {
            await fetch(`/api/mistakes/${questionId}`, { method: 'DELETE' });
            this.showToast('ลบออกจากสมุดจุดอ่อนแล้ว', 'info');
            await this.loadMistakes();
        } catch (err) {
            console.error('Failed to delete mistake', err);
        }
    },

    async confirmClearAllMistakes() {
        if (!this.state.allMistakes || this.state.allMistakes.length === 0) {
            this.showToast('ไม่มีข้อสอบในสมุดจุดอ่อนให้ลบ', 'info');
            return;
        }
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อสอบในสมุดจุดอ่อน "ทั้งหมด"? ข้อมูลข้อสอบที่เคยบันทึกไว้จะถูกรีเซ็ตและไม่สามารถย้อนกลับได้')) {
            return;
        }
        try {
            const res = await fetch('/api/mistakes', { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                this.state.allMistakes = [];
                const badge = document.getElementById('sidebar-mistakes-count');
                if (badge) badge.textContent = '0';
                this.renderMistakesList();
                this.showToast('ลบข้อสอบในสมุดจุดอ่อนทั้งหมดเรียบร้อยแล้ว', 'success');
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error('Failed to clear all mistakes', err);
            this.showToast('เกิดข้อผิดพลาดในการลบ: ' + err.message, 'error');
        }
    },

    practiceMistakes() {
        if (this.state.allMistakes.length === 0) {
            this.showToast('ไม่มีข้อสอบในสมุดจุดอ่อนให้ฝึกทำ', 'info');
            return;
        }
        this.startExam('all', 'mistakes_review');
    },

    // ==========================================
    // 5.1 MASTERED / COMPLETED QUESTIONS CONTROLLER
    // ==========================================

    async loadMastered(subjectId = 'all') {
        try {
            this.state.currentMasteredSubject = subjectId;
            let url = '/api/questions/mastered';
            if (subjectId && subjectId !== 'all') {
                url += `?subject_id=${subjectId}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.allMastered = data.data.questions || [];
            const stats = data.data.subject_stats || [];

            // Update sidebar badge
            const sideMasteredBadge = document.getElementById('sidebar-mastered-count');
            if (sideMasteredBadge) sideMasteredBadge.textContent = data.data.total_mastered || 0;

            this.renderMasteredFilters(stats, subjectId);
            this.renderMasteredQuestions();
        } catch (err) {
            console.error('Failed to load mastered questions:', err);
        }
    },

    renderMasteredFilters(stats, activeSubId) {
        const container = document.getElementById('mastered-subject-pills');
        if (!container) return;

        const totalAll = stats.reduce((acc, s) => acc + (s.mastered_count || 0), 0);
        let html = `
            <button class="filter-pill ${activeSubId === 'all' ? 'active' : ''}" onclick="app.loadMastered('all')">
                ทั้งหมด (${totalAll})
            </button>
        `;

        stats.forEach(s => {
            const count = s.mastered_count || 0;
            html += `
                <button class="filter-pill ${activeSubId === s.subject_id ? 'active' : ''}" onclick="app.loadMastered('${s.subject_id}')">
                    ${s.code} ${this.escapeHtml(s.name_th)} (${count}/${s.catalog_total})
                </button>
            `;
        });

        container.innerHTML = html;
    },

    renderMasteredQuestions() {
        const container = document.getElementById('mastered-list');
        if (!container) return;

        const list = this.state.allMastered;
        if (!list || list.length === 0) {
            container.innerHTML = `
                <div class="empty-state glass-panel" style="text-align: center; padding: 3.5rem 2rem;">
                    <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🏆</span>
                    <h3 style="color: #fff; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">ยังไม่มีข้อสอบในคลังที่พิชิตแล้ว</h3>
                    <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
                        เมื่อคุณทำข้อสอบในโหมดจำลองสอบจริงและตอบถูก ข้อสอบจะถูกคัดออกจากคลังหลักและบันทึกมาไว้ที่นี่อัตโนมัติ!
                    </p>
                    <button class="btn btn-primary" onclick="app.navigate('dashboard')">
                        ⚡ เริ่มทำข้อสอบเพื่อเก็บแต้ม
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map((q, idx) => {
            const passedDate = q.last_passed_at ? new Date(q.last_passed_at).toLocaleDateString('th-TH') : '';
            return `
                <div class="mastered-card glass-panel" id="mastered-card-${q.id}">
                    <div class="mastered-card-header">
                        <div class="mastered-meta-tags">
                            <span class="subject-pill">${q.subject_code || q.subject_id}</span>
                            <span class="domain-pill">${this.escapeHtml(q.subtopic_name || q.domain_name || 'ทั่วไป')}</span>
                            <span class="passed-badge">✓ ตอบถูกแล้ว ${q.times_correct} ครั้ง</span>
                            ${passedDate ? `<span class="date-pill">ล่าสุด: ${passedDate}</span>` : ''}
                        </div>
                        <div class="mastered-card-actions">
                            <button class="btn btn-outline-danger btn-sm" onclick="app.removeMasteredQuestion('${q.id}')" title="ย้ายข้อนี้กลับเข้าสู่คลังข้อสอบหลักเพื่อฝึกซ้ำ">
                                🔄 ย้ายกลับเข้าคลังหลัก
                            </button>
                        </div>
                    </div>

                    ${q.stimulus ? `<div class="question-stimulus">${this.escapeHtml(q.stimulus)}</div>` : ''}
                    <div class="question-text" style="font-size: 1.05rem; font-weight: 600; color: #fff; margin: 0.75rem 0;">
                        ${this.escapeHtml(q.question_text)}
                    </div>

                    <div class="mastered-options-preview">
                        ${q.options.map(opt => `
                            <div class="mastered-opt-row ${opt.is_correct ? 'is-correct' : ''}">
                                <span class="opt-label">${opt.label}</span>
                                <span class="opt-content">${this.escapeHtml(opt.content)}</span>
                                ${opt.is_correct ? '<span class="correct-tag">✓ คำตอบที่ถูกต้อง</span>' : ''}
                            </div>
                        `).join('')}
                    </div>

                    ${q.explanation ? `
                        <div class="explanation-box" style="margin-top: 1rem;">
                            <span class="exp-title">💡 เฉลยละเอียด & คำอธิบาย:</span>
                            <p style="margin: 0.25rem 0 0; color: #e2e8f0; font-size: 0.9rem;">${this.escapeHtml(q.explanation)}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    },

    async removeMasteredQuestion(questionId) {
        try {
            const res = await fetch(`/api/questions/mastered/${questionId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                this.showToast('ย้ายข้อสอบกลับเข้าสู่คลังหลักเรียบร้อย', 'success');
                await this.loadMastered(this.state.currentMasteredSubject);
                await this.loadSubjects();
            } else {
                this.showToast(data.error || 'เกิดข้อผิดพลาด', 'error');
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        }
    },

    async confirmResetMastered() {
        const sub = this.state.currentMasteredSubject;
        const msg = sub === 'all'
            ? 'คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อสอบที่ผ่านแล้วทั้งหมดกลับเข้าสู่คลังข้อสอบหลัก?'
            : `คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อสอบวิชานี้กลับเข้าสู่คลังข้อสอบหลัก?`;

        if (!confirm(msg)) return;

        try {
            const res = await fetch('/api/questions/mastered/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject_id: sub })
            });
            const data = await res.json();
            if (data.success) {
                this.showToast(data.message || 'รีเซ็ตข้อสอบกลับสู่คลังหลักเรียบร้อย', 'success');
                await this.loadMastered(sub);
                await this.loadSubjects();
                await this.loadDashboard();
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        }
    },

    async startMasteredReview() {
        try {
            const sub = this.state.currentMasteredSubject || 'all';
            const res = await fetch('/api/sessions/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_type: 'mastered_review',
                    subject_id: sub === 'all' ? 'tgat1' : sub,
                    question_limit: 20
                })
            });
            const data = await res.json();
            if (data.success) {
                this.state.activeSession = data.data;
                this.state.currentQuestionIndex = 0;
                this.state.userAnswers = {};
                this.state.timeRemainingSeconds = data.data.time_limit_seconds;
                this.navigate('exam');
                this.renderExamInterface();
                this.startExamTimer();
            } else {
                this.showToast(data.error || 'ไม่สามารถเริ่มการทบทวนได้', 'warning');
            }
        } catch (err) {
            this.showToast('ไม่สามารถเริ่มการทบทวนได้: ' + err.message, 'error');
        }
    },

    // ==========================================
    // 6. QUICK START MODAL & CUSTOM QUESTIONS
    // ==========================================

    openQuickStartModal() {
        const modal = document.getElementById('quick-start-modal');
        modal.classList.add('open');
    },

    closeQuickStartModal() {
        document.getElementById('quick-start-modal').classList.remove('open');
    },

    populateModalSubjects(subjects) {
        const sel = document.getElementById('modal-subject-select');
        sel.innerHTML = subjects.map(s => `
            <option value="${s.id}">${s.code} - ${s.name_th}</option>
        `).join('');
        if (subjects.length > 0) {
            this.handleModalSubjectChange(subjects[0].id);
        }
    },

    async handleModalSubjectChange(subjectId) {
        try {
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (data.success && data.data.blueprints) {
                const bpSelect = document.getElementById('modal-blueprint-select');
                bpSelect.innerHTML = `
                    <option value="">ทั้งหมดในวิชานี้ (สุ่มตามเกณฑ์)</option>
                    ${data.data.blueprints.map(bp => `
                        <option value="${bp.id}">${bp.domain_name} - ${bp.subtopic_name}</option>
                    `).join('')}
                `;
            }
        } catch (err) {
            console.error('Failed to populate blueprints for modal', err);
        }
    },

    startExamFromModal() {
        const subjectId = document.getElementById('modal-subject-select').value;
        const sessionType = document.querySelector('input[name="modal_session_type"]:checked').value;
        const bpId = document.getElementById('modal-blueprint-select').value;

        this.closeQuickStartModal();
        this.startExam(subjectId, sessionType, bpId || null);
    },

    // ==========================================
    // 7. ADD QUESTION & AI PROMPT
    // ==========================================

    populateAddFormSubjects() {
        const sel = document.getElementById('add-subject-select');
        sel.innerHTML = `
            <option value="">-- เลือกวิชา --</option>
            ${this.state.subjects.map(s => `<option value="${s.id}">${s.code} - ${s.name_th}</option>`).join('')}
        `;
    },

    async handleSubjectChangeInAddForm(subjectId) {
        const bpSelect = document.getElementById('add-blueprint-select');
        if (!subjectId) {
            bpSelect.innerHTML = '<option value="">-- กรุณาเลือกวิชาก่อน --</option>';
            return;
        }

        try {
            const res = await fetch(`/api/subjects/${subjectId}`);
            const data = await res.json();
            if (data.success && data.data.blueprints) {
                bpSelect.innerHTML = data.data.blueprints.map(bp => `
                    <option value="${bp.id}">${bp.domain_name} - ${bp.subtopic_name}</option>
                `).join('');
            }
        } catch (err) {
            console.error('Failed to load blueprints for add form', err);
        }
    },

    switchAddMode(mode) {
        const formManual = document.getElementById('form-add-question');
        const panelAI = document.getElementById('panel-add-ai');
        const tabManual = document.getElementById('tab-add-manual');
        const tabAI = document.getElementById('tab-add-ai');

        if (mode === 'manual') {
            formManual.style.display = 'block';
            panelAI.style.display = 'none';
            tabManual.classList.add('active');
            tabAI.classList.remove('active');
        } else {
            formManual.style.display = 'none';
            panelAI.style.display = 'block';
            tabManual.classList.remove('active');
            tabAI.classList.add('active');
        }
    },

    async handleSaveCustomQuestion(e) {
        e.preventDefault();

        const subjectId = document.getElementById('add-subject-select').value;
        const blueprintId = document.getElementById('add-blueprint-select').value;
        const stimulus = document.getElementById('add-stimulus').value;
        const questionText = document.getElementById('add-question-text').value;
        const difficulty = document.getElementById('add-difficulty').value;
        const explanation = document.getElementById('add-explanation').value;
        const trap = document.getElementById('add-trap').value;

        // Collect choices
        const optionRows = document.querySelectorAll('.option-input-row');
        const selectedCorrectRadio = document.querySelector('input[name="correct_opt"]:checked').value;

        const options = [];
        optionRows.forEach((row, idx) => {
            const content = row.querySelector('.opt-content').value;
            options.push({
                label: String(idx + 1),
                content: content,
                is_correct: parseInt(selectedCorrectRadio, 10) === idx
            });
        });

        try {
            const res = await fetch('/api/questions/custom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject_id: subjectId,
                    blueprint_id: blueprintId,
                    stimulus,
                    question_text: questionText,
                    difficulty,
                    explanation,
                    trap_analysis: trap,
                    options
                })
            });

            const data = await res.json();
            if (data.success) {
                this.showToast('บันทึกข้อสอบลงในฐานข้อมูล SQLite สำเร็จ!', 'success');
                e.target.reset();
                this.loadSubjects();
            } else {
                this.showToast(data.error || 'ไม่สามารถบันทึกข้อสอบได้', 'error');
            }
        } catch (err) {
            console.error('Failed to save custom question', err);
            this.showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
        }
    },

    copyAIPrompt() {
        const promptText = document.getElementById('ai-prompt-template').textContent.trim();
        navigator.clipboard.writeText(promptText).then(() => {
            this.showToast('คัดลอก Prompt สำหรับ AI เรียบร้อยแล้ว!', 'success');
        });
    },

    // ==========================================
    // 8. TEXT SELECTION, HIGHLIGHTER & TRANSLATE
    // ==========================================

    setupTextSelectionListener() {
        const handleSelection = () => {
            const bubble = document.getElementById('selection-action-bubble');
            if (!bubble) return;

            // 1. Only allow highlighter / vocab lookup in exam-related and study views
            const allowedViews = ['exam', 'results', 'mistakes', 'vocab'];
            if (!allowedViews.includes(this.state.currentView)) {
                bubble.style.display = 'none';
                return;
            }

            const selection = window.getSelection();
            const text = selection ? selection.toString().trim() : '';

            if (!text || text.length === 0 || text.length > 300) {
                bubble.style.display = 'none';
                return;
            }

            const anchorNode = selection.anchorNode;
            if (!anchorNode) {
                bubble.style.display = 'none';
                return;
            }
            const parentElem = anchorNode.nodeType === 3 ? anchorNode.parentElement : anchorNode;

            // 2. Avoid triggering anywhere inside non-content UI, form controls, scratchpad, modals, headers, or SVG
            if (parentElem.closest('input, textarea, button, select, svg, .radar-svg, .rpg-panel, .rpg-hero-card, .rpg-power-card, .scratchpad-overlay, #selection-action-bubble, .modal-overlay, .topbar, .sidebar, .badge, .meta-chip, .user-chip')) {
                bubble.style.display = 'none';
                return;
            }

            // 3. Strict container check - text must be within an exam passage, question, solution explanation, mistake, or vocab card
            const allowedContainer = parentElem.closest(
                '.exam-passage-pane, .exam-question-pane, #exam-passage-container, #exam-question-container, ' +
                '.solution-card, .mistake-card, .vocab-card, .flashcard-box, .sol-q-text, .sol-explanation, .sol-trap, .stimulus-pane'
            );
            if (!allowedContainer) {
                bubble.style.display = 'none';
                return;
            }

            this.state.selectedText = text;
            try {
                this.state.selectedRange = selection.getRangeAt(0).cloneRange();
                const rect = selection.getRangeAt(0).getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0) {
                    bubble.style.display = 'none';
                    return;
                }

                // If Highlight Mode is explicitly turned on, immediately apply highlight to selection!
                if (this.state.highlightMode) {
                    this.highlightSelection('yellow');
                    return;
                }

                // Extract sentence context for vocab lookup
                const fullText = parentElem.innerText || parentElem.textContent || '';
                this.state.selectedContext = this.extractContextSentence(fullText, text);

                // Smart vertical positioning:
                const bubbleHeight = 46;
                const bubbleWidth = bubble.offsetWidth || 300;
                let topPos;
                if (rect.top - bubbleHeight - 14 < 80) {
                    topPos = rect.bottom + 10;
                } else {
                    topPos = rect.top - bubbleHeight - 10;
                }

                const centerX = rect.left + rect.width / 2;
                const minLeft = bubbleWidth / 2 + 16;
                const maxLeft = window.innerWidth - bubbleWidth / 2 - 16;
                const leftPos = Math.max(minLeft, Math.min(maxLeft, centerX));

                bubble.style.position = 'fixed';
                bubble.style.left = `${leftPos}px`;
                bubble.style.top = `${topPos}px`;
                bubble.style.transform = 'translateX(-50%)';
                bubble.style.display = 'flex';
            } catch (err) {
                console.error('Selection rect error:', err);
                bubble.style.display = 'none';
            }
        };

        document.addEventListener('mouseup', (e) => {
            if (e.target.closest('#selection-action-bubble') || e.target.closest('#vocab-lookup-modal')) return;
            setTimeout(handleSelection, 20);
        });

        document.addEventListener('keyup', (e) => {
            if (['Shift', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                handleSelection();
            } else if (e.key === 'Escape') {
                const bubble = document.getElementById('selection-action-bubble');
                if (bubble) bubble.style.display = 'none';
            }
        });

        // Auto-dismiss bubble whenever selection is cleared or collapsed
        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !sel.toString().trim()) {
                const bubble = document.getElementById('selection-action-bubble');
                if (bubble && bubble.style.display !== 'none') {
                    bubble.style.display = 'none';
                }
            }
        });

        // Hide bubble when clicking outside
        document.addEventListener('mousedown', (e) => {
            const bubble = document.getElementById('selection-action-bubble');
            if (bubble && !e.target.closest('#selection-action-bubble') && !e.target.closest('#vocab-lookup-modal')) {
                bubble.style.display = 'none';
            }
        });

        window.addEventListener('scroll', () => {
            const bubble = document.getElementById('selection-action-bubble');
            if (bubble && bubble.style.display !== 'none') {
                bubble.style.display = 'none';
            }
        }, { passive: true, capture: true });
    },

    extractContextSentence(fullText, phrase) {
        if (!fullText || !phrase) return '';
        const idx = fullText.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx === -1) return phrase;

        let start = idx;
        while (start > 0 && !['.', '!', '?', '\n'].includes(fullText[start - 1])) {
            start--;
        }

        let end = idx + phrase.length;
        while (end < fullText.length && !['.', '!', '?', '\n'].includes(fullText[end])) {
            end++;
        }
        if (end < fullText.length && ['.', '!', '?'].includes(fullText[end])) end++;

        return fullText.substring(start, end).trim();
    },

    toggleHighlightMode() {
        this.state.highlightMode = !this.state.highlightMode;
        const btn = document.getElementById('btn-toggle-highlighter');
        const label = document.getElementById('hl-mode-label');
        if (this.state.highlightMode) {
            if (btn) btn.classList.add('btn-hl-active');
            if (label) label.textContent = '🖍️ โหมดไฮไลต์ (เปิด)';
            this.showToast('โหมดไฮไลต์เปิด: ลากคลุมข้อความที่ต้องการเน้น', 'info');
        } else {
            if (btn) btn.classList.remove('btn-hl-active');
            if (label) label.textContent = '🖍️ โหมดไฮไลต์';
            this.showToast('ปิดโหมดไฮไลต์แล้ว', 'info');
        }
    },

    highlightSelection(color = 'yellow') {
        const selection = window.getSelection();
        const range = this.state.selectedRange || (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null);
        if (!range || range.collapsed) return;

        const mark = document.createElement('mark');
        mark.className = `exam-hl-${color}`;
        mark.title = 'แตะเพื่อลบไฮไลต์';
        mark.onclick = (e) => {
            e.stopPropagation();
            const parent = mark.parentNode;
            while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
            parent.removeChild(mark);
            app.showToast('ลบไฮไลต์แล้ว', 'info');
        };

        try {
            range.surroundContents(mark);
        } catch (err) {
            try {
                const fragment = range.extractContents();
                mark.appendChild(fragment);
                range.insertNode(mark);
            } catch (err2) {
                console.error('Highlight failed:', err2);
                document.execCommand('hiliteColor', false, color === 'yellow' ? '#facc15' : color === 'emerald' ? '#10b981' : '#f43f5e');
            }
        }

        if (window.getSelection()) {
            window.getSelection().removeAllRanges();
        }

        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
        this.showToast('ไฮไลต์ข้อความเรียบร้อย! (แตะที่สีเพื่อลบ)', 'success');
    },

    removeSelectionHighlight() {
        const selection = window.getSelection();
        if (selection && selection.anchorNode) {
            const elem = selection.anchorNode.nodeType === 3 ? selection.anchorNode.parentElement : selection.anchorNode;
            const mark = elem.closest('mark');
            if (mark) {
                const parent = mark.parentNode;
                while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
                parent.removeChild(mark);
                this.showToast('ลบไฮไลต์แล้ว', 'info');
            }
        }
        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';
    },

    async translateSelectedText() {
        const rawWord = this.state.selectedText;
        if (!rawWord) return;

        // Clean punctuation from word
        const cleanWord = rawWord.trim().replace(/^['"“‘(\[]+|[.,!?;:)'"”’\]]+$/g, '');
        if (!cleanWord) return;

        const bubble = document.getElementById('selection-action-bubble');
        if (bubble) bubble.style.display = 'none';

        try {
            this.showToast(`กำลังแปลคำว่า "${cleanWord}"...`, 'info');
            const res = await fetch(`/api/vocab/translate?word=${encodeURIComponent(cleanWord)}`);
            const result = await res.json();
            if (result.success) {
                const data = result.data;
                document.getElementById('vocab-modal-word').textContent = data.word;
                document.getElementById('vocab-modal-phonetic').textContent = data.phonetic || '';
                document.getElementById('vocab-modal-pos').textContent = data.pos || '';
                document.getElementById('vocab-modal-def').value = data.definition_th || '';
                document.getElementById('vocab-modal-context').value = this.state.selectedContext || '';

                document.getElementById('vocab-lookup-modal').classList.add('open');
            }
        } catch (err) {
            console.error('Translation failed', err);
            this.showToast('ไม่สามารถแปลคำศัพท์ได้', 'error');
        }
    },

    speakWord(customWord) {
        const word = customWord || document.getElementById('vocab-modal-word').textContent.trim();
        if (!word) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(word);
            utter.lang = 'en-US';
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        } else {
            this.showToast('เบราว์เซอร์ไม่รองรับระบบออกเสียง', 'info');
        }
    },

    closeVocabModal() {
        document.getElementById('vocab-lookup-modal').classList.remove('open');
    },

    async saveCurrentVocab() {
        const word = document.getElementById('vocab-modal-word').textContent.trim();
        const phonetic = document.getElementById('vocab-modal-phonetic').textContent.trim();
        const pos = document.getElementById('vocab-modal-pos').textContent.trim();
        const def = document.getElementById('vocab-modal-def').value.trim();
        const context = document.getElementById('vocab-modal-context').value.trim();

        const currentQ = this.state.activeSession?.questions[this.state.currentQuestionIndex];

        try {
            const res = await fetch('/api/vocab', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    word,
                    phonetic,
                    part_of_speech: pos,
                    definition_th: def,
                    context_sentence: context,
                    source_question_id: currentQ ? currentQ.id : null
                })
            });

            const data = await res.json();
            if (data.success) {
                this.showToast(`บันทึกคำว่า "${word}" เข้าคลังคำศัพท์แล้ว!`, 'success');
                this.closeVocabModal();
                await this.loadVocab();
            } else {
                this.showToast(data.error || 'ไม่สามารถบันทึกได้', 'error');
            }
        } catch (err) {
            console.error('Failed to save vocab', err);
            this.showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
        }
    },

    // ==========================================
    // 9. VOCABULARY BANK VIEW & FLASHCARDS
    // ==========================================

    async loadVocab() {
        try {
            const res = await fetch('/api/vocab');
            const data = await res.json();
            if (data.success) {
                this.state.allVocab = data.data;
                const activeCount = data.data.filter(v => v.mastery_status !== 'mastered').length;
                const badge = document.getElementById('sidebar-vocab-count');
                if (badge) badge.textContent = activeCount;
                this.renderVocabList();
            }
        } catch (err) {
            console.error('Failed to load vocab', err);
        }
    },

    filterVocab(status) {
        this.state.currentVocabFilter = status;
        document.querySelectorAll('[data-vstatus]').forEach(btn => {
            if (btn.dataset.vstatus === status) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        this.renderVocabList();
    },

    searchVocab(query) {
        const q = (query || '').toLowerCase().trim();
        const container = document.getElementById('vocab-list-container');
        if (!container) return;

        let list = this.state.currentVocabFilter === 'all'
            ? this.state.allVocab
            : this.state.allVocab.filter(v => v.mastery_status === this.state.currentVocabFilter);

        if (q) {
            list = list.filter(v =>
                v.word.toLowerCase().includes(q) ||
                v.definition_th.toLowerCase().includes(q) ||
                (v.context_sentence && v.context_sentence.toLowerCase().includes(q))
            );
        }

        this.renderVocabItems(list);
    },

    renderVocabList() {
        const filter = this.state.currentVocabFilter;
        const list = filter === 'all'
            ? this.state.allVocab
            : this.state.allVocab.filter(v => v.mastery_status === filter);
        this.renderVocabItems(list);
    },

    renderVocabItems(list) {
        const container = document.getElementById('vocab-list-container');
        if (!container) return;

        if (list.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center;">
                    <div style="display:flex;justify-content:center;margin-bottom: 0.75rem;">${this.svg('book', {size: 36, color: 'var(--accent-indigo)'})}</div>
                    <div style="font-weight: 700; font-size: 1.1rem; color: #f1f5f9; margin-bottom: 0.5rem;">ยังไม่มีคำศัพท์ในหมวดนี้</div>
                    <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto; font-size: 0.9rem;">
                        ขณะฝึกทำข้อสอบภาษาอังกฤษ สามารถลากคลุมเฉพาะคำศัพท์ที่ไม่คุ้นเคยเพื่อแปลและบันทึกเข้าคลังคำศัพท์นี้ได้ทันที
                    </p>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(v => {
            const escapedWord = v.word.replace(/'/g, "\\'");
            // Highlight target word in context sentence
            let formattedContext = v.context_sentence || '';
            if (formattedContext && v.word) {
                const regex = new RegExp(`\\b(${v.word})\\b`, 'gi');
                formattedContext = formattedContext.replace(regex, '<mark>$1</mark>');
            }

            return `
                <div class="vocab-card" id="vocab-card-${v.id}">
                    <div class="vocab-card-top">
                        <div class="vocab-card-word-group">
                            <div class="vocab-card-word">
                                <span>${v.word}</span>
                                <button class="vocab-speak-btn" onclick="app.speakWord('${escapedWord}')" title="ฟังการออกเสียง (Pronounce)">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                                </button>
                            </div>
                            <div class="vocab-card-meta">
                                ${v.phonetic ? `<span class="vocab-card-phonetic">${v.phonetic}</span>` : ''}
                                ${v.part_of_speech ? `<span class="vocab-card-pos">${v.part_of_speech}</span>` : ''}
                            </div>
                        </div>

                        <select class="vocab-status-select" onchange="app.updateVocabStatus('${v.id}', this.value)">
                            <option value="learning" ${v.mastery_status === 'learning' ? 'selected' : ''}>📖 กำลังจำ</option>
                            <option value="reviewing" ${v.mastery_status === 'reviewing' ? 'selected' : ''}>🔄 ทบทวน</option>
                            <option value="mastered" ${v.mastery_status === 'mastered' ? 'selected' : ''}>✅ จำแม่นแล้ว</option>
                        </select>
                    </div>

                    <div class="vocab-card-def">
                        <span style="color: #10b981; font-weight: 700; margin-right: 0.35rem;">แปล:</span>${v.definition_th}
                    </div>

                    ${formattedContext ? `<div class="vocab-card-context">“${formattedContext}”</div>` : ''}

                    <div class="vocab-card-footer">
                        <span class="vocab-date-badge">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            ${new Date(v.created_at).toLocaleDateString('th-TH')}
                        </span>
                        <button class="vocab-delete-btn" onclick="app.deleteVocab('${v.id}')" title="ลบคำศัพท์นี้ออกจากคลัง">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            ลบ
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    async updateVocabStatus(id, status) {
        try {
            await fetch(`/api/vocab/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mastery_status: status })
            });
            this.showToast('อัปเดตสถานะคำศัพท์สำเร็จ', 'success');
            await this.loadVocab();
        } catch (err) {
            console.error('Failed to update vocab', err);
        }
    },

    async deleteVocab(id) {
        if (!confirm('ต้องการลบคำศัพท์นี้ออกจากคลังหรือไม่?')) return;
        try {
            await fetch(`/api/vocab/${id}`, { method: 'DELETE' });
            this.showToast('ลบคำศัพท์แล้ว', 'info');
            await this.loadVocab();
        } catch (err) {
            console.error('Failed to delete vocab', err);
        }
    },

    // Flashcards Runner
    startVocabFlashcards() {
        if (this.state.allVocab.length === 0) {
            this.showToast('ไม่มีคำศัพท์ในคลังให้เริ่มโหมดการ์ด', 'info');
            return;
        }

        this.state.activeFlashcards = [...this.state.allVocab].sort(() => Math.random() - 0.5);
        this.state.flashcardIndex = 0;

        document.getElementById('flashcard-runner').style.display = 'flex';
        document.getElementById('vocab-list-container').style.display = 'none';

        this.renderCurrentFlashcard();
    },

    stopVocabFlashcards() {
        document.getElementById('flashcard-runner').style.display = 'none';
        document.getElementById('vocab-list-container').style.display = 'grid';
    },

    renderCurrentFlashcard() {
        const list = this.state.activeFlashcards;
        const idx = this.state.flashcardIndex;
        if (!list || list.length === 0 || !list[idx]) return;

        const v = list[idx];
        const cardBox = document.getElementById('flashcard-box');
        cardBox.classList.remove('flipped');

        document.getElementById('fc-index').textContent = idx + 1;
        document.getElementById('fc-total').textContent = list.length;

        document.getElementById('fc-word-front').textContent = v.word;
        document.getElementById('fc-phonetic-front').textContent = v.phonetic || '';
        document.getElementById('fc-pos-front').textContent = v.part_of_speech || '';

        document.getElementById('fc-def-back').textContent = v.definition_th;
        document.getElementById('fc-context-back').textContent = v.context_sentence ? `"${v.context_sentence}"` : '';

        // Auto pronounce when front shows
        this.speakWord(v.word);
    },

    flipFlashcard() {
        document.getElementById('flashcard-box').classList.toggle('flipped');
    },

    nextFlashcard() {
        if (this.state.flashcardIndex < this.state.activeFlashcards.length - 1) {
            this.state.flashcardIndex++;
            this.renderCurrentFlashcard();
        } else {
            this.showToast('🎉 จบชุดการ์ดคำศัพท์แล้ว!', 'success');
            this.stopVocabFlashcards();
        }
    },

    prevFlashcard() {
        if (this.state.flashcardIndex > 0) {
            this.state.flashcardIndex--;
            this.renderCurrentFlashcard();
        }
    },

    async markFlashcardMastered() {
        const v = this.state.activeFlashcards[this.state.flashcardIndex];
        if (v) {
            await this.updateVocabStatus(v.id, 'mastered');
            this.showToast(`บันทึกคำว่า "${v.word}" ว่าจำได้แล้ว!`, 'success');
            this.nextFlashcard();
        }
    },

    // ==========================================
    // 10. SCRATCHPAD MATH CANVAS ENGINE
    // ==========================================

    initScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        this.scratchCtx = ctx;

        this.setupScratchpadDrag();

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = rect.width > 0 ? (canvas.width / rect.width) : 1;
            const scaleY = rect.height > 0 ? (canvas.height / rect.height) : 1;
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        };

        const setupContext = () => {
            if (this.state.scratchTool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineWidth = this.state.scratchStrokeSize * 8;
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = this.state.scratchColor;
                ctx.fillStyle = this.state.scratchColor;
                ctx.lineWidth = this.state.scratchStrokeSize;
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        };

        const onPointerDown = (e) => {
            if (e.button !== 0 && e.pointerType === 'mouse') return;
            e.preventDefault();
            this.state.isScratchDrawing = true;
            try { canvas.setPointerCapture(e.pointerId); } catch (_) { }

            setupContext();
            const pos = getPos(e);
            this.scratchStartX = pos.x;
            this.scratchStartY = pos.y;
            this.scratchLastX = pos.x;
            this.scratchLastY = pos.y;

            // Save snapshot for shape preview
            try {
                this.scratchSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            } catch (_) { }

            // Immediate point/dot on click for pen or eraser
            if (this.state.scratchTool === 'pen' || this.state.scratchTool === 'eraser') {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, Math.max(1, ctx.lineWidth / 2), 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const onPointerMove = (e) => {
            if (!this.state.isScratchDrawing) return;
            e.preventDefault();
            const pos = getPos(e);

            if (this.state.scratchTool === 'pen' || this.state.scratchTool === 'eraser') {
                ctx.beginPath();
                ctx.moveTo(this.scratchLastX, this.scratchLastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                this.scratchLastX = pos.x;
                this.scratchLastY = pos.y;
            } else if (this.state.scratchTool === 'line') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                ctx.beginPath();
                ctx.moveTo(this.scratchStartX, this.scratchStartY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            } else if (this.state.scratchTool === 'rect') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                ctx.beginPath();
                ctx.strokeRect(
                    this.scratchStartX,
                    this.scratchStartY,
                    pos.x - this.scratchStartX,
                    pos.y - this.scratchStartY
                );
            } else if (this.state.scratchTool === 'circle') {
                if (this.scratchSnapshot) ctx.putImageData(this.scratchSnapshot, 0, 0);
                setupContext();
                const rx = Math.abs(pos.x - this.scratchStartX) / 2;
                const ry = Math.abs(pos.y - this.scratchStartY) / 2;
                const cx = Math.min(this.scratchStartX, pos.x) + rx;
                const cy = Math.min(this.scratchStartY, pos.y) + ry;
                ctx.beginPath();
                ctx.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
                ctx.stroke();
            }
        };

        const onPointerUp = (e) => {
            if (!this.state.isScratchDrawing) return;
            this.state.isScratchDrawing = false;
            try { canvas.releasePointerCapture(e.pointerId); } catch (_) { }
            this.saveCurrentScratchpad();
        };

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
    },

    setupScratchpadDrag() {
        const handle = document.getElementById('scratchpad-toolbar-handle');
        const dock = document.getElementById('scratchpad-dock');
        if (!handle || !dock) return;

        let isDragging = false;
        let startX = 0, startY = 0, origLeft = 0, origTop = 0;

        handle.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, input, select, .color-btn')) return;
            isDragging = true;
            try { handle.setPointerCapture(e.pointerId); } catch (_) { }
            const rect = dock.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            origLeft = rect.left;
            origTop = rect.top;
            dock.style.transform = 'none';
            dock.style.bottom = 'auto';
            dock.style.right = 'auto';
            dock.style.left = `${origLeft}px`;
            dock.style.top = `${origTop}px`;
        });

        handle.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = Math.max(10, Math.min(window.innerWidth - 120, origLeft + dx));
            const newTop = Math.max(10, Math.min(window.innerHeight - 80, origTop + dy));
            dock.style.left = `${newLeft}px`;
            dock.style.top = `${newTop}px`;
        });

        const stopDrag = (e) => {
            if (!isDragging) return;
            isDragging = false;
            try { handle.releasePointerCapture(e.pointerId); } catch (_) { }
        };

        handle.addEventListener('pointerup', stopDrag);
        handle.addEventListener('pointercancel', stopDrag);
    },

    toggleScratchpad(forceOpen) {
        const dock = document.getElementById('scratchpad-dock');
        const backdrop = document.getElementById('scratchpad-backdrop');
        if (!dock) return;

        let isOpen;
        if (typeof forceOpen === 'boolean') {
            isOpen = forceOpen;
            if (isOpen) {
                dock.classList.add('open');
                if (backdrop) backdrop.classList.add('open');
            } else {
                dock.classList.remove('open');
                if (backdrop) backdrop.classList.remove('open');
            }
        } else {
            isOpen = dock.classList.toggle('open');
            if (backdrop) backdrop.classList.toggle('open', isOpen);
        }

        const btn = document.getElementById('btn-toggle-scratchpad');
        if (btn) {
            if (isOpen) btn.classList.add('btn-hl-active');
            else btn.classList.remove('btn-hl-active');
        }

        if (isOpen) {
            requestAnimationFrame(() => {
                this.ensureScratchpadCanvasSize();
                this.restoreCurrentScratchpad();
            });
        } else {
            this.saveCurrentScratchpad();
        }
    },

    openScratchpadWindow() {
        const session = this.state.activeSession;
        let qId = '_global';
        let qNum = 1;
        let qText = '';

        if (session && session.questions && session.questions[this.state.currentQuestionIndex]) {
            const q = session.questions[this.state.currentQuestionIndex];
            qId = q.id;
            qNum = this.state.currentQuestionIndex + 1;
            qText = q.question_text ? q.question_text.replace(/<[^>]+>/g, '').substring(0, 90) : '';
        }

        this.saveCurrentScratchpad();

        const url = `scratchpad.html?q=${encodeURIComponent(qId)}&num=${qNum}&text=${encodeURIComponent(qText)}`;
        const popup = window.open(url, 'TCAS_Scratchpad', 'width=1050,height=780,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=no');
        if (popup) {
            popup.focus();
            this.showToast('เปิดกระดานทดเลขเป็นหน้าต่างแยก (Pop-up Window) เรียบร้อยแล้ว!', 'info');
        } else {
            this.showToast('กรุณาอนุญาต Pop-up บนเบราว์เซอร์เพื่อเปิดหน้าต่างแยก', 'warning');
        }

        // Close center modal
        this.toggleScratchpad(false);
    },

    setupCrossWindowScratchpadSync() {
        if (typeof BroadcastChannel !== 'undefined') {
            this.scratchpadChannel = new BroadcastChannel('tcas_scratchpad_channel');
            this.scratchpadChannel.onmessage = (event) => {
                const msg = event.data;
                if (!msg) return;

                if (msg.type === 'SCRATCHPAD_UPDATE' && msg.questionId) {
                    this.state.scratchpadData[msg.questionId] = msg.dataUrl;
                    const currentKey = this.getScratchpadKey();
                    if (currentKey === msg.questionId) {
                        this.restoreCurrentScratchpad();
                    }
                }
            };
        }

        // Fallback for storage event
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('tcas_scratchpad_') && e.newValue) {
                const qId = e.key.replace('tcas_scratchpad_', '');
                this.state.scratchpadData[qId] = e.newValue;
                const currentKey = this.getScratchpadKey();
                if (currentKey === qId) {
                    this.restoreCurrentScratchpad();
                }
            }
        });
    },

    notifyScratchpadQuestionChange() {
        const session = this.state.activeSession;
        if (!session || !this.scratchpadChannel) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        this.scratchpadChannel.postMessage({
            type: 'CHANGE_QUESTION',
            questionId: q.id,
            questionIndex: this.state.currentQuestionIndex,
            questionText: q.question_text ? q.question_text.replace(/<[^>]+>/g, '').substring(0, 90) : ''
        });
    },

    ensureScratchpadCanvasSize() {
        const canvas = document.getElementById('scratchpad-canvas');
        const wrapper = document.getElementById('canvas-wrapper');
        if (!canvas || !wrapper) return;

        const w = Math.floor(wrapper.clientWidth) || 850;
        const h = Math.floor(wrapper.clientHeight) || 600;

        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            this.scratchCtx = canvas.getContext('2d');
        }
        if (!this.scratchCtx) {
            this.scratchCtx = canvas.getContext('2d');
        }
    },

    setScratchTool(tool) {
        this.state.scratchTool = tool;
        document.querySelectorAll('.tool-btn').forEach(btn => {
            if (btn.id && btn.id.startsWith('sp-tool-')) {
                btn.classList.remove('active');
            }
        });
        const activeBtn = document.getElementById(`sp-tool-${tool}`);
        if (activeBtn) activeBtn.classList.add('active');
    },

    setScratchColor(color) {
        this.state.scratchColor = color;
        if (this.state.scratchTool === 'eraser') {
            this.setScratchTool('pen');
        }
        document.querySelectorAll('.color-btn').forEach(btn => {
            if (btn.style.background === color || btn.getAttribute('style')?.includes(color)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    setScratchStrokeSize(size) {
        this.state.scratchStrokeSize = parseInt(size, 10);
    },

    toggleScratchGrid() {
        const wrapper = document.getElementById('canvas-wrapper');
        const btn = document.getElementById('sp-grid-toggle');
        if (!wrapper) return;
        this.state.scratchGrid = !this.state.scratchGrid;
        if (this.state.scratchGrid) {
            wrapper.classList.add('grid-bg');
            if (btn) btn.classList.add('active');
            this.showToast('เปิดเส้นตารางกริดคณิตศาสตร์', 'info');
        } else {
            wrapper.classList.remove('grid-bg');
            if (btn) btn.classList.remove('active');
            this.showToast('ปิดเส้นตารางกริด', 'info');
        }
    },

    clearScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        if (!this.scratchCtx) this.scratchCtx = canvas.getContext('2d');
        if (!this.scratchCtx) return;
        this.scratchCtx.clearRect(0, 0, canvas.width, canvas.height);
        this.saveCurrentScratchpad();
        this.showToast('ล้างกระดานทดเลขเรียบร้อย', 'info');
    },

    getScratchpadKey() {
        const session = this.state.activeSession;
        if (session && session.questions && session.questions[this.state.currentQuestionIndex]) {
            return session.questions[this.state.currentQuestionIndex].id;
        }
        return '_global';
    },

    saveCurrentScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        const key = this.getScratchpadKey();
        this.state.scratchpadData[key] = canvas.toDataURL();
    },

    restoreCurrentScratchpad() {
        const canvas = document.getElementById('scratchpad-canvas');
        if (!canvas) return;
        if (!this.scratchCtx) this.scratchCtx = canvas.getContext('2d');
        if (!this.scratchCtx) return;
        const key = this.getScratchpadKey();

        this.scratchCtx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.state.scratchpadData[key]) {
            const img = new Image();
            img.onload = () => {
                if (this.scratchCtx) {
                    this.scratchCtx.drawImage(img, 0, 0);
                }
            };
            img.src = this.state.scratchpadData[key];
        }
    },

    // ==========================================
    // 11. AI TUTOR ASSISTANT CONTROLLER
    // ==========================================

    initAiKeyStatus() {
        const key = localStorage.getItem('tcas_gemini_key') || '';
        const savedModel = localStorage.getItem('tcas_gemini_model') || 'Gemini 3.8 Flash';
        this.state.geminiApiKey = key;
        const modelBadge = document.getElementById('ai-tutor-model-badge');
        if (modelBadge) {
            modelBadge.textContent = key ? (savedModel.toLowerCase().includes('gemini') ? savedModel : `Gemini ${savedModel}`) : 'TCAS Master AI (Offline)';
        }
    },

    openAiKeyModal() {
        const modal = document.getElementById('ai-key-modal');
        const input = document.getElementById('input-gemini-key');
        const resDiv = document.getElementById('ai-key-test-result');
        if (!modal) return;
        if (input) input.value = this.state.geminiApiKey || '';
        if (resDiv) resDiv.style.display = 'none';
        modal.classList.add('open');
    },

    closeAiKeyModal() {
        const modal = document.getElementById('ai-key-modal');
        if (modal) modal.classList.remove('open');
    },

    openAiKeyRecommendModal(onProceed = null) {
        this._pendingAiCallback = onProceed;
        const modal = document.getElementById('ai-key-recommend-modal');
        if (modal) modal.classList.add('open');
    },

    closeAiKeyRecommendModal() {
        const modal = document.getElementById('ai-key-recommend-modal');
        if (modal) modal.classList.remove('open');
    },

    proceedAiWithoutKey() {
        this.closeAiKeyRecommendModal();
        sessionStorage.setItem('tcas_dismiss_key_hint', 'true');
        if (typeof this._pendingAiCallback === 'function') {
            const cb = this._pendingAiCallback;
            this._pendingAiCallback = null;
            cb();
        }
    },

    openAiKeyModalFromRecommend() {
        this.closeAiKeyRecommendModal();
        this.openAiKeyModal();
    },

    async testGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        const resDiv = document.getElementById('ai-key-test-result');
        if (!input || !resDiv) return;
        const val = input.value.trim();
        if (!val) {
            resDiv.style.display = 'block';
            resDiv.style.color = 'var(--accent-amber)';
            resDiv.textContent = 'กรุณากรอก API Key ก่อนทดสอบ';
            return;
        }

        resDiv.style.display = 'block';
        resDiv.style.color = 'var(--accent-cyan)';
        resDiv.textContent = '⏳ กำลังตรวจสอบกับ Google AI Studio...';

        const testBtn = document.querySelector('#ai-key-modal button[onclick*="testGeminiKey"]');
        if (testBtn) {
            testBtn.disabled = true;
            testBtn.textContent = '⏳ กำลังตรวจ...';
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const res = await fetch('/api/ai/verify-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                },
                body: JSON.stringify({ apiKey: val }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (data.success) {
                resDiv.style.color = 'var(--accent-emerald)';
                resDiv.textContent = `✅ ${data.message || 'ยอดเยี่ยม! API Key ใช้งานได้สมบูรณ์'}`;
                if (data.model) {
                    localStorage.setItem('tcas_gemini_model', data.model);
                    this.initAiKeyStatus();
                }
            } else {
                resDiv.style.color = 'var(--accent-rose)';
                resDiv.textContent = `❌ เกิดข้อผิดพลาด: ${data.error}`;
            }
        } catch (err) {
            clearTimeout(timeoutId);
            resDiv.style.color = 'var(--accent-rose)';
            if (err.name === 'AbortError') {
                resDiv.textContent = '❌ การเชื่อมต่อไปยังเซิร์ฟเวอร์หมดเวลา (Timeout) กรุณาลองใหม่อีกครั้ง';
            } else {
                resDiv.textContent = `❌ เชื่อมต่อล้มเหลว: ${err.message}`;
            }
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.textContent = '🧪 ทดสอบ Key';
            }
        }
    },

    saveGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        if (!input) return;
        const val = input.value.trim();
        this.state.geminiApiKey = val;
        if (val) {
            localStorage.setItem('tcas_gemini_key', val);
            this.showToast('บันทึก Gemini API Key เรียบร้อยแล้ว!', 'success');
        } else {
            localStorage.removeItem('tcas_gemini_key');
            localStorage.removeItem('tcas_gemini_model');
            this.showToast('ลบ API Key แล้ว (ระบบจะสลับไปใช้ TCAS Master AI Offline Mode)', 'info');
        }
        this.initAiKeyStatus();
        this.closeAiKeyModal();
    },

    removeGeminiKey() {
        const input = document.getElementById('input-gemini-key');
        if (input) input.value = '';
        this.saveGeminiKey();
    },

    // ------------------------------------------
    // SAVED QUESTIONS FOR AI MANAGEMENT
    // ------------------------------------------

    async fetchSavedAiQuestions() {
        try {
            const res = await fetch('/api/ai/saved-questions', {
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiSavedQuestions = data.data || [];
                this.updateAiSavedBadges();
                this.renderAiSavedList();
            }
        } catch (err) {
            console.error('Error fetching saved AI questions:', err);
        }
    },

    updateAiSavedBadges() {
        const count = (this.state.aiSavedQuestions || []).length;
        const topbarBadge = document.getElementById('topbar-ai-count');
        const sidebarBadge = document.getElementById('sidebar-ai-count');
        const modalBadge = document.getElementById('ai-hub-saved-badge');

        if (topbarBadge) topbarBadge.textContent = count;
        if (sidebarBadge) sidebarBadge.textContent = count;
        if (modalBadge) modalBadge.textContent = count;
    },

    renderAiSavedList() {
        const listEl = document.getElementById('ai-saved-list');
        if (!listEl) return;

        const filter = this.state.aiSavedFilter || 'all';
        let items = this.state.aiSavedQuestions || [];
        if (filter !== 'all') {
            items = items.filter(q => {
                if (filter === 'alevel') return q.subject_id.startsWith('alevel_') || q.subject_id.startsWith('tpat');
                return q.subject_id === filter;
            });
        }

        if (items.length === 0) {
            listEl.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.8rem;">
                    <div style="display:flex;justify-content:center;margin-bottom: 0.4rem; opacity: 0.7;">${this.svg('bookmark', {size: 28, color: 'var(--accent-indigo)'})}</div>
                    <p style="margin: 0;">ยังไม่มีข้อสอบที่บันทึกไว้</p>
                    <p style="margin-top: 0.25rem; font-size: 0.72rem; color: var(--text-secondary);">
                        กดปุ่ม <strong>"เก็บไว้ถาม AI"</strong> เหนือข้อสอบขณะทำ หรือกดคุยได้ทันที
                    </p>
                </div>
            `;
            return;
        }

        listEl.innerHTML = items.map(item => {
            const isActive = item.question_id === this.state.aiCurrentQuestionId;
            const snippet = (item.question_text || '').replace(/<[^>]*>/g, '').substring(0, 65) + '...';
            const subjectCode = item.subject_code ? `[${item.subject_code}] ` : '';
            return `
                <div class="ai-saved-item ${isActive ? 'active' : ''}" onclick="app.selectAiSavedQuestion('${item.question_id}')">
                    <div class="ai-saved-item-top">
                        <span class="ai-saved-badge-tag">${subjectCode}${this.escapeHtml(item.subject_name_th || 'ข้อสอบ')}</span>
                        <button class="btn-delete-saved-q" onclick="event.stopPropagation(); app.deleteSavedQuestion('${item.question_id}')" title="ลบออกจากคลัง">✕</button>
                    </div>
                    <div class="ai-saved-item-title">${this.escapeHtml(snippet)}</div>
                    <div class="ai-saved-item-footer">
                        <span>💬 ${item.chat_count || 0} ข้อความ</span>
                        <span>${this.escapeHtml(item.subtopic_name || item.domain_name || '')}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    filterSavedQuestions(filterCategory, btnEl) {
        this.state.aiSavedFilter = filterCategory;
        const chips = document.querySelectorAll('.ai-saved-filter-bar .ai-filter-chip');
        chips.forEach(c => c.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');
        this.renderAiSavedList();
    },

    async toggleSaveCurrentQuestionForAi() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        const qNum = this.state.currentQuestionIndex + 1;

        if (isAlreadySaved) {
            // Un-save
            try {
                const res = await fetch(`/api/ai/saved-questions/${q.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    }
                });
                const data = await res.json();
                if (data.success) {
                    this.state.aiSavedQuestions = this.state.aiSavedQuestions.filter(sq => sq.question_id !== q.id);
                    this.updateAiSavedBadges();
                    this.renderCurrentQuestion();
                    this.showToast(`นำข้อที่ ${qNum} ออกจากคลังถาม AI แล้ว`, 'info');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการยกเลิกบันทึก: ' + err.message, 'error');
            }
        } else {
            // Save
            const selectedOpt = this.state.userAnswers[q.id]?.selected_option_id;
            try {
                const res = await fetch('/api/ai/saved-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    },
                    body: JSON.stringify({
                        question_id: q.id,
                        session_id: session.id,
                        user_selected_option: selectedOpt || null
                    })
                });
                const data = await res.json();
                if (data.success) {
                    await this.fetchSavedAiQuestions();
                    this.renderCurrentQuestion();
                    this.showToast(`📌 บันทึกข้อที่ ${qNum} เข้าคลัง TCAS Master AI แล้ว`, 'success');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการบันทึก: ' + err.message, 'error');
            }
        }
    },

    async toggleSaveQuestionById(questionId, selectedOptionId) {
        if (!questionId) return;
        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === questionId);
        if (isAlreadySaved) {
            await this.deleteSavedQuestion(questionId);
        } else {
            try {
                const res = await fetch('/api/ai/saved-questions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                    },
                    body: JSON.stringify({
                        question_id: questionId,
                        session_id: this.state.activeSession?.id || null,
                        user_selected_option: selectedOptionId || null
                    })
                });
                const data = await res.json();
                if (data.success) {
                    await this.fetchSavedAiQuestions();
                    this.showToast('📌 บันทึกข้อสอบเข้าคลัง TCAS Master AI แล้ว', 'success');
                }
            } catch (err) {
                this.showToast('เกิดข้อผิดพลาดในการบันทึก: ' + err.message, 'error');
            }
        }
    },

    async deleteSavedQuestion(questionId) {
        try {
            const res = await fetch(`/api/ai/saved-questions/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiSavedQuestions = this.state.aiSavedQuestions.filter(sq => sq.question_id !== questionId);
                this.updateAiSavedBadges();
                this.renderAiSavedList();
                this.showToast('ลบข้อสอบออกจากรายการเรียบร้อย', 'info');
                if (this.state.currentView === 'exam') {
                    this.renderCurrentQuestion();
                }
            }
        } catch (err) {
            this.showToast('เกิดข้อผิดพลาดในการลบ: ' + err.message, 'error');
        }
    },

    // ------------------------------------------
    // OPENING & CONTROLLING AI CHAT HUB
    // ------------------------------------------

    async openAiChatHub() {
        if (!this.state.geminiApiKey && !sessionStorage.getItem('tcas_dismiss_key_hint')) {
            this.openAiKeyRecommendModal(() => this.openAiChatHub());
            return;
        }

        const modal = document.getElementById('ai-tutor-modal');
        if (!modal) return;

        await this.fetchSavedAiQuestions();

        // If user is currently in exam, select active question
        if (this.state.currentView === 'exam' && this.state.activeSession?.questions) {
            const q = this.state.activeSession.questions[this.state.currentQuestionIndex];
            if (q) {
                this.openAiTutor(q.id, this.state.userAnswers[q.id]?.selected_option_id, true);
                return;
            }
        }

        // If there are saved questions, load the first one
        if (this.state.aiSavedQuestions.length > 0) {
            this.selectAiSavedQuestion(this.state.aiSavedQuestions[0].question_id, true);
            return;
        }

        // Otherwise open with general question prompt
        this.openAiTutor(null, null, true);
    },

    openAiChatForCurrentQuestion() {
        const session = this.state.activeSession;
        if (!session || !session.questions) return;
        const q = session.questions[this.state.currentQuestionIndex];
        if (!q) return;

        // Auto bookmark if not yet saved
        const isAlreadySaved = (this.state.aiSavedQuestions || []).some(sq => sq.question_id === q.id);
        if (!isAlreadySaved) {
            this.toggleSaveCurrentQuestionForAi();
        }

        const selectedOpt = this.state.userAnswers[q.id]?.selected_option_id;
        this.openAiTutor(q.id, selectedOpt);
    },

    selectAiSavedQuestion(questionId, bypassHint = false) {
        const saved = (this.state.aiSavedQuestions || []).find(q => q.question_id === questionId);
        const selectedOpt = saved ? saved.user_selected_option : null;
        this.openAiTutor(questionId, selectedOpt, bypassHint);
    },

    toggleAiSavedPanel() {
        const sidebar = document.getElementById('ai-hub-sidebar');
        if (sidebar) sidebar.classList.toggle('collapsed');
    },

    toggleAiContextCollapse() {
        const details = document.getElementById('ai-context-details');
        const chevron = document.getElementById('ai-context-chevron');
        if (!details) return;
        const isOpen = details.style.display !== 'none';
        details.style.display = isOpen ? 'none' : 'block';
        if (chevron) chevron.classList.toggle('open', !isOpen);
    },

    async openAiTutor(questionId, selectedOptionId, bypassHint = false) {
        if (!bypassHint && !this.state.geminiApiKey && !sessionStorage.getItem('tcas_dismiss_key_hint')) {
            this.openAiKeyRecommendModal(() => this.openAiTutor(questionId, selectedOptionId, true));
            return;
        }
        this.state.aiCurrentQuestionId = questionId;
        this.state.aiCurrentSelectedOptionId = selectedOptionId || null;
        this.state.aiChatHistory = [];

        const modal = document.getElementById('ai-tutor-modal');
        const thread = document.getElementById('ai-chat-thread');
        const contextEl = document.getElementById('ai-tutor-q-context');
        const input = document.getElementById('ai-tutor-input');

        if (!modal || !thread) return;

        this.initAiKeyStatus();
        this.renderAiSavedList();

        if (input) input.value = '';

        if (!questionId) {
            // General Hub without selected question
            if (contextEl) contextEl.textContent = 'เลือกข้อสอบจากแถบด้านซ้าย หรือพิมพ์คำถามทางวิชาการได้เลย';
            const contextBox = document.getElementById('ai-question-context-box');
            if (contextBox) contextBox.style.display = 'none';

            thread.innerHTML = `
                <div class="ai-msg tutor">
                    <div class="ai-msg-bubble">
                        <p style="margin: 0; font-weight: 500;">
                            👋 สวัสดีครับ! ผม <strong>TCAS Master AI</strong> พร้อมเป็นคู่คิดวิเคราะห์ข้อสอบและติวเข้มเนื้อหาตาม Test Blueprint ของ ทปอ. ร่วมกับคุณครับ
                        </p>
                        <p style="margin-top: 0.5rem; margin-bottom: 0; font-size: 0.85rem; color: var(--text-secondary);">
                            คุณสามารถเลือกข้อสอบที่บันทึกไว้จากแถบด้านซ้าย หรือพิมพ์หัวข้อที่ต้องการปรึกษาได้ทันทีครับ!
                        </p>
                    </div>
                </div>
            `;
            modal.classList.add('open');
            return;
        }

        // Fetch question context and existing chat history from server
        try {
            const contextBox = document.getElementById('ai-question-context-box');
            if (contextBox) contextBox.style.display = 'block';

            const res = await fetch(`/api/ai/chat/${questionId}`, {
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();

            if (data.success && data.question) {
                const q = data.question;
                this.state.aiCurrentQuestionData = q;

                // Update context header
                if (contextEl) {
                    contextEl.textContent = `${q.subject_name_th} • ${q.subtopic_name || q.domain_name} (Set ${q.set_number || 1})`;
                }
                const badge = document.getElementById('ai-context-subject-badge');
                if (badge) badge.textContent = q.subject_code ? `[${q.subject_code}] ${q.subject_name_th}` : q.subject_name_th;

                const snippetEl = document.getElementById('ai-context-snippet');
                if (snippetEl) {
                    snippetEl.textContent = (q.question_text || '').replace(/<[^>]*>/g, '').substring(0, 90) + '...';
                }

                const fullTextEl = document.getElementById('ai-context-full-text');
                if (fullTextEl) {
                    fullTextEl.innerHTML = `
                        ${q.stimulus ? `<div style="background: rgba(0,0,0,0.25); padding: 0.6rem; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">${this.escapeHtml(q.stimulus)}</div>` : ''}
                        <strong>คำถาม:</strong> ${this.escapeHtml(q.question_text)}
                    `;
                }

                const optsEl = document.getElementById('ai-context-options');
                if (optsEl && q.options) {
                    optsEl.innerHTML = q.options.map(o => {
                        const isPicked = (this.state.aiCurrentSelectedOptionId && o.id === this.state.aiCurrentSelectedOptionId) || (q.user_selected_option && o.label === q.user_selected_option);
                        return `
                            <div class="ai-context-opt-item ${o.is_correct ? 'correct' : ''} ${isPicked ? 'user-picked' : ''}">
                                <strong>[${o.label}]</strong> ${this.escapeHtml(o.content)}
                                ${o.is_correct ? ' <span style="color: #34d399; font-size: 0.72rem;">(คำตอบที่ถูกต้อง)</span>' : ''}
                                ${isPicked ? ' <span style="color: var(--accent-amber); font-size: 0.72rem;">(ตัวเลือกที่คุณตอบ)</span>' : ''}
                            </div>
                        `;
                    }).join('');
                }

                // Render chat history
                thread.innerHTML = '';

                // If messages exist, render them
                if (data.messages && data.messages.length > 0) {
                    for (const m of data.messages) {
                        this.state.aiChatHistory.push({ role: m.role === 'user' ? 'user' : 'model', content: m.content });
                        const bubble = document.createElement('div');
                        bubble.className = `ai-msg ${m.role === 'user' ? 'user' : 'tutor'}`;
                        const formatted = m.role === 'user' ? `<p style="margin:0;">${this.escapeHtml(m.content)}</p>` : this.formatMarkdown(m.content);
                        bubble.innerHTML = `<div class="ai-msg-bubble">${formatted}</div>`;
                        thread.appendChild(bubble);
                    }
                } else {
                    // Initial welcome greeting
                    thread.innerHTML = `
                        <div class="ai-msg tutor">
                            <div class="ai-msg-bubble">
                                <p style="margin: 0; font-weight: 500;">
                                    👋 สวัสดีครับ! สำหรับข้อนี้ในวิชา <strong>${this.escapeHtml(q.subject_name_th)}</strong> (${this.escapeHtml(q.subtopic_name || q.domain_name)}) ผมได้อ่านโจทย์ ตัวเลือก และเฉลยเรียบร้อยแล้วครับ
                                </p>
                                <p style="margin-top: 0.5rem; margin-bottom: 0; font-size: 0.85rem; color: var(--text-secondary);">
                                    คุณสงสัยจุดไหนเป็นพิเศษ หรือต้องการให้อธิบายวิธีคิดข้อนี้ทีละขั้นตอน กดเลือกคำถามด่วนด้านบนหรือพิมพ์ถามผมได้ทันทีเลยครับ!
                                </p>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (err) {
            console.error('Error loading question context:', err);
        }

        modal.classList.add('open');
        this.renderMath();
    },

    closeAiTutorModal() {
        const modal = document.getElementById('ai-tutor-modal');
        if (modal) modal.classList.remove('open');
    },

    async clearCurrentAiChatHistory() {
        const qId = this.state.aiCurrentQuestionId;
        if (!qId) return;

        if (!confirm('คุณต้องการล้างประวัติการสนทนาของข้อนี้ใช่หรือไม่?')) return;

        try {
            const res = await fetch(`/api/ai/chat/${qId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : ''
                }
            });
            const data = await res.json();
            if (data.success) {
                this.state.aiChatHistory = [];
                const thread = document.getElementById('ai-chat-thread');
                if (thread) {
                    thread.innerHTML = `
                        <div class="ai-msg tutor">
                            <div class="ai-msg-bubble">
                                <p style="margin: 0;">🧹 ล้างประวัติการสนทนาเรียบร้อยแล้วครับ เรามาเริ่มวิเคราะห์ข้อนี้กันใหม่ได้เลยครับ!</p>
                            </div>
                        </div>
                    `;
                }
                this.fetchSavedAiQuestions();
                this.showToast('ล้างประวัติแชทเรียบร้อยแล้ว', 'info');
            }
        } catch (err) {
            this.showToast('ไม่สามารถล้างประวัติได้: ' + err.message, 'error');
        }
    },

    sendAiQuickPrompt(promptType) {
        let query = '';
        if (promptType === 'why_wrong') query = 'ช่วยวิเคราะห์จุดหลอกหน่อยครับ ว่าทำไมตัวเลือกที่ผิดถึงผิด และผู้ออกข้อสอบมีเจตนาลวงตรงไหน';
        else if (promptType === 'speed_hack') query = 'ขอคำอธิบายวิธีคิดข้อนี้ทีละขั้นตอนแบบชัดเจน เข้าใจง่ายครับ';
        else if (promptType === 'key_formula') query = 'ข้อนี้มีสูตร กฎเกณฑ์ หรือคีย์เวิร์ดสำคัญอะไรที่ต้องจำตาม Blueprint บ้างครับ';
        else if (promptType === 'drill_more') query = 'ช่วยสร้างโจทย์แนวคิดเดียวกันมาให้ผมลองฝึกทำอีก 1 ข้อ พร้อมเฉลยและวิธีคิดด้วยครับ';

        if (query) {
            this.sendAiTutorQuery(query);
        }
    },

    handleAiInputSubmit() {
        const input = document.getElementById('ai-tutor-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.sendAiTutorQuery(text);
    },

    async sendAiTutorQuery(query) {
        const thread = document.getElementById('ai-chat-thread');
        const questionId = this.state.aiCurrentQuestionId;
        if (!thread) return;

        // 1. Append User Message
        const userBubble = document.createElement('div');
        userBubble.className = 'ai-msg user';
        userBubble.innerHTML = `<div class="ai-msg-bubble"><p style="margin:0;">${this.escapeHtml(query)}</p></div>`;
        thread.appendChild(userBubble);

        // 2. Append Typing Indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-msg tutor';
        typingEl.id = 'ai-typing-loader';
        typingEl.innerHTML = `
            <div class="ai-msg-bubble">
                <div class="ai-typing-indicator">
                    <span></span><span></span><span></span>
                </div>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.5rem;">TCAS Master AI กำลังวิเคราะห์และเรียบเรียงคำตอบ...</span>
            </div>
        `;
        thread.appendChild(typingEl);
        thread.scrollTop = thread.scrollHeight;

        // Track in history
        this.state.aiChatHistory.push({ role: 'user', content: query });

        try {
            const res = await fetch('/api/ai/tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.authToken ? `Bearer ${this.state.authToken}` : '',
                    'x-gemini-key': this.state.geminiApiKey || ''
                },
                body: JSON.stringify({
                    question_id: questionId,
                    user_query: query,
                    selected_option_id: this.state.aiCurrentSelectedOptionId,
                    chat_history: this.state.aiChatHistory,
                    custom_key: this.state.geminiApiKey || '',
                    preferred_model: localStorage.getItem('tcas_gemini_model') || ''
                })
            });

            const data = await res.json();
            const loader = document.getElementById('ai-typing-loader');
            if (loader) loader.remove();

            if (data.success && data.ai_response) {
                this.state.aiChatHistory.push({ role: 'model', content: data.ai_response });

                const replyBubble = document.createElement('div');
                replyBubble.className = 'ai-msg tutor';

                const formattedHtml = this.formatMarkdown(data.ai_response);
                replyBubble.innerHTML = `
                    <div class="ai-msg-bubble">
                        ${formattedHtml}
                        ${data.hint ? `<div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--accent-cyan); opacity: 0.85;">💡 ${data.hint}</div>` : ''}
                    </div>
                `;
                thread.appendChild(replyBubble);

                // Update chat count badge in sidebar list
                this.fetchSavedAiQuestions();
            } else {
                const errBubble = document.createElement('div');
                errBubble.className = 'ai-msg tutor';
                errBubble.innerHTML = `
                    <div class="ai-msg-bubble" style="border-color: rgba(244, 63, 94, 0.4);">
                        <p style="color: var(--accent-rose); margin: 0;">⚠️ ขออภัยครับ: ${data.error || 'ไม่สามารถติดต่อ TCAS Master AI ได้ในขณะนี้'}</p>
                    </div>
                `;
                thread.appendChild(errBubble);
            }
        } catch (err) {
            const loader = document.getElementById('ai-typing-loader');
            if (loader) loader.remove();

            const errBubble = document.createElement('div');
            errBubble.className = 'ai-msg tutor';
            errBubble.innerHTML = `
                <div class="ai-msg-bubble" style="border-color: rgba(244, 63, 94, 0.4);">
                    <p style="color: var(--accent-rose); margin: 0;">❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้: ${err.message}</p>
                </div>
            `;
            thread.appendChild(errBubble);
        }

        thread.scrollTop = thread.scrollHeight;
        this.renderMath();
    },

    // ==========================================
    // CEFR VOCABULARY QUIZ CONTROLLER (A1 - C2)
    // ==========================================

    async loadCefrOverview() {
        try {
            const res = await fetch('/api/cefr/levels');
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.cefrLevels = data.data;

            // Compute summary numbers
            let totalWords = 0;
            let totalMastered = 0;
            let totalQuizzes = 0;

            this.state.cefrLevels.forEach(lvl => {
                totalWords += lvl.total_words || 0;
                totalMastered += lvl.mastered_words || 0;
                totalQuizzes += lvl.quizzes_taken || 0;
            });

            const totalWordsEl = document.getElementById('cefr-total-words-val');
            const masteredWordsEl = document.getElementById('cefr-mastered-words-val');
            const quizzesTakenEl = document.getElementById('cefr-quizzes-taken-val');

            if (totalWordsEl) totalWordsEl.textContent = totalWords;
            if (masteredWordsEl) masteredWordsEl.textContent = totalMastered;
            if (quizzesTakenEl) quizzesTakenEl.textContent = totalQuizzes;

            this.renderCefrLevelCards();
        } catch (err) {
            console.error('Error loading CEFR overview:', err);
            this.showToast('ไม่สามารถโหลดข้อมูล CEFR ได้: ' + err.message, 'error');
        }
    },

    renderCefrLevelCards() {
        const container = document.getElementById('cefr-levels-container');
        if (!container) return;

        const levelMetadata = {
            A1: {
                title: 'Beginner',
                examTarget: 'ปูพื้นฐานการสื่อสาร',
                desc: 'คำศัพท์พื้นฐานสำหรับเริ่มต้น เหมาะสำหรับปูพื้นฐานภาษาอังกฤษให้แน่นตั้งแต่ก้าวแรก',
                accentClass: 'lvl-a1'
            },
            A2: {
                title: 'Elementary',
                examTarget: 'ศัพท์ชีวิตประจำวัน',
                desc: 'คำศัพท์ทั่วไปในชีวิตประจำวัน สิ่งแวดล้อม และบริบทการสนทนาเบื้องต้น',
                accentClass: 'lvl-a2'
            },
            B1: {
                title: 'Intermediate',
                examTarget: '⭐ พื้นฐาน TGAT1',
                desc: 'คำศัพท์ระดับกลางที่พบบ่อยในข้อสอบ TGAT1 พาร์ท Speaking & Reading สื่อสารคล่องแคล่ว',
                accentClass: 'lvl-b1'
            },
            B2: {
                title: 'Upper Intermediate',
                examTarget: '🏆 แกนหลัก TGAT1 / TCAS',
                desc: 'คำศัพท์ที่ชี้ขาดผลคะแนน TGAT1 และข้อสอบมหาวิทยาลัย เช่น การทำงาน, ประกาศ, บทความวิเคราะห์',
                accentClass: 'lvl-b2'
            },
            C1: {
                title: 'Advanced',
                examTarget: '🥇 แกนหลัก A-Level อังกฤษ',
                desc: 'คำศัพท์วิชาการขั้นสูง (Academic Vocabulary) สำหรับบทความวิทยาศาสตร์ ปรัชญา และงานวิจัย',
                accentClass: 'lvl-c1'
            },
            C2: {
                title: 'Proficiency',
                examTarget: '👑 ระดับสูง / สายแพทย์ / อินเตอร์',
                desc: 'คำศัพท์ชั้นครูระดับเชี่ยวชาญ วรรณกรรม คลังศัพท์ชั้นเลิศสำหรับผู้ต้องการพิชิต 90+ คะแนน',
                accentClass: 'lvl-c2'
            }
        };

        let html = '';
        this.state.cefrLevels.forEach(lvl => {
            const meta = levelMetadata[lvl.level] || {
                title: lvl.title,
                examTarget: 'ทั่วไป',
                desc: 'ทดสอบคำศัพท์ในระดับ ' + lvl.level,
                accentClass: 'lvl-b1'
            };

            const progress = lvl.progress_percentage || 0;

            html += `
                <div class="cefr-level-card ${meta.accentClass}">
                    <div>
                        <div class="cefr-card-top">
                            <span class="cefr-level-badge-large">${lvl.level}</span>
                            <span class="cefr-exam-badge">${meta.examTarget}</span>
                        </div>
                        <h4 class="cefr-card-title">${lvl.level} - ${meta.title}</h4>
                        <p class="cefr-card-desc">${meta.desc}</p>

                        <div class="cefr-progress-row">
                            <div class="cefr-progress-labels">
                                <span>จดจำแม่นยำ (${lvl.mastered_words}/${lvl.total_words} คำ)</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="cefr-level-progress-track">
                                <div class="cefr-level-progress-bar" style="width: ${progress}%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="cefr-card-actions">
                        <button class="btn btn-primary" onclick="app.openCefrQuizConfig('${lvl.level}')">
                            ⚡ ทำควิซ (${lvl.level})
                        </button>
                        <button class="btn btn-outline" onclick="app.openCefrWordList('${lvl.level}')">
                            📖 ดูคำศัพท์
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    openCefrQuizConfig(level) {
        this.state.cefrConfigLevel = level;
        const modal = document.getElementById('modal-cefr-config');
        const titleEl = document.getElementById('cefr-cfg-title');
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        const slider = document.getElementById('cefr-word-slider');

        if (titleEl) {
            titleEl.textContent = `ตั้งค่าควิซคำศัพท์ ${level === 'MIXED' ? 'Mixed Challenge' : 'Level ' + level}`;
        }
        const count = this.state.cefrWordCount || 10;
        if (countBadge) countBadge.textContent = `${count} คำ`;
        if (btnCount) btnCount.textContent = count;
        if (slider) slider.value = count;

        if (modal) modal.classList.add('open');
    },

    closeCefrConfigModal() {
        const modal = document.getElementById('modal-cefr-config');
        if (modal) modal.classList.remove('open');
    },

    setCefrWordCount(count, btn) {
        this.state.cefrWordCount = parseInt(count, 10);
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        const slider = document.getElementById('cefr-word-slider');
        if (countBadge) countBadge.textContent = `${this.state.cefrWordCount} คำ`;
        if (btnCount) btnCount.textContent = this.state.cefrWordCount;
        if (slider) slider.value = this.state.cefrWordCount;

        document.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        this.updateCefrRoundEstimate();
    },

    onCefrSliderChange(val) {
        this.state.cefrWordCount = parseInt(val, 10);
        const countBadge = document.getElementById('cefr-count-badge');
        const btnCount = document.getElementById('cefr-btn-word-count');
        if (countBadge) countBadge.textContent = `${this.state.cefrWordCount} คำ`;
        if (btnCount) btnCount.textContent = this.state.cefrWordCount;

        document.querySelectorAll('.preset-chip').forEach(b => {
            const num = parseInt(b.textContent, 10);
            if (num === this.state.cefrWordCount) b.classList.add('active');
            else b.classList.remove('active');
        });

        this.updateCefrRoundEstimate();
    },

    setCefrTimerMode(mode) {
        this.state.cefrTimerMode = mode;
        document.querySelectorAll('.timer-radio-card').forEach(c => c.classList.remove('active'));
        const target = document.getElementById(`timer-card-${mode}`);
        if (target) target.classList.add('active');
        this.updateCefrRoundEstimate();
    },

    updateCefrRoundEstimate() {
        const count = this.state.cefrWordCount || 10;
        const totalMinutes = Math.max(1, Math.round((count * 15) / 60));
        const descEl = document.getElementById('cefr-round-time-desc');
        if (descEl) descEl.textContent = `${totalMinutes} นาที`;
        this.state.cefrRoundTimeLimitSeconds = totalMinutes * 60;
    },

    async launchConfiguredCefrQuiz() {
        this.closeCefrConfigModal();
        const level = this.state.cefrConfigLevel || 'B2';
        const count = this.state.cefrWordCount || 10;
        const timerMode = this.state.cefrTimerMode || 'per_15';
        await this.startCefrQuiz(level, 'meaning', count, timerMode);
    },

    async startCefrQuiz(level, mode = 'meaning', count = 10, timerMode = 'per_15') {
        try {
            this.state.currentCefrLevel = level;
            this.state.cefrWordCount = count;
            this.state.cefrTimerMode = timerMode;
            this.showToast(`กำลังเตรียมควิซระดับ ${level} (${count} คำ)...`, 'info');

            const res = await fetch('/api/cefr/quiz/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ level, count, mode, timer_type: timerMode })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            this.state.activeCefrQuiz = data.data;
            this.state.cefrCurrentQuestionIndex = 0;
            this.state.cefrQuizAnswers = [];
            this.state.cefrQuizAnswered = false;
            this.state.cefrTotalTimeElapsed = 0;

            // Initialize total round time if in round_total mode
            if (timerMode === 'round_total') {
                this.state.cefrTimeLeftSeconds = this.state.cefrRoundTimeLimitSeconds || Math.max(60, count * 15);
            }

            // Switch screen
            document.getElementById('cefr-screen-overview').style.display = 'none';
            document.getElementById('cefr-screen-results').style.display = 'none';
            document.getElementById('cefr-screen-quiz').style.display = 'block';

            // Level indicator
            const pillEl = document.getElementById('cefr-quiz-level-pill');
            if (pillEl) {
                pillEl.textContent = level === 'MIXED' ? `Mixed (${count} คำ)` : `Level ${level} (${count} คำ)`;
            }

            this.renderCefrQuestion();
        } catch (err) {
            console.error('Error starting CEFR quiz:', err);
            this.showToast('ไม่สามารถเริ่มควิซได้: ' + err.message, 'error');
        }
    },

    renderCefrQuestion() {
        if (!this.state.activeCefrQuiz) return;
        const qList = this.state.activeCefrQuiz.questions;
        const currIndex = this.state.cefrCurrentQuestionIndex;
        if (currIndex >= qList.length) {
            this.finishCefrQuiz();
            return;
        }

        const q = qList[currIndex];
        this.state.cefrQuizAnswered = false;
        this.state.cefrQuizStartTime = Date.now();

        // Counter & Progress
        const counterEl = document.getElementById('cefr-quiz-counter');
        const progressBar = document.getElementById('cefr-progress-bar');
        if (counterEl) counterEl.textContent = `คำที่ ${currIndex + 1} / ${qList.length}`;
        if (progressBar) progressBar.style.width = `${((currIndex + 1) / qList.length) * 100}%`;

        // Word card
        const wordEl = document.getElementById('cefr-active-word');
        const phoneticEl = document.getElementById('cefr-active-phonetic');
        const posEl = document.getElementById('cefr-active-pos');
        const exampleEl = document.getElementById('cefr-active-example');
        const starBtn = document.getElementById('cefr-star-btn');

        if (wordEl) wordEl.textContent = q.word;
        if (phoneticEl) phoneticEl.textContent = q.phonetic || '';
        if (posEl) posEl.textContent = q.part_of_speech || '';
        if (exampleEl) exampleEl.textContent = q.example_sentence ? `"${q.example_sentence}"` : 'ตัวอย่างประโยคบริบทการใช้งาน';

        if (starBtn) {
            starBtn.classList.remove('starred');
            starBtn.setAttribute('data-word-id', q.word_id);
        }

        // Options
        const container = document.getElementById('cefr-options-container');
        if (container) {
            container.innerHTML = q.options.map((opt, idx) => `
                <button class="cefr-option-btn" id="cefr-opt-${idx}" onclick="app.selectCefrOption(${idx})">
                    <span class="cefr-opt-key">${idx + 1}</span>
                    <span class="cefr-opt-text">${this.escapeHtml(opt.content)}</span>
                </button>
            `).join('');
        }

        // Hide feedback banner
        const fbBanner = document.getElementById('cefr-feedback-banner');
        if (fbBanner) fbBanner.style.display = 'none';

        // Start 15s Timer
        this.startCefrTimer();
    },

    startCefrTimer() {
        if (this.state.cefrTimerInterval) clearInterval(this.state.cefrTimerInterval);
        const timerBox = document.getElementById('cefr-timer-box');
        const timerText = document.getElementById('cefr-timer-text');
        if (timerBox) timerBox.classList.remove('timer-urgent');

        const mode = this.state.cefrTimerMode || 'per_15';

        if (mode === 'zen') {
            if (timerText) timerText.textContent = 'Zen';
            this.state.cefrTimerInterval = setInterval(() => {
                this.state.cefrTotalTimeElapsed++;
                const m = Math.floor(this.state.cefrTotalTimeElapsed / 60);
                const s = this.state.cefrTotalTimeElapsed % 60;
                if (timerText) timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
            }, 1000);
            return;
        }

        if (mode === 'round_total') {
            const updateDisplay = () => {
                const m = Math.floor(this.state.cefrTimeLeftSeconds / 60);
                const s = this.state.cefrTimeLeftSeconds % 60;
                if (timerText) timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
            };
            updateDisplay();

            this.state.cefrTimerInterval = setInterval(() => {
                this.state.cefrTimeLeftSeconds--;
                this.state.cefrTotalTimeElapsed++;
                updateDisplay();

                if (this.state.cefrTimeLeftSeconds <= 30 && timerBox) {
                    timerBox.classList.add('timer-urgent');
                }

                if (this.state.cefrTimeLeftSeconds <= 0) {
                    clearInterval(this.state.cefrTimerInterval);
                    this.showToast('หมดเวลารวมของควิซแล้ว! สรุปคะแนนทันที', 'warning');
                    this.finishCefrQuiz();
                }
            }, 1000);
            return;
        }

        // Per question modes (per_15 or per_30)
        const secondsPerQ = mode === 'per_30' ? 30 : 15;
        this.state.cefrTimeLeftSeconds = secondsPerQ;
        if (timerText) timerText.textContent = `${secondsPerQ}s`;

        this.state.cefrTimerInterval = setInterval(() => {
            this.state.cefrTimeLeftSeconds--;
            this.state.cefrTotalTimeElapsed++;
            if (timerText) timerText.textContent = `${this.state.cefrTimeLeftSeconds}s`;

            if (this.state.cefrTimeLeftSeconds <= 5 && timerBox) {
                timerBox.classList.add('timer-urgent');
            }

            if (this.state.cefrTimeLeftSeconds <= 0) {
                clearInterval(this.state.cefrTimerInterval);
                this.handleCefrTimeout();
            }
        }, 1000);
    },

    selectCefrOption(optIndex) {
        if (this.state.cefrQuizAnswered) return;
        this.state.cefrQuizAnswered = true;
        clearInterval(this.state.cefrTimerInterval);

        const q = this.state.activeCefrQuiz.questions[this.state.cefrCurrentQuestionIndex];
        const selectedOpt = q.options[optIndex];
        const isCorrect = selectedOpt && selectedOpt.is_correct === 1;
        const timeSpent = Math.max(1, Math.round((Date.now() - this.state.cefrQuizStartTime) / 1000));

        // Record Answer
        this.state.cefrQuizAnswers.push({
            word_id: q.word_id,
            word: q.word,
            part_of_speech: q.part_of_speech,
            selected_meaning: selectedOpt ? selectedOpt.content : 'ไม่ได้ตอบ',
            correct_meaning: q.correct_meaning_th,
            is_correct: isCorrect ? 1 : 0,
            time_spent_seconds: timeSpent
        });

        // Highlight Buttons
        q.options.forEach((opt, idx) => {
            const btn = document.getElementById(`cefr-opt-${idx}`);
            if (!btn) return;
            btn.disabled = true;
            if (opt.is_correct === 1) {
                btn.classList.add('opt-correct');
            } else if (idx === optIndex && !isCorrect) {
                btn.classList.add('opt-wrong');
            }
        });

        // Show Feedback
        const fbBanner = document.getElementById('cefr-feedback-banner');
        const fbIcon = document.getElementById('cefr-feedback-icon');
        const fbTitle = document.getElementById('cefr-feedback-title');
        const fbDesc = document.getElementById('cefr-feedback-desc');

        if (fbBanner) {
            fbBanner.style.display = 'flex';
            if (isCorrect) {
                this.playSfx('correct');
                this.showFloatingExp('+20 EXP', window.innerWidth / 2, window.innerHeight * 0.45);
                fbIcon.innerHTML = this.svg('check-circle', { size: 40, color: '#34d399' });
                fbTitle.textContent = 'ถูกต้อง แม่นยำมาก!';
                fbTitle.style.color = '#34d399';
                fbDesc.textContent = `ความหมาย: ${q.correct_meaning_th}`;
            } else {
                this.playSfx('wrong');
                fbIcon.innerHTML = this.svg('lightbulb', { size: 40, color: '#fb7185' });
                fbTitle.textContent = 'ยังไม่ถูกต้อง!';
                fbTitle.style.color = '#fb7185';
                fbDesc.textContent = `คำตอบที่ถูกต้องคือ: ${q.correct_meaning_th}`;
            }
        }
    },

    handleCefrTimeout() {
        if (this.state.cefrQuizAnswered) return;
        this.state.cefrQuizAnswered = true;

        const q = this.state.activeCefrQuiz.questions[this.state.cefrCurrentQuestionIndex];
        this.state.cefrQuizAnswers.push({
            word_id: q.word_id,
            word: q.word,
            part_of_speech: q.part_of_speech,
            selected_meaning: 'หมดเวลา (ไม่ได้ตอบ)',
            correct_meaning: q.correct_meaning_th,
            is_correct: 0,
            time_spent_seconds: 15
        });

        // Reveal correct answer
        q.options.forEach((opt, idx) => {
            const btn = document.getElementById(`cefr-opt-${idx}`);
            if (btn) {
                btn.disabled = true;
                if (opt.is_correct === 1) btn.classList.add('opt-correct');
            }
        });

        const fbBanner = document.getElementById('cefr-feedback-banner');
        const fbIcon = document.getElementById('cefr-feedback-icon');
        const fbTitle = document.getElementById('cefr-feedback-title');
        const fbDesc = document.getElementById('cefr-feedback-desc');

        if (fbBanner) {
            fbBanner.style.display = 'flex';
            fbIcon.textContent = '⏱️';
            fbTitle.textContent = 'หมดเวลา!';
            fbTitle.style.color = '#f59e0b';
            fbDesc.textContent = `คำแปลที่ถูกต้องคือ: ${q.correct_meaning_th}`;
        }
    },

    nextCefrQuestion() {
        clearInterval(this.state.cefrTimerInterval);
        this.state.cefrCurrentQuestionIndex++;
        this.renderCefrQuestion();
    },

    exitCefrQuiz() {
        clearInterval(this.state.cefrTimerInterval);
        this.showCefrOverview();
    },

    async finishCefrQuiz() {
        clearInterval(this.state.cefrTimerInterval);
        this.showToast('กำลังประมวลผลคะแนนและ EXP...', 'info');

        try {
            const res = await fetch('/api/cefr/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quiz_id: this.state.activeCefrQuiz.quiz_id,
                    level: this.state.currentCefrLevel,
                    mode: this.state.activeCefrQuiz.mode,
                    answers: this.state.cefrQuizAnswers,
                    time_spent_seconds: this.state.cefrQuizAnswers.reduce((sum, a) => sum + a.time_spent_seconds, 0)
                })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            // Update user status and EXP
            await this.loadUserStatus(true);

            // Display Results
            document.getElementById('cefr-screen-quiz').style.display = 'none';
            document.getElementById('cefr-screen-results').style.display = 'block';

            const r = data.data;
            const trophyEl = document.getElementById('cefr-result-trophy');
            const headingEl = document.getElementById('cefr-result-heading');
            const subtitleEl = document.getElementById('cefr-result-subtitle');
            const scoreEl = document.getElementById('cefr-result-score');
            const pctEl = document.getElementById('cefr-result-pct');
            const expEl = document.getElementById('cefr-result-exp');

            if (scoreEl) scoreEl.textContent = `${r.correct_count} / ${r.total_questions}`;
            if (pctEl) pctEl.textContent = `${r.score_percentage}%`;
            if (expEl) expEl.textContent = `+${r.exp_earned} EXP`;

            if (r.score_percentage >= 80) {
                this.playSfx('level_up');
                this.launchConfetti();
                if (trophyEl) trophyEl.innerHTML = this.svg('award', { size: 48, color: '#fbbf24' });
                if (headingEl) headingEl.textContent = 'ยอดเยี่ยม ไร้ที่ติ!';
                if (subtitleEl) subtitleEl.textContent = `คุณเชี่ยวชาญคำศัพท์ระดับ ${r.level} พร้อมพิชิตข้อสอบจริงแล้ว`;
            } else if (r.score_percentage >= 50) {
                this.playSfx('correct');
                this.launchConfetti();
                if (trophyEl) trophyEl.innerHTML = this.svg('star', { size: 48, color: '#fbbf24' });
                if (headingEl) headingEl.textContent = 'ทำได้ดี มีพัฒนาการ!';
                if (subtitleEl) subtitleEl.textContent = `คะแนนผ่านเกณฑ์ ทบทวนคำที่ตอบผิดอีกนิดจะจำได้แม่นยำขึ้นครับ`;
            } else {
                this.playSfx('wrong');
                if (trophyEl) trophyEl.innerHTML = this.svg('book', { size: 48, color: '#94a3b8' });
                if (headingEl) headingEl.textContent = 'พยายามต่อไป!';
                if (subtitleEl) subtitleEl.textContent = `แนะนำให้กด ⭐ ปักหมุดคำที่ตอบผิดเพื่อกลับมาทบทวนซ้ำครับ`;
            }

            // Render breakdown
            const listContainer = document.getElementById('cefr-breakdown-list');
            if (listContainer) {
                listContainer.innerHTML = this.state.cefrQuizAnswers.map(a => `
                    <div class="cefr-breakdown-item">
                        <div class="cefr-breakdown-left">
                            <span class="cefr-item-status">${a.is_correct ? this.svg('check-circle', { size: 16, color: '#34d399' }) : this.svg('x', { size: 16, color: '#f43f5e' })}</span>
                            <div>
                                <span class="cefr-item-word">${this.escapeHtml(a.word)}</span>
                                <span class="cefr-item-pos">(${a.part_of_speech})</span>
                            </div>
                        </div>
                        <div class="cefr-item-def">
                            ${this.escapeHtml(a.correct_meaning)}
                        </div>
                    </div>
                `).join('');
            }

        } catch (err) {
            console.error('Error submitting CEFR quiz:', err);
            this.showToast('ไม่สามารถบันทึกผลได้: ' + err.message, 'error');
        }
    },

    showCefrOverview() {
        document.getElementById('cefr-screen-quiz').style.display = 'none';
        document.getElementById('cefr-screen-results').style.display = 'none';
        document.getElementById('cefr-screen-overview').style.display = 'block';
        this.loadCefrOverview();
    },

    retryCefrQuiz() {
        this.startCefrQuiz(this.state.currentCefrLevel, 'meaning');
    },

    async toggleCurrentWordStar() {
        const starBtn = document.getElementById('cefr-star-btn');
        if (!starBtn) return;
        const wordId = starBtn.getAttribute('data-word-id');
        if (!wordId) return;

        try {
            const res = await fetch(`/api/cefr/words/${wordId}/toggle-star`, { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                if (data.is_starred) {
                    starBtn.classList.add('starred');
                    this.showToast('⭐ ปักหมุดคำศัพท์นี้เรียบร้อยแล้ว', 'success');
                } else {
                    starBtn.classList.remove('starred');
                    this.showToast('ยกเลิกปักหมุดคำศัพท์แล้ว', 'info');
                }
            }
        } catch (err) {
            console.error('Error starring word:', err);
        }
    },

    async openCefrWordList(level) {
        try {
            const res = await fetch(`/api/cefr/words?level=${level}`);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);

            const titleEl = document.getElementById('modal-cefr-title');
            const subtitleEl = document.getElementById('modal-cefr-subtitle');
            const countEl = document.getElementById('modal-cefr-count');
            const listEl = document.getElementById('modal-cefr-word-list');
            const startBtn = document.getElementById('modal-cefr-start-btn');

            if (titleEl) titleEl.textContent = `สมุดคำศัพท์ระดับ ${level}`;
            if (subtitleEl) subtitleEl.textContent = `รายการคำศัพท์ภาษาอังกฤษระดับ ${level} ในคลังระบบ`;
            if (countEl) countEl.textContent = `ทั้งหมด ${data.data.length} คำ`;

            if (startBtn) {
                startBtn.onclick = () => {
                    this.closeCefrWordList();
                    this.startCefrQuiz(level, 'meaning');
                };
            }

            if (listEl) {
                listEl.innerHTML = data.data.map(w => `
                    <div class="cefr-explorer-item">
                        <div class="cefr-explorer-main">
                            <div>
                                <h4>${this.escapeHtml(w.word)}</h4>
                                <span class="phonetic">${this.escapeHtml(w.phonetic || '')}</span>
                                <span class="cefr-pos-badge">${this.escapeHtml(w.part_of_speech || '')}</span>
                            </div>
                            <div class="cefr-explorer-def">
                                <strong>${this.escapeHtml(w.meaning_th)}</strong>
                                ${w.meaning_en ? ` - <span style="color: #94a3b8;">${this.escapeHtml(w.meaning_en)}</span>` : ''}
                            </div>
                            ${w.example_sentence ? `<div class="cefr-explorer-example">"${this.escapeHtml(w.example_sentence)}"</div>` : ''}
                        </div>
                    </div>
                `).join('');
            }

            const modal = document.getElementById('modal-cefr-words');
            if (modal) modal.classList.add('open');
        } catch (err) {
            console.error('Error opening word list:', err);
            this.showToast('ไม่สามารถเปิดรายการคำศัพท์ได้: ' + err.message, 'error');
        }
    },

    closeCefrWordList() {
        const modal = document.getElementById('modal-cefr-words');
        if (modal) modal.classList.remove('open');
    },

    // ==========================================
    // 9. USER ACCOUNT & AUTHENTICATION CONTROLLER
    // ==========================================

    async initAuth() {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.success && data.user) {
                this.state.currentUser = data.user;
            } else {
                this.state.currentUser = null;
            }
        } catch (err) {
            console.error('Failed to initialize user session:', err);
            this.state.currentUser = null;
        }
        this.updateUserUI();
    },

    updateUserUI() {
        const u = this.state.currentUser;
        const topbarSection = document.getElementById('topbar-user-section');
        const sidebarAvatar = document.getElementById('sidebar-user-avatar');
        const sidebarName = document.getElementById('sidebar-user-name');
        const sidebarSub = document.getElementById('sidebar-user-sub');
        const sidebarBadge = document.getElementById('sidebar-level-badge');
        const sidebarAuthBtn = document.getElementById('btn-sidebar-auth');

        if (u && u.role !== 'guest') {
            const lvl = u.stats ? u.stats.level : 1;
            const avatar = u.avatar_url || '👨‍🎓';

            if (sidebarAvatar) sidebarAvatar.textContent = avatar;
            if (sidebarName) sidebarName.textContent = u.display_name || u.username;
            if (sidebarSub) sidebarSub.textContent = `@${u.username} • Lv.${lvl}`;
            if (sidebarBadge) sidebarBadge.textContent = `Lv.${lvl}`;
            const heroLvl = document.getElementById('rpg-hero-level');
            if (heroLvl) heroLvl.textContent = `Lv.${lvl}`;

            if (sidebarAuthBtn) {
                sidebarAuthBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                `;
                sidebarAuthBtn.title = 'ออกจากระบบ';
            }

            if (topbarSection) {
                topbarSection.innerHTML = `
                    <div class="topbar-user-chip" onclick="app.navigate('status')" title="คลิกดูสเตตัสตัวละคร RPG ของคุณ">
                        <span class="topbar-avatar">${avatar}</span>
                        <span class="topbar-user-name btn-text-responsive">${u.display_name || u.username}</span>
                        <span class="topbar-user-badge">Lv.${lvl}</span>
                        <button class="btn btn-outline btn-sm btn-logout-chip" onclick="event.stopPropagation(); app.handleLogout()" title="ออกจากระบบ">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            <span class="btn-text-responsive">ออก</span>
                        </button>
                    </div>
                `;
            }
        } else {
            // Guest mode
            if (sidebarAvatar) sidebarAvatar.innerHTML = this.renderAvatar('scholar-m', 38);
            if (sidebarName) sidebarName.textContent = 'ผู้ใช้งานทั่วไป';
            if (sidebarSub) sidebarSub.textContent = 'คลิกเพื่อเข้าสู่ระบบ';
            if (sidebarBadge) sidebarBadge.textContent = 'Guest';
            const mistBadge = document.getElementById('sidebar-mistakes-count');
            if (mistBadge) mistBadge.textContent = '0';
            const mastBadge = document.getElementById('sidebar-mastered-count');
            if (mastBadge) mastBadge.textContent = '0';
            if (sidebarAuthBtn) {
                sidebarAuthBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                `;
                sidebarAuthBtn.title = 'เข้าสู่ระบบ / สมัครสมาชิก';
            }

            if (topbarSection) {
                topbarSection.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="app.openAuthModal('login')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="btn-text-responsive">เข้าสู่ระบบ</span>
                    </button>
                `;
            }
        }
    },

    openAuthModal(tab = 'login') {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('open');
            this.switchAuthTab(tab);
        }
    },

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('open');
    },

    switchAuthTab(tab) {
        const tabLogin = document.getElementById('tab-btn-login');
        const tabReg = document.getElementById('tab-btn-register');
        const formLogin = document.getElementById('form-login');
        const formReg = document.getElementById('form-register');

        if (tab === 'login') {
            tabLogin.classList.add('active');
            tabReg.classList.remove('active');
            formLogin.style.display = 'flex';
            formReg.style.display = 'none';
        } else {
            tabReg.classList.add('active');
            tabLogin.classList.remove('active');
            formReg.style.display = 'flex';
            formLogin.style.display = 'none';
        }
    },

    selectAvatar(key, btn) {
        this.state.selectedAvatar = key;
        document.querySelectorAll('.avatar-option-btn').forEach(b => b.classList.remove('selected'));
        if (btn) btn.classList.add('selected');
    },

    async handleLoginForm(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('btn-submit-login');

        if (!username || !password) {
            this.showToast('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 'warning');
            return;
        }

        try {
            btn.disabled = true;
            btn.textContent = 'กำลังตรวจสอบ...';

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.success && data.token) {
                localStorage.setItem('tcas_auth_token', data.token);
                this.state.authToken = data.token;
                this.state.currentUser = data.user;
                this.showToast(`ยินดีต้อนรับกลับมา, ${data.user.display_name}!`, 'success');
                this.closeAuthModal();
                this.updateUserUI();

                // Refresh data to reflect this user's isolated records
                await this.loadDashboard();
                await this.loadMistakes();
                await this.loadVocab();
                await this.loadUserStatus(true);
            } else {
                this.showToast(data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
            }
        } catch (err) {
            console.error('Login error:', err);
            this.showToast('เข้าสู่ระบบไม่สำเร็จ: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '🚀 เข้าสู่ระบบ';
        }
    },

    async handleRegisterForm(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const display_name = document.getElementById('register-displayname').value.trim();
        const password = document.getElementById('register-password').value;
        const confirm_password = document.getElementById('register-confirm-password').value;
        const avatar_url = this.state.selectedAvatar || 'scholar-m';
        const btn = document.getElementById('btn-submit-register');

        if (!username || !password) {
            this.showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
            return;
        }
        if (password !== confirm_password) {
            this.showToast('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', 'warning');
            return;
        }

        try {
            btn.disabled = true;
            btn.textContent = 'กำลังสร้างบัญชี...';

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, display_name, avatar_url })
            });

            const data = await res.json();
            if (data.success && data.token) {
                localStorage.setItem('tcas_auth_token', data.token);
                this.state.authToken = data.token;
                this.state.currentUser = data.user;
                this.showToast('สร้างบัญชีสำเร็จ ยินดีต้อนรับสู่ TCAS Master!', 'success');
                this.closeAuthModal();
                this.updateUserUI();

                // Refresh views with blank new student slate
                await this.loadDashboard();
                await this.loadMistakes();
                await this.loadVocab();
                await this.loadUserStatus(true);
            } else {
                this.showToast(data.error || 'สมัครสมาชิกไม่สำเร็จ', 'error');
            }
        } catch (err) {
            console.error('Registration error:', err);
            this.showToast('เกิดข้อผิดพลาด: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '✨ สร้างบัญชีและเริ่มบันทึกคะแนน';
        }
    },

    async handleLogout() {
        if (!confirm('คุณต้องการออกจากระบบหรือไม่?')) return;
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (err) {
            console.warn('Logout notification error:', err);
        }
        localStorage.removeItem('tcas_auth_token');
        this.state.authToken = null;
        this.state.currentUser = null;
        this.showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
        await this.initAuth();
        await this.loadDashboard();
        await this.loadMistakes();
        await this.loadVocab();
        await this.loadUserStatus(true);
    },

    handleUserChipClick() {
        if (this.state.currentUser && this.state.currentUser.role !== 'guest') {
            this.navigate('status');
        } else {
            this.openAuthModal('login');
        }
    },

    handleAuthButtonAction() {
        if (this.state.currentUser && this.state.currentUser.role !== 'guest') {
            this.handleLogout();
        } else {
            this.openAuthModal('login');
        }
    },

    async openLeaderboardModal() {
        const modal = document.getElementById('leaderboard-modal');
        if (modal) modal.classList.add('open');

        const tbody = document.getElementById('leaderboard-rows');
        const myRankEl = document.getElementById('leaderboard-my-rank');
        if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">กำลังโหลดตารางอันดับ...</td></tr>';

        try {
            const res = await fetch('/api/auth/leaderboard');
            const data = await res.json();
            if (data.success && data.data) {
                const currentUserId = this.state.currentUser ? this.state.currentUser.id : null;
                let userRank = null;

                tbody.innerHTML = data.data.map((u, idx) => {
                    const rank = idx + 1;
                    if (u.id === currentUserId) userRank = rank;

                    let rankBadgeHtml = `<span class="rank-badge rank-badge-other">${rank}</span>`;
                    if (rank === 1) rankBadgeHtml = `<span class="rank-badge rank-badge-1" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#f59e0b' })}</span>`;
                    else if (rank === 2) rankBadgeHtml = `<span class="rank-badge rank-badge-2" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#cbd5e1' })}</span>`;
                    else if (rank === 3) rankBadgeHtml = `<span class="rank-badge rank-badge-3" style="display:inline-flex;align-items:center;justify-content:center;">${this.svg('medal', { size: 18, color: '#d97706' })}</span>`;

                    const isCurrent = (u.id === currentUserId) ? 'current-user-row' : '';

                    return `
                        <tr class="${isCurrent}">
                            <td>${rankBadgeHtml}</td>
                            <td>
                                <div class="user-cell">
                                    <span class="user-cell-avatar">${this.renderAvatar(u.avatar_url, 28)}</span>
                                    <div class="user-cell-names">
                                        <span class="user-cell-display">${this.escapeHtml(u.display_name)} ${u.id === currentUserId ? '<span style="color: #38bdf8; font-size: 0.75rem;">(คุณ)</span>' : ''}</span>
                                        <span class="user-cell-handle">@${this.escapeHtml(u.username)}</span>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <span class="badge-counter" style="background: rgba(99, 102, 241, 0.2); color: #a5b4fc; font-weight: 700;">Lv.${u.level}</span>
                            </td>
                            <td style="text-align: center; font-weight: 600;">${u.total_exams}</td>
                            <td style="text-align: right; font-weight: 700; color: #10b981;">${u.total_score}</td>
                            <td style="text-align: right; font-weight: 700; color: #f59e0b;">${u.total_xp.toLocaleString()} XP</td>
                        </tr>
                    `;
                }).join('');

                if (myRankEl) {
                    if (userRank) {
                        myRankEl.innerHTML = `คุณอยู่อันดับที่ <strong style="color: #38bdf8;">#${userRank}</strong> ของระบบ`;
                    } else {
                        myRankEl.textContent = 'เข้าสู่ระบบและเริ่มทำข้อสอบเพื่อติดอันดับ!';
                    }
                }
            }
        } catch (err) {
            console.error('Failed to load leaderboard', err);
            if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--accent-danger);">เกิดข้อผิดพลาดในการโหลดตารางอันดับ</td></tr>';
        }
    },

    closeLeaderboardModal() {
        const modal = document.getElementById('leaderboard-modal');
        if (modal) modal.classList.remove('open');
    },

    showComingSoonToast(subjectName) {
        this.showToast(`🚧 ข้อสอบ ${subjectName} อยู่ระหว่างเตรียมข้อสอบตามพิมพ์เขียวปี 68 จะเปิดให้ฝึกทำในเร็วๆ นี้ครับ!`, 'warning');
    },

    // ==========================================
    // CHEAT SHEET & FORMULA GUIDE MODAL
    // ==========================================
    async openCheatSheetModal(subjectId) {
        // If subjectId is omitted, detect from activeSession or currentSubjectId
        const targetId = subjectId || (this.state.activeSession ? this.state.activeSession.subject.id : (this.state.currentSubjectId || 'tgat2'));
        this._lastCheatSheetSubjectId = targetId;

        const modal = document.getElementById('cheatsheet-modal');
        const titleEl = document.getElementById('cs-modal-title');
        const badgeEl = document.getElementById('cs-modal-badge');
        const descEl = document.getElementById('cs-modal-desc');
        const contentEl = document.getElementById('cs-modal-content');
        const startBtn = document.getElementById('cs-modal-start-btn');

        if (!modal) return;

        // Show modal and loading state
        modal.classList.add('open');
        if (titleEl) titleEl.textContent = 'กำลังโหลดสรุปสูตร & แนวข้อสอบ...';
        if (contentEl) contentEl.innerHTML = '<div style="text-align:center; padding: 2.5rem; color: var(--text-muted);">⏳ กำลังดึงข้อมูลจาก MyTCAS Blueprint Master...</div>';

        try {
            const res = await fetch(`/api/subjects/${targetId}/cheatsheet`);
            const json = await res.json();
            if (!json.success || !json.data) {
                throw new Error(json.error || 'ไม่พบข้อมูลสรุปสูตร');
            }

            const cs = json.data;
            if (titleEl) titleEl.textContent = cs.title;
            if (badgeEl) badgeEl.textContent = cs.badge;
            if (descEl) descEl.textContent = cs.description;

            // Handle start exam button visibility
            if (startBtn) {
                const isComingSoon = cs.subject && cs.subject.status === 'coming_soon';
                const isInExam = this.state.currentView === 'exam' && this.state.activeSession;
                if (isInExam || isComingSoon) {
                    startBtn.style.display = 'none';
                } else {
                    startBtn.style.display = 'inline-flex';
                }
            }

            if (contentEl && cs.sections) {
                contentEl.innerHTML = cs.sections.map(sec => `
                    <div class="cheat-section-block">
                        <h3 class="cheat-sec-heading">${sec.title}</h3>
                        <div class="cheat-sec-body">${sec.content}</div>
                    </div>
                `).join('');

                // Render KaTeX formulas if available
                if (window.renderMathInElement) {
                    window.renderMathInElement(contentEl, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '$', right: '$', display: false }
                        ],
                        throwOnError: false
                    });
                }
            }
        } catch (err) {
            console.error('Failed to load cheatsheet', err);
            if (contentEl) {
                contentEl.innerHTML = `<div style="text-align:center; padding: 2rem; color: #f43f5e;">❌ ไม่สามารถโหลดข้อมูลสรุปสูตรได้: ${err.message}</div>`;
            }
        }
    },

    closeCheatSheetModal() {
        const modal = document.getElementById('cheatsheet-modal');
        if (modal) modal.classList.remove('open');
    },

    startExamFromCheatSheet() {
        this.closeCheatSheetModal();
        const subjectId = this._lastCheatSheetSubjectId || 'tgat2';
        this.startExam(subjectId, 'full_mock');
    },

    formatMarkdown(text) {
        if (!text) return '';
        let html = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/^---$/gim, '<hr>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        return `<p>${html}</p>`;
    },

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

