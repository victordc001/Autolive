
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = 3000;
 
const APP_ID = '6c29d41d0fb743e2bed815bf996785f3';
const APP_CERTIFICATE = '649bb01e0631405595447c8cd7f34320';

app.get('/rtc-token', (req, res) => {
  const channelName = req.query.channel;
  if (!channelName) {
    return res.status(400).json({ error: 'channel is required' });
  }

  const uid = Math.floor(Math.random() * 100000); 
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; // token valid for 1 hour
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  console.log('generating token');

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

    res.json({ token, uid });  
  const thetoken = JSON.stringify(token); 
  const theuid = JSON.stringify(uid);
  console.log(uid);
  console.log('the token', thetoken)
});

app.listen(port, () => {
  console.log(`Agora token server running at http://192.168.2.17:${port}`);
});
