const http = require('http');

async function test() {
    console.log('🔍 Running Frontend & AI Tone Verification...');

    const res = await fetch('http://localhost:3000/');
    const html = await res.text();
    console.log('1. HTML Status:', res.status);
    console.log('   - Has nav-ai-hub (Sidebar):', html.includes('id="nav-ai-hub"'));
    console.log('   - Has btn-ai-hub-topbar (Topbar):', html.includes('btn-ai-hub-topbar'));
    console.log('   - Has btn-save-ai (Bookmark above exam):', html.includes('id="btn-save-ai"'));
    console.log('   - Has btn-instant-ai (Instant chat above exam):', html.includes('id="btn-instant-ai"'));
    console.log('   - Has ai-hub-expanded (Modal):', html.includes('ai-hub-expanded'));
    console.log('   - Has ai-hub-sidebar (Saved list panel):', html.includes('id="ai-hub-sidebar"'));
    console.log('   - Has ai-question-context-box (Question preview card):', html.includes('id="ai-question-context-box"'));

    // Check AI Tutor Endpoint
    console.log('\n2. Testing TCAS Master AI Tone & Response...');
    const tutorRes = await fetch('http://localhost:3000/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question_id: 'q_alevel_math68_01',
            user_query: 'ทำไมตัวเลือกอื่นถึงผิดครับ ช่วยวิเคราะห์จุดหลอกหน่อย'
        })
    });

    const data = await tutorRes.json();
    console.log('   - API Response Success:', data.success);
    console.log('   - Engine Model:', data.model);

    const reply = data.ai_response || '';
    const hasPhi = reply.includes('พี่') || reply.includes('พี่ติวเตอร์');
    const hasNong = reply.includes('น้อง');

    console.log('   - Anti-Hierarchy Policy Check:');
    console.log('     * Contains "พี่" / "พี่ติวเตอร์":', hasPhi ? '❌ VIOLATION' : '✅ PASSED (None)');
    console.log('     * Contains "น้อง" / "น้องๆ":', hasNong ? '❌ VIOLATION' : '✅ PASSED (None)');
    console.log('\n💬 AI Response Preview:\n' + reply.substring(0, 320) + '...\n');
}

test().catch(console.error);
