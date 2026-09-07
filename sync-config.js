// 云端同步配置 —— 填入你的 GitHub Token 和 Gist ID 即可启用跨设备同步
const SYNC_CONFIG = {
  token: '11BJR73QY0ocmg3rP0EHgU_Nnz5N1n7M9NZ3JXv80dOh4rZC2RCOnhq4Xi8sBwvmxJ4SF3LFMJ7oqlt1y2',       // 你的 GitHub Personal Access Token（只需 gist 权限）
  gistId: 'ca57e8bb8a42bbd6b8e49a889aea1a6b'       // 你的 Gist ID
};

// 保存数据到云端
async function saveToCloud(dateStr) {
  if (!SYNC_CONFIG.token || !SYNC_CONFIG.gistId) return;
  const data = {};
  const keys = ['todo','core','exp_what','exp_issue','exp_idea','sport'];
  keys.forEach(k => {
    const v = localStorage.getItem(`${k}_${dateStr}`);
    if(v) data[`${k}_${dateStr}`] = v;
  });
  try {
    await fetch(`https://api.github.com/gists/${SYNC_CONFIG.gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${SYNC_CONFIG.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ files: { 'reminder-data.json': { content: JSON.stringify(data) } } })
    });
    document.getElementById('sync-dot').className = 'status-dot green';
    document.getElementById('sync-status').textContent = '已同步';
  } catch(e) {
    document.getElementById('sync-dot').className = 'status-dot red';
    document.getElementById('sync-status').textContent = '同步失败';
  }
}
