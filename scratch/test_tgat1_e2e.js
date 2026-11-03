async function testFullLifeCycle() {
    console.log('Testing all 5 TGAT1 Sets End-to-End...');
    for (let setNum of [1, 2, 3, 4, 5]) {
        const startRes = await fetch('http://localhost:3000/api/sessions/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject_id: 'tgat1', session_type: 'full_mock', set_number: setNum })
        }).then(r => r.json());

        if (!startRes.success) throw new Error('Start failed for set ' + setNum + ': ' + startRes.error);
        const sess = startRes.data;
        const qCount = sess.questions.length;
        const firstQ = sess.questions[0];

        const submitRes = await fetch('http://localhost:3000/api/sessions/' + sess.session_id + '/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answers: [
                    { question_id: firstQ.id, selected_option_id: firstQ.options[0].id, time_spent_seconds: 15 }
                ],
                time_spent_seconds: 60
            })
        }).then(r => r.json());

        if (!submitRes.success) throw new Error('Submit failed for set ' + setNum + ': ' + submitRes.error);
        console.log(`✅ Set ${setNum} Passed: ${qCount} questions, Session ID: ${sess.session_id}, Score processed: ${submitRes.data.total_score}/${submitRes.data.max_score}`);
    }
    console.log('\n🎉 ALL 5 TGAT1 SETS FULLY OPERATIONAL AND VERIFIED!');
}

testFullLifeCycle().catch(err => {
    console.error('❌ E2E Test Failed:', err);
    process.exit(1);
});
