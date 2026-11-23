/**
 * Registry aggregating all per-subject modules in database/subjects/
 */
const fs = require('fs');
const path = require('path');

const EXCLUDED = new Set(['index.js', 'seed_subject.js']);

function loadAllSubjectModules() {
    const files = fs.readdirSync(__dirname)
        .filter(f => f.endsWith('.js') && !EXCLUDED.has(f))
        .sort();

    return files.map(f => require(path.join(__dirname, f)));
}

const modules = loadAllSubjectModules();
const subjects = modules.map(m => m.subject).filter(Boolean);
const blueprints = modules.flatMap(m => m.blueprints || []);
const cheatsheets = {};
for (const m of modules) {
    if (m.subject && m.cheatsheet) {
        cheatsheets[m.subject.id] = m.cheatsheet;
    }
}

function getSubjectModule(subjectId) {
    const file = path.join(__dirname, `${subjectId}.js`);
    if (!fs.existsSync(file)) return null;
    return require(file);
}

module.exports = {
    modules,
    subjects,
    blueprints,
    cheatsheets,
    getSubjectModule
};
