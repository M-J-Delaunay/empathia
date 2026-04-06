const { AccessToken } = require('livekit-server-sdk');

exports.handler = async (event) => {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.LIVEKIT_URL;

  const roomName = "salon-empathia";
  const participantName = "Ami-" + Math.floor(Math.random() * 1000);

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });

  at.addGrant({ 
    roomJoin: true, 
    room: roomName, 
    canPublish: true, 
    canSubscribe: true 
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      token: await at.toJwt(),
      url: livekitUrl,
      identity: participantName
    }),
  };
};
