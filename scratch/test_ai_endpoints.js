const express = require('express');
const db = require('../database/db');
const app = require('../server');
const assert = require('assert');

// Mock request testing helper using express app
async function testAIEndpoints() {
    console.log('🧪 Testing TCAS Master AI Endpoints...');

    // Pick a real question from DB
    const sampleQ = db.prepare('SELECT id FROM questions LIMIT 1').get();
    assert(sampleQ, 'Must have at least 1 question in DB');
    const questionId = sampleQ.id;
    console.log(`📌 Using sample question: ${questionId}`);

    // Create a mock server to test API endpoints
    const server = app.listen(3099, async () => {
        const baseUrl = 'http://127.0.0.1:3099';

        try {
            // 1. Test POST /api/ai/saved-questions
            console.log('1️⃣ Testing POST /api/ai/saved-questions...');
            let res = await fetch(`${baseUrl}/api/ai/saved-questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question_id: questionId,
                    user_selected_option: '2',
                    notes: 'สงสัยว่าทำไมข้อ 2 ถึงผิด'
                })
            });
            let data = await res.json();
            assert(data.success === true, 'Failed to save question');
            console.log('  ✅ Saved question successfully:', data.saved_id);

            // 2. Test GET /api/ai/saved-questions
            console.log('2️⃣ Testing GET /api/ai/saved-questions...');
            res = await fetch(`${baseUrl}/api/ai/saved-questions`);
            data = await res.json();
            assert(data.success === true, 'Failed to fetch saved questions');
            assert(data.count >= 1, 'Expected at least 1 saved question');
            const found = data.data.find(q => q.question_id === questionId);
            assert(found, 'Saved question not found in list');
            assert(Array.isArray(found.options), 'Question must have options');
            console.log(`  ✅ Retrieved saved list (${data.count} items), question has ${found.options.length} options`);

            // 3. Test GET /api/ai/chat/:questionId
            console.log('3️⃣ Testing GET /api/ai/chat/:questionId...');
            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`);
            data = await res.json();
            assert(data.success === true, 'Failed to fetch chat details');
            assert(data.question, 'Question details missing');
            assert(data.system_prompt, 'System prompt missing');
            assert(data.system_prompt.includes('TCAS Master AI'), 'Must have TCAS Master AI persona');
            assert(data.system_prompt.includes('ห้ามระบบรุ่นพี่-รุ่นน้องเด็ดขาด'), 'Must strictly enforce no senior/junior policy');
            console.log('  ✅ Verified Chat Context & Strict Anti-Hierarchy System Prompt');

            // 4. Test POST /api/ai/chat/:questionId (User message)
            console.log('4️⃣ Testing POST /api/ai/chat/:questionId (User & Assistant messages)...');
            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    role: 'user',
                    content: 'ช่วยอธิบายหลักการคิดของข้อนี้หน่อยครับ'
                })
            });
            data = await res.json();
            assert(data.success === true, 'Failed to save user message');

            // Assistant response
            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    role: 'assistant',
                    content: 'เรามาพิจารณาข้อนี้ทีละขั้นตอนตามหลัก Blueprint นะครับ...'
                })
            });
            data = await res.json();
            assert(data.success === true, 'Failed to save assistant message');
            console.log('  ✅ Chat messages persisted successfully');

            // 5. Verify chat history in GET
            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`);
            data = await res.json();
            assert(data.messages.length >= 2, 'Expected at least 2 chat messages');
            console.log(`  ✅ Retrieved chat history (${data.messages.length} messages)`);

            // 6. Test DELETE /api/ai/chat/:questionId
            console.log('5️⃣ Testing DELETE /api/ai/chat/:questionId...');
            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`, { method: 'DELETE' });
            data = await res.json();
            assert(data.success === true, 'Failed to delete chat');

            res = await fetch(`${baseUrl}/api/ai/chat/${questionId}`);
            data = await res.json();
            assert(data.messages.length === 0, 'Chat messages should be empty after clear');
            console.log('  ✅ Chat cleared successfully');

            // 7. Test DELETE /api/ai/saved-questions/:questionId
            console.log('6️⃣ Testing DELETE /api/ai/saved-questions/:questionId...');
            res = await fetch(`${baseUrl}/api/ai/saved-questions/${questionId}`, { method: 'DELETE' });
            data = await res.json();
            assert(data.success === true, 'Failed to remove saved question');
            console.log('  ✅ Saved question removed cleanly');

            console.log('\n🎉 ALL AI ENDPOINT TESTS PASSED 100%!');
        } catch (e) {
            console.error('❌ Test failed:', e);
            process.exitCode = 1;
        } finally {
            server.close(() => {
                process.exit(process.exitCode || 0);
            });
        }
    });
}

testAIEndpoints();

