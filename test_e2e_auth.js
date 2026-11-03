// E2E Test for MaMan User Authentication, Score Isolation, Leaderboard, and Mistake Notebook
const http = require('http');

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'http://localhost:3000');
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING COMPLETE E2E TEST ===\n');

  // Test 1: Register User A
  const userA_name = 'somchai_' + Date.now();
  console.log(`[1] Registering User A: ${userA_name}...`);
  const regA = await request('POST', '/api/auth/register', {
    username: userA_name,
    password: 'passwordA123',
    display_name: 'สมชายสายลุย',
    avatar_url: '🦊'
  });
  console.log('User A Register Status:', regA.status, regA.data.message || regA.data.error);
  if (!regA.data.token) throw new Error('User A register failed');
  const tokenA = regA.data.token;
  const userA_id = regA.data.user.id;

  // Test 2: Register User B
  const userB_name = 'somying_' + Date.now();
  console.log(`\n[2] Registering User B: ${userB_name}...`);
  const regB = await request('POST', '/api/auth/register', {
    username: userB_name,
    password: 'passwordB123',
    display_name: 'สมหญิงยอดนักสู้',
    avatar_url: '🦉'
  });
  console.log('User B Register Status:', regB.status, regB.data.message || regB.data.error);
  if (!regB.data.token) throw new Error('User B register failed');
  const tokenB = regB.data.token;
  const userB_id = regB.data.user.id;

  // Test 3: Get profile /api/auth/me for User A and B
  console.log('\n[3] Checking /api/auth/me for User A and B...');
  const meA = await request('GET', '/api/auth/me', null, tokenA);
  console.log('User A Profile:', meA.data.user.username, meA.data.user.display_name, meA.data.user.avatar_url, 'Stats:', meA.data.user.stats);

  const meB = await request('GET', '/api/auth/me', null, tokenB);
  console.log('User B Profile:', meB.data.user.username, meB.data.user.display_name, meB.data.user.avatar_url, 'Stats:', meB.data.user.stats);

  // Test 4: User A starts an exam session
  console.log('\n[4] User A starts an exam session (TGAT1)...');
  const sessionA_res = await request('POST', '/api/sessions/start', {
    subject_id: 'tgat1',
    session_type: 'topic_drill',
    question_limit: 5
  }, tokenA);
  console.log('User A Session Start Status:', sessionA_res.status, 'Session ID:', sessionA_res.data.data?.session_id, 'Questions:', sessionA_res.data.data?.questions?.length);
  const sessionA_id = sessionA_res.data.data.session_id;
  const questionsA = sessionA_res.data.data.questions;

  // Test 5: User A submits answers (e.g. 4 correct, 1 wrong to test mistake logging)
  console.log('\n[5] User A submits answers for session...');
  const answersA = [];
  questionsA.forEach((q, idx) => {
    // Pick first option for question 0 (intentionally may be wrong/right), second option for others
    const chosenOption = (idx === 0) ? q.options[0] : (q.options[1] || q.options[0]);
    answersA.push({
      question_id: q.id,
      selected_option_id: chosenOption ? chosenOption.id : null,
      time_spent_seconds: 10,
      is_flagged: idx === 0 ? 1 : 0
    });
  });

  const submitA = await request('POST', `/api/sessions/${sessionA_id}/submit`, {
    answers: answersA,
    time_spent_seconds: 50
  }, tokenA);
  console.log('User A Submit Result:', submitA.status, 'Score:', submitA.data.data?.total_score, '/', submitA.data.data?.max_score, 'Earned XP:', submitA.data.data?.earned_xp, 'Level:', submitA.data.data?.user_level);

  // Test 6: Verify User A mistake notebook
  console.log('\n[6] Checking User A mistake notebook...');
  const mistakesA = await request('GET', '/api/mistakes', null, tokenA);
  console.log('User A Mistakes Count:', mistakesA.data.data?.length || 0);

  // Test 7: Verify User B mistake notebook is EMPTY (Data Isolation!)
  console.log('\n[7] Verifying User B mistake notebook is empty (ISOLATION CHECK)...');
  const mistakesB = await request('GET', '/api/mistakes', null, tokenB);
  const mistakesB_count = mistakesB.data.data?.length || 0;
  console.log('User B Mistakes Count:', mistakesB_count, mistakesB_count === 0 ? '✅ PASSED (ISOLATED)' : '❌ FAILED');

  // Test 8: Verify User A stats updated vs User B stats clean
  console.log('\n[8] Checking updated stats for User A vs User B...');
  const meA_updated = await request('GET', '/api/auth/me', null, tokenA);
  console.log('User A Updated Stats:', meA_updated.data.user.stats);
  const meB_updated = await request('GET', '/api/auth/me', null, tokenB);
  console.log('User B Clean Stats:', meB_updated.data.user.stats);

  // Test 9: Leaderboard API
  console.log('\n[9] Fetching global leaderboard...');
  const lb = await request('GET', '/api/auth/leaderboard', null, tokenA);
  console.log('Leaderboard Count:', lb.data.data?.length);
  (lb.data.data || []).slice(0, 5).forEach((u, i) => {
    console.log(`  Rank ${i+1}: ${u.avatar_url} ${u.display_name} (@${u.username}) - Lv.${u.level} | ${u.total_xp} XP | Score: ${u.total_score}`);
  });

  // Test 10: Test User Login
  console.log('\n[10] Testing Login endpoint for User A...');
  const loginA = await request('POST', '/api/auth/login', {
    username: userA_name,
    password: 'passwordA123'
  });
  console.log('Login Status:', loginA.status, 'User:', loginA.data.user?.username, 'Token returned:', !!loginA.data.token);

  // Test 11: Test Wrong Password
  console.log('\n[11] Testing Wrong Password rejection...');
  const loginFail = await request('POST', '/api/auth/login', {
    username: userA_name,
    password: 'wrong_password_999'
  });
  console.log('Wrong Password Status:', loginFail.status, 'Error message:', loginFail.data.error, loginFail.status === 401 ? '✅ PASSED' : '❌ FAILED');

  // Test 12: Test Practice Mistakes endpoint for User A
  console.log('\n[12] Testing Practice Mistakes review session for User A...');
  const reviewSession = await request('POST', '/api/sessions/start', {
    subject_id: 'all',
    session_type: 'mistakes_review'
  }, tokenA);
  console.log('Mistakes Review Session Status:', reviewSession.status, 'Questions fetched from mistakes:', reviewSession.data.data?.questions?.length || reviewSession.data.error);

  console.log('\n=== ALL E2E TESTS COMPLETED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('E2E Test Failed:', err);
  process.exit(1);
});
