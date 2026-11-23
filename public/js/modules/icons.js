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
    'x': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    'infinity': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/></svg>',
    'sparkles': '<svg width="{s}" height="{s}" viewBox="0 0 24 24" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round" class="{cls}"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>'
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

window.TCASIcons = {
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
        const resolvedKey = TCAS_AVATAR_MAP[key] || key;
        const av = TCAS_AVATARS[resolvedKey];
        if (av) {
            return `<div class="avatar-vector-box" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;flex-shrink:0;" title="${av.name}">${av.svg}</div>`;
        }
        if (typeof key === 'string' && (key.startsWith('http') || key.startsWith('data:'))) {
            return `<img src="${key}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:block;" alt="Avatar" />`;
        }
        return `<div class="avatar-vector-box" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;flex-shrink:0;">${TCAS_AVATARS['scholar-m'].svg}</div>`;
    }
};
